// Enhanced recorder.js with better camera integration and error handling
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let recordingStream;
let recordingStartTime;

// Check for browser support
function checkBrowserSupport() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showNotification('Your browser does not support audio/video recording.', 'error');
    return false;
  }
  
  if (!window.MediaRecorder) {
    showNotification('MediaRecorder is not supported in your browser.', 'error');
    return false;
  }
  
  return true;
}

// Request camera and microphone permissions
async function requestPermissions() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    });
    
    // Stop the stream immediately after getting permission
    stream.getTracks().forEach(track => track.stop());
    
    showNotification('Camera and microphone access granted!', 'success');
    return true;
  } catch (error) {
    console.error('Permission error:', error);
    
    let errorMessage = 'Unable to access camera/microphone. ';
    
    if (error.name === 'NotAllowedError') {
      errorMessage += 'Please allow camera and microphone access in your browser.';
    } else if (error.name === 'NotFoundError') {
      errorMessage += 'No camera or microphone found on your device.';
    } else if (error.name === 'NotReadableError') {
      errorMessage += 'Camera or microphone is already in use by another application.';
    } else {
      errorMessage += 'Please check your device settings and try again.';
    }
    
    showNotification(errorMessage, 'error');
    return false;
  }
}

// Start recording function
async function startRecording() {
  if (!checkBrowserSupport()) return;
  
  try {
    // Request fresh stream for recording
    recordingStream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
      }, 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    });
    
    const videoPreview = document.getElementById('videoPreview');
    if (videoPreview) {
      videoPreview.srcObject = recordingStream;
    }
    
    // Set up MediaRecorder
    const options = {
      mimeType: 'video/webm;codecs=vp9,opus',
      videoBitsPerSecond: 1000000,
      audioBitsPerSecond: 128000
    };
    
    // Fallback for browsers that don't support vp9
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options.mimeType = 'video/webm;codecs=vp8,opus';
    }
    
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options.mimeType = 'video/webm';
    }
    
    mediaRecorder = new MediaRecorder(recordingStream, options);
    recordedChunks = [];
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      stopRecordingStream();
      
      // Enable submit button
      const submitBtn = document.getElementById('submitSpeakingBtn');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-disabled');
      }
      
      showNotification('Recording completed successfully!', 'success');
      
      // Create blob for analysis
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      console.log(`Recording size: ${(blob.size / (1024 * 1024)).toFixed(2)} MB`);
      
      // Show recording duration
      const duration = (Date.now() - recordingStartTime) / 1000;
      showNotification(`Recording duration: ${duration.toFixed(1)} seconds`, 'info');
    };
    
    mediaRecorder.onerror = (event) => {
      console.error('MediaRecorder error:', event.error);
      showNotification('Recording error occurred.', 'error');
      stopRecording();
    };
    
    // Start recording
    recordingStartTime = Date.now();
    mediaRecorder.start(1000); // Collect data every second
    isRecording = true;
    
    // Update UI
    updateRecordingUI(true);
    
    // Start timer display
    startRecordingTimer();
    
    showNotification('Recording started! Speak clearly into your microphone.', 'success');
    
    // Auto-stop after 3 minutes (safety measure)
    setTimeout(() => {
      if (isRecording) {
        stopRecording();
        showNotification('Recording stopped automatically after 3 minutes.', 'warning');
      }
    }, 180000);
    
  } catch (error) {
    console.error('Error starting recording:', error);
    
    let errorMessage = 'Failed to start recording. ';
    
    if (error.name === 'NotAllowedError') {
      errorMessage += 'Please allow camera and microphone access.';
    } else if (error.name === 'NotFoundError') {
      errorMessage += 'No camera or microphone found.';
    } else if (error.name === 'NotReadableError') {
      errorMessage += 'Camera or microphone is busy.';
    } else {
      errorMessage += 'Please check your device and try again.';
    }
    
    showNotification(errorMessage, 'error');
  }
}

// Stop recording function
function stopRecording() {
  if (mediaRecorder && isRecording) {
    try {
      mediaRecorder.stop();
      isRecording = false;
      
      // Update UI immediately
      updateRecordingUI(false);
      
      // Stop timer
      stopRecordingTimer();
      
    } catch (error) {
      console.error('Error stopping recording:', error);
      showNotification('Error stopping recording.', 'error');
    }
  }
}

// Stop recording stream and release resources
function stopRecordingStream() {
  if (recordingStream) {
    recordingStream.getTracks().forEach(track => {
      track.stop();
      console.log(`Stopped ${track.kind} track`);
    });
    recordingStream = null;
  }
  
  const videoPreview = document.getElementById('videoPreview');
  if (videoPreview) {
    videoPreview.srcObject = null;
  }
}

// Update UI based on recording state
function updateRecordingUI(recording) {
  const startBtn = document.querySelector('button[onclick="startRecording()"]');
  const stopBtn = document.getElementById('stopBtn');
  const videoPreview = document.getElementById('videoPreview');
  
  if (startBtn) {
    startBtn.disabled = recording;
    startBtn.classList.toggle('btn-disabled', recording);
    startBtn.textContent = recording ? '🔴 Recording...' : '🎥 Start Recording';
  }
  
  if (stopBtn) {
    stopBtn.disabled = !recording;
    stopBtn.classList.toggle('btn-disabled', !recording);
  }
  
  if (videoPreview) {
    videoPreview.style.border = recording ? 
      '3px solid #ff416c' : 
      '1px solid rgba(255, 255, 255, 0.2)';
  }
}

// Recording timer
let recordingTimerInterval;

function startRecordingTimer() {
  const timerElement = document.getElementById('speakingTimer');
  if (!timerElement) return;
  
  recordingTimerInterval = setInterval(() => {
    const elapsed = (Date.now() - recordingStartTime) / 1000;
    const minutes = Math.floor(elapsed / 60);
    const seconds = Math.floor(elapsed % 60);
    
    timerElement.textContent = `Recording: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerElement.style.background = 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)';
  }, 1000);
}

function stopRecordingTimer() {
  if (recordingTimerInterval) {
    clearInterval(recordingTimerInterval);
    recordingTimerInterval = null;
  }
  
  const timerElement = document.getElementById('speakingTimer');
  if (timerElement) {
    timerElement.textContent = 'Recording completed';
    timerElement.style.background = 'var(--cyber-accent)';
  }
}

// Audio-only recording for pronunciation practice
async function startPronunciationRecording() {
  if (!checkBrowserSupport()) return;
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    });
    
    const audioRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus'
    });
    const audioChunks = [];
    
    audioRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };
    
    audioRecorder.onstop = () => {
      stream.getTracks().forEach(track => track.stop());
      
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      
      // Create audio element for playback
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = URL.createObjectURL(audioBlob);
      audio.style.cssText = 'width: 100%; margin-top: 15px; border-radius: 8px;';
      
      const practiceResults = document.getElementById('practiceResults');
      if (practiceResults) {
        practiceResults.innerHTML = `
          <h4>Your Pronunciation Recording:</h4>
          <p>Listen to your pronunciation and compare with the examples:</p>
        `;
        practiceResults.appendChild(audio);
        practiceResults.classList.remove('hidden');
      }
      
      showNotification('Pronunciation recording completed!', 'success');
    };
    
    audioRecorder.start();
    showNotification('Recording pronunciation... (30 seconds max)', 'info');
    
    // Auto-stop after 30 seconds
    setTimeout(() => {
      if (audioRecorder.state === 'recording') {
        audioRecorder.stop();
      }
    }, 30000);
    
  } catch (error) {
    console.error('Error starting pronunciation recording:', error);
    showNotification('Error accessing microphone for pronunciation practice.', 'error');
  }
}

// Fluency practice timer
function startFluencyPractice() {
  let prepTime = 30; // 30 seconds preparation
  const timer = document.getElementById('fluencyTimer');
  if (!timer) return;
  
  const prepCountdown = setInterval(() => {
    prepTime--;
    if (prepTime <= 0) {
      clearInterval(prepCountdown);
      timer.textContent = 'Preparation finished! Start speaking for 1 minute.';
      timer.style.background = 'var(--cyber-accent)';
      
      // Start speaking timer
      startSpeakingTimer();
    } else {
      timer.textContent = `Preparation Time: 00:${prepTime.toString().padStart(2, '0')}`;
      timer.style.background = 'var(--cyber-warning)';
    }
  }, 1000);
}

function startSpeakingTimer() {
  let speakingTime = 60; // 60 seconds speaking
  const timer = document.getElementById('fluencyTimer');
  if (!timer) return;
  
  const speakingCountdown = setInterval(() => {
    speakingTime--;
    if (speakingTime <= 0) {
      clearInterval(speakingCountdown);
      timer.textContent = 'Time\'s up! Well done.';
      timer.style.background = 'var(--cyber-success)';
      showNotification('Fluency practice completed! Great job!', 'success');
    } else {
      const minutes = Math.floor(speakingTime / 60);
      const seconds = speakingTime % 60;
      timer.textContent = `Speaking Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
      timer.style.background = 'var(--cyber-accent)';
    }
  }, 1000);
}

// Check permissions on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Check if we have permission already
    const permissions = await navigator.permissions.query({ name: 'camera' });
    
    if (permissions.state === 'granted') {
      showNotification('Camera access already granted ✓', 'success');
    } else if (permissions.state === 'denied') {
      showNotification('Camera access denied. Please enable in browser settings.', 'warning');
    }
    
    // Also check microphone
    const micPermissions = await navigator.permissions.query({ name: 'microphone' });
    
    if (micPermissions.state === 'denied') {
      showNotification('Microphone access denied. Please enable in browser settings.', 'warning');
    }
    
  } catch (error) {
    console.log('Permission API not fully supported in this browser');
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (isRecording) {
    stopRecording();
  }
  stopRecordingStream();
});

// Export functions for global access
window.startRecording = startRecording;
window.stopRecording = stopRecording;
window.startPronunciationRecording = startPronunciationRecording;
window.startFluencyPractice = startFluencyPractice;
window.requestPermissions = requestPermissions;