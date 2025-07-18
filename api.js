const baseURL = 'https://getedubackend.onrender.com';

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
const api = {
  async get(path) {
    const res = await fetch(`https://getedubackend.onrender.com${path}`);
    return res.json();
  },
  async getBinary(path) {
    const res = await fetch(`https://getedubackend.onrender.com${path}`);
    return res.blob();
  },
  async post(path, payload) {
    const res = await fetch(`https://getedubackend.onrender.com${path}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    return res.json();
  },
  async upload(path, key, blob, filename) {
    const form = new FormData();
    form.append(key, blob, filename);
    const res = await fetch(`https://getedubackend.onrender.com${path}`, {
      method: 'POST',
      body: form
    });
    return res.json();
  }
};
