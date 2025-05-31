
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxLength: [1000, 'Comment cannot exceed 1000 characters']
  },
  isInternal: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxLength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    enum: ['IT', 'HR', 'Admin'],
    required: [true, 'Category is required']
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  comments: [commentSchema],
  attachments: [{
    filename: String,
    originalName: String,
    size: Number,
    mimetype: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  resolvedAt: {
    type: Date,
    default: null
  },
  closedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for better query performance
ticketSchema.index({ category: 1, status: 1 });
ticketSchema.index({ requester: 1 });
ticketSchema.index({ assignedTo: 1 });
ticketSchema.index({ createdAt: -1 });

// Auto-assign tickets based on category
ticketSchema.pre('save', async function(next) {
  if (this.isNew && !this.assignedTo) {
    try {
      const User = mongoose.model('User');
      let assignableRoles = [];
      
      switch (this.category) {
        case 'IT':
          assignableRoles = ['it', 'admin', 'super-admin'];
          break;
        case 'HR':
          assignableRoles = ['hr', 'admin', 'super-admin'];
          break;
        case 'Admin':
          assignableRoles = ['admin', 'super-admin'];
          break;
      }
      
      // Find available users who can handle this ticket type
      const availableAgents = await User.find({
        role: { $in: assignableRoles },
        isActive: true
      });
      
      if (availableAgents.length > 0) {
        // Simple round-robin assignment (you can implement more sophisticated logic)
        const randomAgent = availableAgents[Math.floor(Math.random() * availableAgents.length)];
        this.assignedTo = randomAgent._id;
      }
    } catch (error) {
      console.error('Error in auto-assignment:', error);
    }
  }
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);
