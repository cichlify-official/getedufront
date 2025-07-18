let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.getElementById('videoPreview').srcObject = stream;

  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };
  mediaRecorder.onstop = uploadRecording;
  mediaRecorder.start();
}

function stopRecording() {
  mediaRecorder.stop();
}

function uploadRecording() {
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const formData = new FormData();
  formData.append('file', blob, 'recording.webm');

  fetch(`${baseURL}/speaking/upload`, {
    method: 'POST',
    body: formData,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json()).then(data => {
    alert('Uploaded!');
  });
}
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    });
    
    const videoPreview = document.getElementById('videoPreview');
    videoPreview.srcObject = stream;
    
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9,opus'
    });
    
    recordedChunks = [];
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      // Stop all tracks to release camera/microphone
      stream.getTracks().forEach(track => track.stop());
      videoPreview.srcObject = null;
      
      // Enable submit button
      document.getElementById('submitSpeakingBtn').disabled = false;
      showNotification('Recording completed successfully.', 'success');
    };
    
    mediaRecorder.start();
    isRecording = true;
    
    // Update UI
    document.querySelector('button[onclick="startRecording()"]').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    
    showNotification('Recording started. Speak clearly into your microphone.', 'success');
    
  } catch (error) {
    console.error('Error starting recording:', error);
    showNotification('Error accessing camera/microphone. Please check permissions.', 'error');
  }
}

function stopRecording() {
  if (mediaRecorder && isRecording) {
    mediaRecorder.stop();
    isRecording = false;
    
    // Update UI
    document.querySelector('button[onclick="startRecording()"]').disabled = false;
    document.getElementById('stopBtn').disabled = true;
  }
}

// Practice recording functions
async function startPronunciationRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    const audioRecorder = new MediaRecorder(stream);
    const audioChunks = [];
    
    audioRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };
    
    audioRecorder.onstop = () => {
      stream.getTracks().forEach(track => track.stop());
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      
      // Create audio element for playback
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = URL.createObjectURL(audioBlob);
      
      const practiceResults = document.getElementById('practiceResults');
      practiceResults.innerHTML = '<h4>Your Recording:</h4>';
      practiceResults.appendChild(audio);
      practiceResults.classList.remove('hidden');
    };
    
    audioRecorder.start();
    
    // Auto-stop after 30 seconds
    setTimeout(() => {
      if (audioRecorder.state === 'recording') {
        audioRecorder.stop();
      }
    }, 30000);
    
    showNotification('Recording pronunciation... (30 seconds max)', 'info');
    
  } catch (error) {
    console.error('Error starting pronunciation recording:', error);
    showNotification('Error accessing microphone.', 'error');
  }
}

function startFluencyPractice() {
  let timeLeft = 30; // 30 seconds preparation
  const timer = document.getElementById('fluencyTimer');
  
  const countdown = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      timer.textContent = 'Preparation finished! Start speaking for 1 minute.';
      timer.style.background = 'var(--cyber-accent)';
      
      // Start speaking timer
      startSpeakingTimer();
    } else {
      timer.textContent = `Preparation Time: 00:${timeLeft.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

function startSpeakingTimer() {
  let speakingTime = 60; // 60 seconds speaking
  const timer = document.getElementById('fluencyTimer');
  
  const speakingCountdown = setInterval(() => {
    speakingTime--;
    if (speakingTime <= 0) {
      clearInterval(speakingCountdown);
      timer.textContent = 'Time\'s up! Well done.';
      timer.style.background = 'var(--cyber-error)';
      showNotification('Fluency practice completed!', 'success');
    } else {
      const minutes = Math.floor(speakingTime / 60);
      const seconds = speakingTime % 60;
      timer.textContent = `Speaking Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

// Check for microphone permission on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const permissions = await navigator.permissions.query({ name: 'microphone' });
    if (permissions.state === 'denied') {
      showNotification('Microphone access is required for speaking assessments.', 'warning');
    }
  } catch (error) {
    console.log('Permission API not supported');
  }
});
