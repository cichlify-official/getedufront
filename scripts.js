const API = 'https://getedubackend.onrender.com/api';
let recorder, audioChunks, audioBlob;

document.getElementById('submitEssay').onclick = async () => {
  const text = document.getElementById('essayInput').value;
  const res = await fetch(`${API}/evaluate/writing`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({essay: text})
  });
  const data = await res.json();
  showResults(data, 'Writing');
};

document.getElementById('startRec').onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
  recorder = new MediaRecorder(stream);
  audioChunks = [];
  recorder.ondataavailable = e => audioChunks.push(e.data);
  recorder.onstop = () => {
    audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    document.getElementById('submitAudio').disabled = false;
  };
  recorder.start();
  document.getElementById('startRec').disabled = true;
  document.getElementById('stopRec').disabled = false;
};

document.getElementById('stopRec').onclick = () => {
  recorder.stop();
  document.getElementById('stopRec').disabled = true;
};

document.getElementById('submitAudio').onclick = async () => {
  const form = new FormData();
  form.append('audio', audioBlob, 'speech.webm');
  const res = await fetch(`${API}/evaluate/speaking`, {
    method: 'POST',
    body: form
  });
  const data = await res.json();
  showResults(data, 'Speaking');
};

function showResults(data, type) {
  const bars = document.getElementById('bars');
  bars.innerHTML = '';
  if (data.raw_scores) {
    Object.entries(data.raw_scores).forEach(([k, v]) => {
      const pct = (v / 9 * 100).toFixed();
      bars.innerHTML += `
        <div>
          <div class="flex justify-between"><span>${k.toUpperCase()}</span><span>${v}</span></div>
          <div class="w-full h-2 bg-gray-200 rounded"><div class="h-2 bg-blue-600 rounded" style="width:${pct}%"></div></div>
        </div>`;
    });
  }

  document.getElementById('results').classList.remove('hidden');
}

document.getElementById('getCourse').onclick = async () => {
  const res = await fetch(`${API}/generate/course`, { method:'POST' });
  const data = await res.json();
  const list = document.getElementById('courseContent');
  list.innerHTML = '';
  data.courseOutline.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  document.getElementById('course').classList.remove('hidden');
};
