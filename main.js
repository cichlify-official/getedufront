// Tab navigation
document.querySelectorAll('nav button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
    btn.classList.add('active');
  };
});

// Writing
async function submitWriting() {
  const content = document.getElementById('writingInput').value;
  const data = await api.post('/api/evaluate/writing', { content });
  showResults('writingResults', data);
}

// Reading
async function loadReading() {
  const passage = await api.get('/api/tasks/reading');
  document.getElementById('readingPassage').textContent = passage.text;
}

async function submitReading() {
  const answer = document.getElementById('readingAnswer').value;
  const data = await api.post('/api/evaluate/reading', { answer });
  showResults('readingResults', data);
}

// Speaking
async function submitSpeaking() {
  const blob = recorder.getAudioBlob();
  const data = await api.upload('/api/evaluate/speaking', 'file', blob, 'speech.webm');
  showResults('speakingResults', data);
}

// Listening
async function loadListening() {
  const audio = await api.getBinary('/api/tasks/listening');
  const url = URL.createObjectURL(audio);
  document.getElementById('listeningAudio').src = url;
}

async function submitListening() {
  const ans = document.getElementById('listeningAnswer').value;
  const data = await api.post('/api/evaluate/listening', { answer: ans });
  showResults('listeningResults', data);
}

function showResults(elId, data) {
  const box = document.getElementById(elId);
  box.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  box.classList.remove('hidden');
}
