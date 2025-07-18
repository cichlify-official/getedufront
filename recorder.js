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
