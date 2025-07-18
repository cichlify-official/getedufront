// Fixed API integration for GetEdu Backend
const baseURL = 'https://getedubackend.onrender.com';
let authToken = localStorage.getItem('authToken');

// Enhanced API utilities with proper backend integration
const api = {
  timeout: 30000,
  
  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return headers;
  },
  
  async makeRequest(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...options.headers,
          ...this.getAuthHeaders()
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = errorData.detail;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // Use default error message if JSON parsing fails
        }
        
        throw new Error(errorMessage);
      }
      
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please check your connection');
      }
      throw error;
    }
  },
  
  async get(path) {
    const response = await this.makeRequest(`${baseURL}${path}`);
    return response.json();
  },
  
  async post(path, payload) {
    const response = await this.makeRequest(`${baseURL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return response.json();
  },
  
  async upload(path, formData) {
    // Don't set Content-Type for FormData - let browser set it
    const response = await this.makeRequest(`${baseURL}${path}`, {
      method: 'POST',
      headers: authToken ? { 'Authorization': `Bearer ${authToken}` } : {},
      body: formData
    });
    return response.json();
  }
};

// Authentication functions
async function register(userData) {
  try {
    const response = await api.post('/api/auth/register', userData);
    showNotification('Registration successful! Please login.', 'success');
    return response;
  } catch (error) {
    showNotification(error.message, 'error');
    throw error;
  }
}

async function login(email, password) {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    authToken = response.access_token;
    localStorage.setItem('authToken', authToken);
    showNotification('Login successful!', 'success');
    return response;
  } catch (error) {
    showNotification(error.message, 'error');
    throw error;
  }
}

function logout() {
  authToken = null;
  localStorage.removeItem('authToken');
  showNotification('Logged out successfully', 'success');
  // Reset app state
  resetApp();
}

// Essay submission and evaluation
async function submitEssay(content, taskType = 'task2') {
  try {
    // First submit the essay
    const submitResponse = await api.post('/api/essays/submit', {
      title: `${taskType.toUpperCase()} Essay`,
      content: content,
      task_type: taskType
    });
    
    // Then evaluate it
    const evalResponse = await api.post('/api/ai/evaluate-essay', {
      essay_id: submitResponse.essay_id
    });
    
    return evalResponse;
  } catch (error) {
    console.error('Essay submission error:', error);
    throw error;
  }
}

// Quick evaluation (no database storage)
async function quickEvaluateEssay(content, taskType = 'task2') {
  try {
    const response = await api.post('/api/ai/quick-evaluate', {
      content: content,
      work_type: 'essay',
      task_type: taskType
    });
    
    return response;
  } catch (error) {
    console.error('Quick evaluation error:', error);
    throw error;
  }
}

// Speaking evaluation
async function evaluateSpeaking(transcription, duration = 30) {
  try {
    const response = await api.post('/api/ai/evaluate-speaking', {
      transcription: transcription,
      speaking_duration: duration
    });
    
    return response;
  } catch (error) {
    console.error('Speaking evaluation error:', error);
    throw error;
  }
}

// Get user progress
async function getUserProgress() {
  try {
    const response = await api.get('/api/ai/my-progress');
    return response;
  } catch (error) {
    console.error('Progress fetch error:', error);
    throw error;
  }
}

// Get platform features
async function getPlatformFeatures() {
  try {
    const response = await api.get('/api/demo/features');
    return response;
  } catch (error) {
    console.error('Features fetch error:', error);
    throw error;
  }
}

// Mock reading evaluation (since backend doesn't have this endpoint yet)
async function evaluateReading(answers) {
  // Mock evaluation for reading comprehension
  const mockResponse = {
    scores: {
      reading_comprehension: 6.5,
      vocabulary: 6.0,
      inference: 7.0,
      detail_understanding: 6.5,
      overall_band: 6.5
    },
    evaluation: {
      strengths: [
        "Good understanding of main ideas",
        "Able to identify specific details",
        "Shows good vocabulary knowledge"
      ],
      weaknesses: [
        "Could improve inference skills",
        "More practice with complex texts needed",
        "Work on time management"
      ],
      focus_areas: ["inference", "time_management"]
    },
    improvement_course: {
      title: "Reading Skills Enhancement - 4 Week Program",
      current_level: 6.5,
      target_level: 7.0,
      estimated_duration: "4 weeks",
      weekly_plan: [
        { week: 1, focus: "Skimming and Scanning", activities: ["Practice timed reading", "Identify main ideas quickly"] },
        { week: 2, focus: "Inference Skills", activities: ["Read between the lines", "Practice implied meaning"] },
        { week: 3, focus: "Vocabulary in Context", activities: ["Understand words from context", "Academic vocabulary"] },
        { week: 4, focus: "Test Practice", activities: ["Full reading tests", "Time management"] }
      ]
    }
  };
  
  return new Promise(resolve => {
    setTimeout(() => resolve(mockResponse), 1000);
  });
}

// Mock listening evaluation
async function evaluateListening(answers) {
  const mockResponse = {
    scores: {
      detail_comprehension: 6.0,
      main_idea_understanding: 6.5,
      inference: 5.5,
      note_taking: 6.0,
      overall_band: 6.0
    },
    evaluation: {
      strengths: [
        "Good at understanding main topics",
        "Can follow general conversation flow",
        "Adequate note-taking skills"
      ],
      weaknesses: [
        "Difficulty with specific details",
        "Needs work on inference from audio",
        "Accent recognition could improve"
      ],
      focus_areas: ["detail_listening", "accent_familiarity"]
    },
    improvement_course: {
      title: "Listening Skills Development - 4 Week Program",
      current_level: 6.0,
      target_level: 6.5,
      estimated_duration: "4 weeks",
      weekly_plan: [
        { week: 1, focus: "Active Listening", activities: ["Listen to various accents", "Practice note-taking"] },
        { week: 2, focus: "Detail Recognition", activities: ["Focus on specific information", "Number and name practice"] },
        { week: 3, focus: "Inference Skills", activities: ["Understand implied meaning", "Context clues"] },
        { week: 4, focus: "Test Strategy", activities: ["Full listening tests", "Answer prediction"] }
      ]
    }
  };
  
  return new Promise(resolve => {
    setTimeout(() => resolve(mockResponse), 1000);
  });
}

// Utility functions
function resetApp() {
  // Clear any timers
  Object.values(timers || {}).forEach(timer => clearInterval(timer));
  
  // Reset current answers
  if (typeof currentAnswers !== 'undefined') {
    currentAnswers = {};
  }
  
  // Clear all input fields
  document.querySelectorAll('input, textarea').forEach(input => input.value = '');
  
  // Reset progress bars
  document.querySelectorAll('.progress-fill').forEach(fill => fill.style.width = '0%');
  
  // Hide all results
  document.querySelectorAll('.results').forEach(result => result.classList.add('hidden'));
  
  // Reset tab navigation
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  document.getElementById('writing').classList.add('active');
  document.querySelector('nav button[data-tab="writing"]').classList.add('active');
  
  showNotification('Application reset successfully.', 'success');
}

// Connection monitoring
let isOnline = navigator.onLine;

window.addEventListener('online', () => {
  if (!isOnline) {
    isOnline = true;
    showNotification('Connection restored.', 'success');
  }
});

window.addEventListener('offline', () => {
  isOnline = false;
  showNotification('Connection lost. Please check your internet.', 'error');
});

// Test backend connection on load
window.addEventListener('load', async () => {
  try {
    await api.get('/health');
    showNotification('Connected to GetEdu Backend!', 'success');
  } catch (error) {
    showNotification('Backend connection issue. Some features may not work.', 'warning');
  }
});

// Enhanced keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to submit in textareas
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
      const textarea = activeTab.querySelector('textarea:focus');
      if (textarea) {
        const submitButton = activeTab.querySelector('button[onclick*="submit"]');
        if (submitButton && !submitButton.disabled) {
          submitButton.click();
        }
      }
    }
  }
  
  // Escape to close notifications
  if (e.key === 'Escape') {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => notification.remove());
  }
});

// Auto-save functionality for essays
let autoSaveTimer;

function setupAutoSave(textareaId, key) {
  const textarea = document.getElementById(textareaId);
  if (!textarea) return;
  
  textarea.addEventListener('input', function() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
      const content = this.value;
      if (content.length > 50) {
        localStorage.setItem(key, content);
        showNotification('Draft saved automatically', 'success');
      }
    }, 3000);
  });
  
  // Load saved draft
  const savedContent = localStorage.getItem(key);
  if (savedContent && savedContent.length > 50) {
    textarea.value = savedContent;
    showNotification('Draft loaded', 'success');
  }
}

// Initialize auto-save when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupAutoSave('writingInput', 'essayDraft1');
  setupAutoSave('writingTask2', 'essayDraft2');
});

// Export functions for global use
window.api = api;
window.register = register;
window.login = login;
window.logout = logout;
window.submitEssay = submitEssay;
window.quickEvaluateEssay = quickEvaluateEssay;
window.evaluateSpeaking = evaluateSpeaking;
window.evaluateReading = evaluateReading;
window.evaluateListening = evaluateListening;
window.getUserProgress = getUserProgress;
window.getPlatformFeatures = getPlatformFeatures;
window.resetApp = resetApp;