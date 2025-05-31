
const API_BASE_URL = 'http://localhost:5000/api';

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('helphub_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.message || 'Something went wrong', response.status);
  }
  return response.json();
};

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    department?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Tickets API
export const ticketsApi = {
  getTickets: async (params?: {
    status?: string;
    category?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/tickets?${queryParams}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getTicket: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  createTicket: async (ticketData: {
    title: string;
    description: string;
    category: string;
    priority?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(ticketData)
    });
    return handleResponse(response);
  },

  updateTicket: async (id: string, updateData: any) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });
    return handleResponse(response);
  },

  addComment: async (id: string, commentData: {
    content: string;
    isInternal?: boolean;
  }) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}/comments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(commentData)
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/tickets/stats/dashboard`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Users API
export const usersApi = {
  getUsers: async (params?: {
    role?: string;
    department?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/users?${queryParams}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  createUser: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    department?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  updateUser: async (id: string, updateData: any) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });
    return handleResponse(response);
  },

  deleteUser: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};
