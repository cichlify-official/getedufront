const baseURL = 'http://localhost:8000';

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${baseURL}/auth/jwt/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${email}&password=${password}`,
  });

  const data = await res.json();
  localStorage.setItem('token', data.access_token);
  alert('Logged in successfully!');
}

async function submitWriting() {
  const token = localStorage.getItem('token');
  const content = document.getElementById('writingTask').value;

  const res = await fetch(`${baseURL}/writing/submit`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  });

  const data = await res.json();
  alert("Submitted: " + data.message);
}
