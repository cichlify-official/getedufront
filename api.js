
const baseURL = 'https://getedubackend.onrender.com';

// Enhanced API utilities with better error handling
const api = {
  // Request timeout in milliseconds
  timeout: 30000,
  
  getAuthHeaders() {
    return {};
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
  
  async getBinary(path) {
    const response = await this.makeRequest(`${baseURL}${path}`);
    return response.blob();
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
  
  async upload(path, key, blob, filename) {
    const form = new FormData();
    form.append(key, blob, filename);
    
    const response = await this.makeRequest(`${baseURL}${path}`, {
      method: 'POST',
      body: form
    });
    return response.json();
  }
};

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
  
  showNotification('Application reset successfully.', 'success');
}

// App initialization
window.addEventListener('load', () => {
  showNotification('Welcome to GetEdu!', 'success');
});

// Enhanced keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to submit in textareas
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
      const submitButton = activeTab.querySelector('button[onclick*="submit"]');
      if (submitButton && !submitButton.disabled) {
        submitButton.click();
      }
    }
  }
  
  // Escape to close notifications
  if (e.key === 'Escape') {
    const notification = document.querySelector('.notification');
    if (notification) {
      notification.remove();
    }
  }
});

// Connection status monitoring
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

// Periodic connection check for better UX
setInterval(async () => {
  if (isOnline) {
    try {
      await fetch(`${baseURL}/health`, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      });
    } catch (error) {
      if (isOnline) {
        showNotification('Server connection issues detected.', 'warning');
      }
    }
  }
}, 60000); // Check every minute
