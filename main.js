// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeDashboard();
  initializeStudentsPage();
  initializeTeachersPage();
  initializeClassesPage();
  initializeParentsPage();
  initializeAIInsightsPage();
});

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active class from all links and pages
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      // Add active class to clicked link
      link.classList.add('active');

      // Show corresponding page
      const pageId = link.dataset.page;
      document.getElementById(pageId).classList.add('active');
    });
  });
}

// Dashboard overview initialization
function initializeDashboard() {
  createPerformanceChart();
  createAttendanceChart();
  createOverallPerformanceChart();
}

// Chart creation functions
function createPerformanceChart() {
  const ctx = document.getElementById('performanceChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: window.dashboardData.performanceData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12,
              family: 'Inter'
            }
          }
        }
      }
    }
  });
}

function createAttendanceChart() {
  const ctx = document.getElementById('attendanceChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Attendance Rate (%)',
        data: [88, 92, 89, 94, 91, 89.5],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 80,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}

function createOverallPerformanceChart() {
  const ctx = document.getElementById('overallPerformanceChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['A2', 'B1', 'B2', 'C1', 'C2'],
      datasets: [{
        label: 'Average Score',
        data: [5.2, 6.1, 7.0, 8.1, 8.8],
        backgroundColor: '#10B981',
        borderColor: '#059669',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 9,
          ticks: {
            callback: function(value) {
              return value + '/9';
            }
          }
        }
      }
    }
  });
}

// Students page initialization
function initializeStudentsPage() {
  renderStudentsGrid();
  initializeStudentModal();
}

function renderStudentsGrid() {
  const grid = document.getElementById('studentsGrid');
  if (!grid) return;

  grid.innerHTML = window.dashboardData.students.map(student => `
    <div class="student-card" onclick="showStudentDetails(${student.id})">
      <div class="student-header">
        <div>
          <div class="student-name">${student.name}</div>
          <div class="student-group">${student.group}</div>
        </div>
        <div class="attendance-badge">${student.attendance}%</div>
      </div>

      <div class="performance-overview">
        <div class="skill-item">
          <span class="skill-name">Speaking</span>
          <span class="skill-score">${student.performance.speaking}</span>
        </div>
        <div class="skill-item">
          <span class="skill-name">Listening</span>
          <span class="skill-score">${student.performance.listening}</span>
        </div>
        <div class="skill-item">
          <span class="skill-name">Reading</span>
          <span class="skill-score">${student.performance.reading}</span>
        </div>
        <div class="skill-item">
          <span class="skill-name">Writing</span>
          <span class="skill-score">${student.performance.writing}</span>
        </div>
      </div>

      <div class="progress-section">
        <h4>Current Goals</h4>
        ${student.goals.slice(0, 2).map(goal => `
          <div class="progress-item">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${goal.progress}%"></div>
            </div>
            <span class="progress-text">${goal.progress}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function showStudentDetails(studentId) {
  const student = window.dashboardData.students.find(s => s.id === studentId);
  if (!student) return;

  const modal = document.getElementById('studentModal');
  const details = document.getElementById('studentDetails');

  details.innerHTML = `
    <h2>${student.name}</h2>
    <p><strong>Group:</strong> ${student.group}</p>
    <p><strong>Attendance:</strong> ${student.attendance}%</p>

    <div class="radar-container">
      <canvas id="studentRadar"></canvas>
    </div>

    <div class="skills-legend">
      ${Object.entries(student.performance).map(([skill, score]) => `
        <div class="legend-item">
          <span class="legend-skill">${skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
          <span class="legend-score">${score}</span>
        </div>
      `).join('')}
    </div>

    <h3>AI Feedback</h3>
    <ul>
      ${student.aiFeedback.map(feedback => `<li>${feedback}</li>`).join('')}
    </ul>

    <h3>Goals & Progress</h3>
    ${student.goals.map(goal => `
      <div class="progress-item" style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>${goal.goal}</span>
          <span>${goal.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${goal.progress}%"></div>
        </div>
      </div>
    `).join('')}
  `;

  modal.style.display = 'block';

  // Create radar chart
  setTimeout(() => {
    createStudentRadarChart(student);
  }, 100);
}

function createStudentRadarChart(student) {
  const ctx = document.getElementById('studentRadar');
  if (!ctx) return;

  const skills = ['Speaking', 'Listening', 'Reading', 'Writing'];
  const scores = [
    student.performance.speaking,
    student.performance.listening,
    student.performance.reading,
    student.performance.writing
  ];

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: skills,
      datasets: [{
        label: student.name,
        data: scores,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#10B981'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 9,
          min: 0
        }
      }
    }
  });
}

function createTeacherAttributeCharts(teacher) {
  createGeneralEnglishChart(teacher);
  createIELTSSkillsChart(teacher);
}

function createGeneralEnglishChart(teacher) {
  const ctx = document.getElementById('generalEnglishChart');
  if (!ctx) return;

  const teacherAttributes = window.dashboardData.teacherAttributes[teacher.id] || {};
  const generalSkills = teacherAttributes.generalEnglish || {
    vocabulary: 8.5,
    grammar: 9.0,
    pronunciation: 7.5,
    conversation: 8.0,
    writing: 7.0
  };

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Vocabulary', 'Grammar', 'Pronunciation', 'Conversation', 'Writing'],
      datasets: [{
        label: 'Teaching Strength',
        data: [
          generalSkills.vocabulary,
          generalSkills.grammar,
          generalSkills.pronunciation,
          generalSkills.conversation,
          generalSkills.writing
        ],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#10B981'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 10,
          min: 0
        }
      }
    }
  });
}

function createIELTSSkillsChart(teacher) {
  const ctx = document.getElementById('ieltsSkillsChart');
  if (!ctx) return;

  const teacherAttributes = window.dashboardData.teacherAttributes[teacher.id] || {};
  const ieltsSkills = teacherAttributes.ieltsSkills || {
    listening: 8.0,
    reading: 8.5,
    writing: 7.5,
    speaking: 9.0
  };

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Listening', 'Reading', 'Writing', 'Speaking'],
      datasets: [{
        label: 'IELTS Teaching Expertise',
        data: [
          ieltsSkills.listening,
          ieltsSkills.reading,
          ieltsSkills.writing,
          ieltsSkills.speaking
        ],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        pointBackgroundColor: '#4F46E5',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4F46E5'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 10,
          min: 0
        }
      }
    }
  });
}

function initializeStudentModal() {
  const modal = document.getElementById('studentModal');
  const span = document.getElementsByClassName('close')[0];

  span.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}

// Teachers page initialization
function initializeTeachersPage() {
  renderTeachersGrid();
}

function renderTeachersGrid() {
  const grid = document.getElementById('teachersGrid');
  if (!grid) return;

  grid.innerHTML = window.dashboardData.teachers.map(teacher => `
    <div class="teacher-card" onclick="showTeacherDetails(${teacher.id})">
      <div class="teacher-header">
        <div class="teacher-avatar">${teacher.avatar}</div>
        <h3>${teacher.name}</h3>
        <p>${teacher.classes.join(', ')}</p>
      </div>

      <div class="teacher-stats">
        <div class="teacher-stat">
          <div class="stat-value">${teacher.lessonsThisMonth}</div>
          <div class="stat-label">Lessons</div>
        </div>
        <div class="teacher-stat">
          <div class="stat-value">${teacher.avgStudentImprovement}</div>
          <div class="stat-label">Avg Score</div>
        </div>
        <div class="teacher-stat">
          <div class="stat-value">${teacher.satisfactionRate}%</div>
          <div class="stat-label">Satisfaction</div>
        </div>
      </div>

      <div class="ai-suggestions">
        <h4>AI Suggestions</h4>
        ${teacher.aiSuggestions.map(suggestion => `
          <div class="suggestion-item">${suggestion}</div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Classes page initialization
function initializeClassesPage() {
  renderClassesGrid();
}

function renderClassesGrid() {
  const grid = document.getElementById('classesGrid');
  if (!grid) return;

  grid.innerHTML = window.dashboardData.classes.map(classItem => `
    <div class="class-card">
      <div class="class-header">
        <div class="class-name">${classItem.name}</div>
        <div class="class-teacher">Teacher: ${classItem.teacher}</div>
        <div class="class-teacher">${classItem.schedule}</div>
      </div>

      <div class="class-stats">
        <div class="teacher-stat">
          <div class="stat-value">${classItem.studentsCount}</div>
          <div class="stat-label">Students</div>
        </div>
        <div class="teacher-stat">
          <div class="stat-value">${classItem.avgAttendance}%</div>
          <div class="stat-label">Attendance</div>
        </div>
      </div>

      <div class="performance-overview">
        ${Object.entries(classItem.skillsAverage).map(([skill, score]) => `
          <div class="skill-item">
            <span class="skill-name">${skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
            <span class="skill-score">${score}</span>
          </div>
        `).join('')}
      </div>

      <div class="heatmap">
        <h4>Performance Heatmap</h4>
        <div class="heatmap-grid">
          ${Object.entries(classItem.performanceHeatmap).map(([week, level]) => `
            <div class="heatmap-cell ${level}">W${week.slice(-1)}</div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Teacher details functionality
function showTeacherDetails(teacherId) {
  const teacher = window.dashboardData.teachers.find(t => t.id === teacherId);
  if (!teacher) return;

  const modal = document.getElementById('teacherModal');
  const details = document.getElementById('teacherDetails');

  // Get students for this teacher
  const teacherStudents = window.dashboardData.students.filter(student => 
    teacher.classes.includes(student.group)
  );

  details.innerHTML = `
    <div class="teacher-detail-header">
      <div class="teacher-detail-avatar">${teacher.avatar}</div>
      <div class="teacher-detail-info">
        <h2>${teacher.name}</h2>
        <p>${teacher.classes.join(', ')}</p>
        <p>${teacher.studentsCount} students | ${teacher.avgStudentImprovement} avg score</p>
      </div>
    </div>

    <div class="teacher-attributes-section">
      <h3>Teaching Strengths & Attributes</h3>
      <div class="attributes-charts">
        <div class="attribute-chart-container">
          <h4>General English Skills</h4>
          <canvas id="generalEnglishChart"></canvas>
        </div>
        <div class="attribute-chart-container">
          <h4>IELTS Skills</h4>
          <canvas id="ieltsSkillsChart"></canvas>
        </div>
      </div>
    </div>

    <h3>Student Performance</h3>
    <div class="teacher-students-grid">
      ${teacherStudents.map(student => `
        <div class="teacher-student-card" onclick="showStudentPieChart('${student.name}', ${JSON.stringify(student.performance).replace(/"/g, '&quot;')})">
          <div class="teacher-student-name">${student.name}</div>
          <div class="teacher-student-score">Overall: ${((student.performance.speaking + student.performance.listening + student.performance.reading + student.performance.writing) / 4).toFixed(1)}</div>
        </div>
      `).join('')}
    </div>

    <h3>Teaching Calendar</h3>
    <div class="teacher-calendar">
      <div class="calendar-header">
        <h4>January 2024</h4>
        <div class="calendar-nav">
          <button onclick="previousMonth()">‹</button>
          <button onclick="nextMonth()">›</button>
        </div>
      </div>
      <div class="calendar-legend">
        <div class="legend-item">
          <span class="legend-color had-lesson"></span>
          <span>Lesson Completed</span>
        </div>
        <div class="legend-item">
          <span class="legend-color missed-lesson"></span>
          <span>Lesson Missed</span>
        </div>
        <div class="legend-item">
          <span class="legend-color upcoming-lesson"></span>
          <span>Upcoming Lesson</span>
        </div>
      </div>
      <div class="calendar-grid" id="teacherCalendarGrid">
        ${generateEnhancedCalendarDays(teacherId)}
      </div>
    </div>
  `;

  modal.style.display = 'block';

  // Create teacher attribute charts after modal is shown
  setTimeout(() => {
    createTeacherAttributeCharts(teacher);
  }, 100);
}

function generateEnhancedCalendarDays(teacherId) {
  const calendar = window.dashboardData.enhancedTeacherCalendar[teacherId] || {};
  const days = [];
  const today = new Date();
  const currentDay = today.getDate();
  
  // Generate days for January 2024 (simplified)
  for (let day = 1; day <= 31; day++) {
    const dateKey = `2024-01-${day.toString().padStart(2, '0')}`;
    const dayData = calendar[dateKey];
    
    let dayClass = 'enhanced-calendar-day';
    let tooltip = '';
    
    if (dayData) {
      if (day < currentDay) {
        // Past days
        if (dayData.lessonStatus === 'completed') {
          dayClass += ' had-lesson';
          tooltip = `
            <div class="enhanced-tooltip">
              <div class="tooltip-header">Lesson Completed</div>
              <div class="tooltip-content">
                <strong>Group:</strong> ${dayData.group}<br>
                <strong>Topic:</strong> ${dayData.topic}<br>
                <strong>Duration:</strong> ${dayData.duration}<br>
                <strong>Students Present:</strong> ${dayData.studentsPresent}/${dayData.totalStudents}
              </div>
            </div>
          `;
        } else {
          dayClass += ' missed-lesson';
          tooltip = `
            <div class="enhanced-tooltip">
              <div class="tooltip-header">Lesson Missed</div>
              <div class="tooltip-content">
                <strong>Scheduled Group:</strong> ${dayData.group}<br>
                <strong>Reason:</strong> ${dayData.reason || 'Not specified'}
              </div>
            </div>
          `;
        }
      } else {
        // Future days
        dayClass += ' upcoming-lesson';
        tooltip = `
          <div class="enhanced-tooltip">
            <div class="tooltip-header">Upcoming Lesson</div>
            <div class="tooltip-content">
              <strong>Group:</strong> ${dayData.group}<br>
              <strong>Topic:</strong> ${dayData.topic}<br>
              <strong>Time:</strong> ${dayData.time}<br>
              <strong>Duration:</strong> ${dayData.duration}
            </div>
          </div>
        `;
      }
    }
    
    if (day === currentDay) {
      dayClass += ' today';
    }
    
    days.push(`
      <div class="${dayClass}" data-tooltip='${tooltip}'>
        ${day}
      </div>
    `);
  }
  
  return days.join('');
}

function showStudentPieChart(studentName, performance) {
  alert(`${studentName}'s Performance:\n\nSpeaking: ${performance.speaking}\nListening: ${performance.listening}\nReading: ${performance.reading}\nWriting: ${performance.writing}`);
}

function closeTeacherModal() {
  document.getElementById('teacherModal').style.display = 'none';
}

function previousMonth() {
  // Implementation for previous month navigation
  console.log('Previous month clicked');
}

function nextMonth() {
  // Implementation for next month navigation  
  console.log('Next month clicked');
}

// Parents page initialization
function initializeParentsPage() {
  renderWhatsAppChats();
  renderParentsGrid();
}

function renderWhatsAppChats() {
  const chatList = document.getElementById('chatList');
  if (!chatList) return;

  chatList.innerHTML = window.dashboardData.whatsappChats.map(chat => `
    <div class="chat-item" onclick="openWhatsAppChat('${chat.parentName}')">
      <div class="chat-avatar">${chat.avatar}</div>
      <div class="chat-content">
        <div class="chat-name">${chat.parentName}</div>
        <div class="chat-preview">${chat.lastMessage}</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
        <div class="chat-time">${chat.time}</div>
        ${chat.unread > 0 ? `<div class="chat-unread">${chat.unread}</div>` : ''}
      </div>
    </div>
  `).join('');
}

function renderParentsGrid() {
  const grid = document.getElementById('parentsGrid');
  if (!grid) return;

  grid.innerHTML = window.dashboardData.parents.map(parent => `
    <div class="parent-card" onclick="openWhatsAppChat('${parent.name}')">
      <div class="parent-header">
        <div class="parent-avatar">${parent.name.split(' ').map(n => n[0]).join('')}</div>
        <div class="parent-info">
          <h3>${parent.name}</h3>
          <p>Parent of ${parent.children.join(', ')}</p>
        </div>
      </div>
      
      <div class="parent-stats">
        <div class="parent-stat">
          <div class="parent-stat-value">${parent.totalMessages}</div>
          <div class="parent-stat-label">Messages</div>
        </div>
        <div class="parent-stat">
          <div class="parent-stat-value">${parent.responseRate}</div>
          <div class="parent-stat-label">Response Rate</div>
        </div>
      </div>
      
      <button class="whatsapp-button" onclick="event.stopPropagation(); openWhatsAppChat('${parent.name}')">
        <span>📱</span>
        Open WhatsApp Chat
      </button>
    </div>
  `).join('');
}

function openWhatsAppChat(parentName) {
  const parent = window.dashboardData.parents.find(p => p.name === parentName);
  if (parent && parent.phone) {
    const message = encodeURIComponent(`Hello ${parentName}, this is regarding your child's progress.`);
    window.open(`https://wa.me/${parent.phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  }
}

// AI Insights page initialization
function initializeAIInsightsPage() {
  // AI insights are already in the HTML structure
  // This function can be used for any dynamic updates
}

// Search functionality
function filterStudents() {
  const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
  const studentCards = document.querySelectorAll('.student-card');

  studentCards.forEach(card => {
    const studentName = card.querySelector('.student-name').textContent.toLowerCase();
    const studentGroup = card.querySelector('.student-group').textContent.toLowerCase();

    if (studentName.includes(searchTerm) || studentGroup.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Utility functions
function formatScore(score) {
  return typeof score === 'number' ? score.toFixed(1) : score;
}

function getScoreColor(score) {
  if (score >= 7) return 'var(--success)';
  if (score >= 5.5) return 'var(--warning)';
  return 'var(--error)';
}

// Add enhanced tooltip functionality
document.addEventListener('DOMContentLoaded', function() {
  // Handle enhanced calendar tooltips
  document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('enhanced-calendar-day') && e.target.dataset.tooltip) {
      const tooltip = e.target.dataset.tooltip;
      if (tooltip && tooltip !== '') {
        const tooltipDiv = document.createElement('div');
        tooltipDiv.innerHTML = tooltip;
        tooltipDiv.className = 'enhanced-tooltip';
        e.target.appendChild(tooltipDiv);
      }
    }
  });

  document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('enhanced-calendar-day')) {
      const tooltip = e.target.querySelector('.enhanced-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    }
  });
});

// Initialize everything when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
  initializeNavigation();
}