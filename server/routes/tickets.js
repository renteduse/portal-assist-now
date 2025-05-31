
const express = require('express');
const { body, validationResult, param } = require('express-validator');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tickets
// @desc    Get tickets (filtered by role)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, category, page = 1, limit = 20, priority } = req.query;
    
    let filter = {};
    
    // Role-based filtering
    switch (req.user.role) {
      case 'employee':
        filter.requester = req.user._id;
        break;
      case 'it':
        filter.$or = [
          { category: 'IT' },
          { assignedTo: req.user._id }
        ];
        break;
      case 'hr':
        filter.$or = [
          { category: 'HR' },
          { assignedTo: req.user._id }
        ];
        break;
      case 'admin':
        filter.$or = [
          { category: 'Admin' },
          { assignedTo: req.user._id }
        ];
        break;
      case 'super-admin':
        // Super admin can see all tickets
        break;
    }

    // Apply additional filters
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    const tickets = await Ticket.find(filter)
      .populate('requester', 'name email role department')
      .populate('assignedTo', 'name email role department')
      .populate('comments.author', 'name email role')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Ticket.countDocuments(filter);

    res.json({
      tickets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/tickets/:id
// @desc    Get ticket by ID
// @access  Private
router.get('/:id', auth, [
  param('id').isMongoId().withMessage('Invalid ticket ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ticket = await Ticket.findById(req.params.id)
      .populate('requester', 'name email role department')
      .populate('assignedTo', 'name email role department')
      .populate('comments.author', 'name email role');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user has permission to view this ticket
    const canView = ticket.requester._id.toString() === req.user._id.toString() ||
                   ticket.assignedTo?._id.toString() === req.user._id.toString() ||
                   ['admin', 'super-admin'].includes(req.user.role) ||
                   (req.user.role === 'it' && ticket.category === 'IT') ||
                   (req.user.role === 'hr' && ticket.category === 'HR');

    if (!canView) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ ticket });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/tickets
// @desc    Create new ticket
// @access  Private
router.post('/', auth, [
  body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('category').isIn(['IT', 'HR', 'Admin']).withMessage('Invalid category'),
  body('priority').optional().isIn(['Low', 'Medium', 'High', 'Critical']).withMessage('Invalid priority')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category, priority } = req.body;

    const ticket = new Ticket({
      title,
      description,
      category,
      priority: priority || 'Medium',
      requester: req.user._id
    });

    await ticket.save();
    
    // Populate the saved ticket
    await ticket.populate('requester', 'name email role department');
    await ticket.populate('assignedTo', 'name email role department');

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket
    });
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/tickets/:id
// @desc    Update ticket
// @access  Private
router.put('/:id', auth, [
  param('id').isMongoId().withMessage('Invalid ticket ID'),
  body('title').optional().trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('status').optional().isIn(['Open', 'In Progress', 'Resolved', 'Closed']).withMessage('Invalid status'),
  body('priority').optional().isIn(['Low', 'Medium', 'High', 'Critical']).withMessage('Invalid priority')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check permissions
    const canUpdate = ticket.requester.toString() === req.user._id.toString() ||
                     ticket.assignedTo?.toString() === req.user._id.toString() ||
                     ['admin', 'super-admin'].includes(req.user.role) ||
                     (req.user.role === 'it' && ticket.category === 'IT') ||
                     (req.user.role === 'hr' && ticket.category === 'HR');

    if (!canUpdate) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Only assigned agents and admins can change status
    if (req.body.status && ticket.requester.toString() === req.user._id.toString() && 
        !['admin', 'super-admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Only assigned agents can change ticket status' });
    }

    const allowedUpdates = ['title', 'description', 'priority'];
    if (['admin', 'super-admin', 'it', 'hr'].includes(req.user.role)) {
      allowedUpdates.push('status', 'assignedTo');
    }

    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Handle status change timestamps
    if (updates.status) {
      if (updates.status === 'Resolved' && ticket.status !== 'Resolved') {
        updates.resolvedAt = new Date();
      } else if (updates.status === 'Closed' && ticket.status !== 'Closed') {
        updates.closedAt = new Date();
      }
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('requester', 'name email role department')
     .populate('assignedTo', 'name email role department')
     .populate('comments.author', 'name email role');

    res.json({
      message: 'Ticket updated successfully',
      ticket: updatedTicket
    });
  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/tickets/:id/comments
// @desc    Add comment to ticket
// @access  Private
router.post('/:id/comments', auth, [
  param('id').isMongoId().withMessage('Invalid ticket ID'),
  body('content').trim().isLength({ min: 1 }).withMessage('Comment content is required'),
  body('isInternal').optional().isBoolean().withMessage('isInternal must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user has permission to comment
    const canComment = ticket.requester.toString() === req.user._id.toString() ||
                      ticket.assignedTo?.toString() === req.user._id.toString() ||
                      ['admin', 'super-admin'].includes(req.user.role) ||
                      (req.user.role === 'it' && ticket.category === 'IT') ||
                      (req.user.role === 'hr' && ticket.category === 'HR');

    if (!canComment) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { content, isInternal } = req.body;

    // Only staff can make internal comments
    const isStaff = ['admin', 'super-admin', 'it', 'hr'].includes(req.user.role);
    const commentIsInternal = isInternal && isStaff;

    const comment = {
      author: req.user._id,
      content,
      isInternal: commentIsInternal
    };

    ticket.comments.push(comment);
    await ticket.save();

    // Populate the new comment
    await ticket.populate('comments.author', 'name email role');
    const newComment = ticket.comments[ticket.comments.length - 1];

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/tickets/stats/dashboard
// @desc    Get ticket statistics for dashboard
// @access  Private
router.get('/stats/dashboard', auth, async (req, res) => {
  try {
    let matchFilter = {};
    
    // Role-based filtering for stats
    switch (req.user.role) {
      case 'employee':
        matchFilter.requester = req.user._id;
        break;
      case 'it':
        matchFilter.$or = [
          { category: 'IT' },
          { assignedTo: req.user._id }
        ];
        break;
      case 'hr':
        matchFilter.$or = [
          { category: 'HR' },
          { assignedTo: req.user._id }
        ];
        break;
      case 'admin':
        matchFilter.$or = [
          { category: 'Admin' },
          { assignedTo: req.user._id }
        ];
        break;
      case 'super-admin':
        // No filter for super admin
        break;
    }

    const stats = await Ticket.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await Ticket.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Ticket.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      statusStats: stats,
      categoryStats,
      priorityStats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
