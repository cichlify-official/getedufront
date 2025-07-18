let mediaRecorder;
let audioBlob;

function submitEssay() {
  const essay = document.getElementById("essayInput").value;
  fetch("https://getedubackend.onrender.com/evaluate/writing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ essay })
  })
  .then(res => res.json())
  .then(data => displayResults(data))
  .catch(err => alert("Essay error: " + err));
}

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      audioBlob = new Blob(chunks, { type: "audio/webm" });
    };
    mediaRecorder.start();
  });
}

function stopRecording() {
  if (mediaRecorder) mediaRecorder.stop();
}

function submitAudio() {
  const formData = new FormData();
  formData.append("audio", audioBlob, "speaking.webm");

  fetch("https://getedubackend.onrender.com/evaluate/speaking", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => displayResults(data))
  .catch(err => alert("Speaking error: " + err));
}

function displayResults(data) {
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("strengths").textContent = data.strengths || "N/A";
  document.getElementById("weaknesses").textContent = data.weaknesses || "N/A";
}

function getCourse() {
  fetch("https://getedubackend.onrender.com/generate/course", {
    method: "POST"
  })
  .then(res => res.json())
  .then(data => {
    const courseList = document.getElementById("courseContent");
    courseList.innerHTML = "";
    (data.courseOutline || []).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      courseList.appendChild(li);
    });
    document.getElementById("course").classList.remove("hidden");
  });
}
