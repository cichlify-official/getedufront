// Fixed main.js - Connected to GetEdu Backend API
let currentAnswers = {};
let timers = {};

// Tab navigation
document.querySelectorAll('nav button').forEach(btn => {
  btn.onclick = () => {
    if (btn.dataset.tab) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
      document.getElementById(btn.dataset.tab).classList.add('active');
      btn.classList.add('active');
      
      // Initialize timers for different sections
      initializeTimer(btn.dataset.tab);
    }
  };
});

// Timer functionality
function initializeTimer(section) {
  if (timers[section]) {
    clearInterval(timers[section]);
  }
  
  let timeLeft;
  let timerElement;
  
  switch(section) {
    case 'writing':
      timeLeft = 20 * 60; // 20 minutes
      timerElement = document.getElementById('writingTimer');
      break;
    case 'reading':
      timeLeft = 60 * 60; // 60 minutes
      timerElement = document.getElementById('readingTimer');
      break;
    case 'speaking':
      timeLeft = 1 * 60; // 1 minute prep
      timerElement = document.getElementById('speakingTimer');
      break;
    case 'listening':
      timeLeft = 30 * 60; // 30 minutes
      timerElement = document.getElementById('listeningTimer');
      break;
    default:
      return;
  }
  
  timers[section] = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timers[section]);
      timerElement.textContent = "Time's Up!";
      timerElement.style.background = 'var(--cyber-error)';
      showNotification('Time is up for this section!', 'warning');
      return;
    }
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `Time Remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

// Multiple choice selection
function selectChoice(element, questionName, value) {
  const group = element.closest('.multiple-choice') || element.parentElement;
  group.querySelectorAll('.choice').forEach(choice => choice.classList.remove('selected'));
  
  element.classList.add('selected');
  currentAnswers[questionName] = value;
}

// Progress tracking for writing
function updateProgress() {
  const writingInput = document.getElementById('writingInput');
  if (!writingInput) return;
  
  const words = writingInput.value.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const targetWords = 150;
  const progress = Math.min((wordCount / targetWords) * 100, 100);
  
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    progressFill.style.width = progress + '%';
  }
  
  // Update word count display
  updateWordCountDisplay('writingInput', wordCount, targetWords);
}

function updateWordCountDisplay(inputId, currentCount, target) {
  let countDisplay = document.getElementById(`${inputId}WordCount`);
  if (!countDisplay) {
    countDisplay = document.createElement('div');
    countDisplay.id = `${inputId}WordCount`;
    countDisplay.style.cssText = 'margin-top: 10px; font-size: 14px; color: var(--cyber-text-muted);';
    
    const input = document.getElementById(inputId);
    if (input && input.parentNode) {
      input.parentNode.insertBefore(countDisplay, input.nextSibling);
    }
  }
  
  countDisplay.textContent = `Words: ${currentCount}/${target}`;
  
  // Color coding
  if (currentCount < target * 0.8) {
    countDisplay.style.color = 'var(--cyber-error)';
  } else if (currentCount < target) {
    countDisplay.style.color = 'var(--cyber-warning)';
  } else {
    countDisplay.style.color = 'var(--cyber-accent)';
  }
}

// Writing functions connected to backend
async function submitWriting() {
  const content = document.getElementById('writingInput').value;
  if (!content.trim()) {
    showNotification('Please write something before submitting.', 'error');
    return;
  }
  
  const wordCount = content.trim().split(/\s+/).length;
  if (wordCount < 150) {
    showNotification('Your response should be at least 150 words for Task 1.', 'warning');
  }
  
  try {
    showLoading('writingResults');
    
    // Use quick evaluation from your backend
    const data = await quickEvaluateEssay(content, 'task1');
    
    showEvaluationResults('writingResults', data, 'Writing Task 1');
    showNotification('Writing evaluation completed!', 'success');
    
  } catch (error) {
    console.error('Error submitting writing:', error);
    showNotification(`Error: ${error.message}`, 'error');
    hideLoading('writingResults');
  }
}

async function submitWritingTask2() {
  const content = document.getElementById('writingTask2').value;
  if (!content.trim()) {
    showNotification('Please write something before submitting.', 'error');
    return;
  }
  
  const wordCount = content.trim().split(/\s+/).length;
  if (wordCount < 250) {
    showNotification('Your essay should be at least 250 words for Task 2.', 'warning');
  }
  
  try {
    showLoading('writingResults');
    
    // Use your backend's evaluation
    const data = await quickEvaluateEssay(content, 'task2');
    
    showEvaluationResults('writingResults', data, 'Writing Task 2');
    showNotification('Essay evaluation completed!', 'success');
    
    // Clear the draft after successful submission
    localStorage.removeItem('essayDraft2');
    
  } catch (error) {
    console.error('Error submitting writing task 2:', error);
    showNotification(`Error: ${error.message}`, 'error');
    hideLoading('writingResults');
  }
}

// Reading functions (mock for now since backend doesn't have this)
async function loadReading() {
  try {
    document.getElementById('readingPassage').innerHTML = generateSamplePassage();
    showNotification('New passage loaded successfully.', 'success');
  } catch (error) {
    console.error('Error loading passage:', error);
    showNotification('Error loading passage.', 'error');
  }
}

function generateSamplePassage() {
  const passages = [
    {
      title: "The Future of Renewable Energy",
      content: `The transition to renewable energy sources has become one of the most pressing challenges of our time. Solar and wind power technologies have made remarkable advances in efficiency and cost-effectiveness over the past decade. However, the intermittent nature of these energy sources presents significant challenges for grid stability and energy storage.

Recent developments in battery technology, particularly lithium-ion batteries, have begun to address these storage challenges. The cost of battery storage has decreased by approximately 70% since 2015, making large-scale energy storage increasingly viable. This improvement has opened new possibilities for renewable energy integration.

Despite these advances, critics argue that the complete transition to renewable energy may take several decades due to infrastructure limitations and economic considerations. The International Energy Agency estimates that achieving net-zero emissions by 2050 will require unprecedented global cooperation and investment in clean energy technologies.`
    },
    {
      title: "The Impact of Artificial Intelligence on Education",
      content: `Artificial Intelligence is revolutionizing education by personalizing learning experiences and automating administrative tasks. AI-powered systems can adapt to individual learning styles, providing customized content and pacing that optimizes student outcomes.

Machine learning algorithms analyze student performance data to identify learning gaps and recommend targeted interventions. This data-driven approach enables educators to provide more effective support and helps students achieve better academic results.

However, the integration of AI in education also raises concerns about privacy, data security, and the potential replacement of human teachers. Educational institutions must carefully balance the benefits of AI technology with the need to maintain human connection and critical thinking skills in the learning process.`
    }
  ];
  
  const randomPassage = passages[Math.floor(Math.random() * passages.length)];
  
  return `
    <h3>Passage: ${randomPassage.title}</h3>
    ${randomPassage.content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
  `;
}

async function submitReading() {
  const answers = {
    multiple_choice: currentAnswers,
    short_answers: {
      q6: document.getElementById('shortAnswer1')?.value || '',
      q7: document.getElementById('shortAnswer2')?.value || ''
    }
  };
  
  const hasAnswers = Object.keys(answers.multiple_choice).length > 0 || 
                    answers.short_answers.q6 || answers.short_answers.q7;
  
  if (!hasAnswers) {
    showNotification('Please answer at least one question before submitting.', 'error');
    return;
  }
  
  try {
    showLoading('readingResults');
    
    // Use mock evaluation since backend doesn't have reading endpoint yet
    const data = await evaluateReading(answers);
    
    showEvaluationResults('readingResults', data, 'Reading Comprehension');
    showNotification('Reading evaluation completed!', 'success');
    
  } catch (error) {
    console.error('Error submitting reading:', error);
    showNotification(`Error: ${error.message}`, 'error');
    hideLoading('readingResults');
  }
}

// Speaking functions connected to backend
async function submitSpeaking() {
  if (!recordedChunks || recordedChunks.length === 0) {
    showNotification('Please record audio before submitting.', 'error');
    return;
  }
  
  try {
    showLoading('speakingResults');
    
    // For demo purposes, we'll simulate transcription and use your backend
    const simulatedTranscription = "I would like to talk about my hometown, which is a medium-sized city located in the central part of my country. What I like most about living there is the perfect balance between urban conveniences and natural beauty. The city has all the modern facilities you would expect, like shopping centers, restaurants, and good public transportation, but it's also surrounded by beautiful parks and green spaces. Over the years, my hometown has changed quite significantly. There has been a lot of development, with new residential areas being built and the city center being modernized. However, the local government has done a good job of preserving the historical areas and maintaining the city's character.";
    
    const speakingDuration = recordedChunks.length * 2; // Rough estimate
    
    // Use your backend's speaking evaluation
    const data = await evaluateSpeaking(simulatedTranscription, speakingDuration);
    
    showEvaluationResults('speakingResults', data, 'Speaking Assessment');
    showNotification('Speaking evaluation completed!', 'success');
    
  } catch (error) {
    console.error('Error submitting speaking:', error);
    showNotification(`Error: ${error.message}`, 'error');
    hideLoading('speakingResults');
  }
}

// Listening functions (mock for now)
async function loadListening() {
  try {
    // Mock loading audio
    showNotification('Audio loaded successfully (demo mode).', 'success');
  } catch (error) {
    console.error('Error loading listening audio:', error);
    showNotification('Error loading audio.', 'error');
  }
}

async function submitListening() {
  const answers = {
    form_completion: [
      document.getElementById('listening1')?.value || '',
      document.getElementById('listening2')?.value || '',
      document.getElementById('listening3')?.value || '',
      document.getElementById('listening4')?.value || '',
      document.getElementById('listening5')?.value || ''
    ],
    multiple_choice: currentAnswers
  };
  
  const hasAnswers = answers.form_completion.some(ans => ans.trim()) || 
                    Object.keys(answers.multiple_choice).length > 0;
  
  if (!hasAnswers) {
    showNotification('Please provide at least one answer before submitting.', 'error');
    return;
  }
  
  try {
    showLoading('listeningResults');
    
    // Use mock evaluation
    const data = await evaluateListening(answers);
    
    showEvaluationResults('listeningResults', data, 'Listening Assessment');
    showNotification('Listening evaluation completed!', 'success');
    
  } catch (error) {
    console.error('Error submitting listening:', error);
    showNotification(`Error: ${error.message}`, 'error');
    hideLoading('listeningResults');
  }
}

// Practice functions
function startQuickPractice(type) {
  const practiceContent = document.getElementById('practiceContent');
  const practiceExercise = document.getElementById('practiceExercise');
  
  practiceContent.classList.remove('hidden');
  
  switch(type) {
    case 'vocabulary':
      practiceExercise.innerHTML = generateVocabularyExercise();
      break;
    case 'grammar':
      practiceExercise.innerHTML = generateGrammarExercise();
      break;
    case 'pronunciation':
      practiceExercise.innerHTML = generatePronunciationExercise();
      break;
    case 'fluency':
      practiceExercise.innerHTML = generateFluencyExercise();
      break;
  }
}

function generateVocabularyExercise() {
  return `
    <span class="question-type">Vocabulary Builder</span>
    <h3>Word Families</h3>
    <p>Complete the sentences with the correct form of the word in brackets:</p>
    
    <p>1. The _______ (CREATE) of new technologies has revolutionized communication.</p>
    <input type="text" placeholder="Your answer" id="vocab1">
    
    <p>2. She spoke _______ (CONFIDENCE) about her research findings.</p>
    <input type="text" placeholder="Your answer" id="vocab2">
    
    <p>3. The _______ (SUSTAIN) of our environment is crucial for future generations.</p>
    <input type="text" placeholder="Your answer" id="vocab3">
    
    <button onclick="checkVocabularyAnswers()">Check Answers</button>
  `;
}

function generateGrammarExercise() {
  return `
    <span class="question-type">Grammar Focus</span>
    <h3>Conditional Sentences</h3>
    <p>Choose the correct option to complete each sentence:</p>
    
    <div class="multiple-choice">
      <p>1. If I _______ more time, I would learn a new language.</p>
      <label class="choice" onclick="selectChoice(this, 'g1', 'a')">A) have</label>
      <label class="choice" onclick="selectChoice(this, 'g1', 'b')">B) had</label>
      <label class="choice" onclick="selectChoice(this, 'g1', 'c')">C) would have</label>
    </div>
    
    <button onclick="checkGrammarAnswers()">Check Answers</button>
  `;
}

function generatePronunciationExercise() {
  return `
    <span class="question-type">Pronunciation Practice</span>
    <h3>Word Stress Patterns</h3>
    <p>Record yourself saying these words and focus on the stressed syllables:</p>
    
    <div style="background: var(--cyber-bg); padding: 15px; border-radius: 6px; margin: 15px 0;">
      <p><strong>PHO-to-graph</strong> (stress on first syllable)</p>
      <p><strong>pho-TOG-ra-phy</strong> (stress on second syllable)</p>
      <p><strong>pho-to-GRAPH-ic</strong> (stress on third syllable)</p>
    </div>
    
    <button onclick="startPronunciationRecording()">Start Recording</button>
  `;
}

function generateFluencyExercise() {
  return `
    <span class="question-type">Fluency Practice</span>
    <h3>One-Minute Speaking</h3>
    <p>Speak about this topic for one minute without stopping:</p>
    
    <div style="background: var(--cyber-bg); padding: 15px; border-radius: 6px; margin: 15px 0;">
      <p><strong>"Describe your ideal vacation destination and explain why you would like to visit there."</strong></p>
    </div>
    
    <div class="time-remaining" id="fluencyTimer">Preparation Time: 00:30</div>
    <button onclick="startFluencyPractice()">Start Timer</button>
  `;
}

// Answer checking functions
function checkVocabularyAnswers() {
  const answers = {
    vocab1: 'creation',
    vocab2: 'confidently', 
    vocab3: 'sustainability'
  };
  
  let correct = 0;
  Object.entries(answers).forEach(([id, correctAnswer]) => {
    const input = document.getElementById(id);
    const userAnswer = input.value.trim().toLowerCase();
    
    if (userAnswer === correctAnswer.toLowerCase()) {
      input.style.borderColor = 'var(--cyber-accent)';
      correct++;
    } else {
      input.style.borderColor = 'var(--cyber-error)';
    }
  });
  
  showNotification(`You got ${correct} out of 3 correct!`, correct === 3 ? 'success' : 'warning');
}

function checkGrammarAnswers() {
  const correctAnswers = { g1: 'b' };
  let correct = 0;
  
  Object.entries(correctAnswers).forEach(([question, correctAnswer]) => {
    if (currentAnswers[question] === correctAnswer) {
      correct++;
    }
  });
  
  showNotification(`Grammar check: ${correct} out of 1 correct!`, correct === 1 ? 'success' : 'warning');
}

// UI Helper functions
function showEvaluationResults(elId, data, skillType) {
  const box = document.getElementById(elId);
  
  let html = `<h3>${skillType} Evaluation Results</h3>`;
  
  // Handle your backend's response format
  if (data.scores) {
    html += '<div class="score-grid">';
    
    Object.entries(data.scores).forEach(([criterion, score]) => {
      const formattedCriterion = criterion.replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      html += `
        <div class="score-item">
          <span class="criterion">${formattedCriterion}:</span>
          <span class="score">${score}</span>
          <div class="score-bar">
            <div class="score-fill" style="width: ${(score / 9) * 100}%"></div>
          </div>
        </div>
      `;
    });
    html += '</div>';
  }
  
  // Add overall band score with special styling
  if (data.scores && data.scores.overall_band) {
    html += `
      <div class="overall-score">
        <h4>Overall Band Score</h4>
        <div class="big-score">${data.scores.overall_band}</div>
      </div>
    `;
  }
  
  // Add evaluation feedback
  if (data.evaluation) {
    const eval = data.evaluation;
    
    if (eval.strengths && eval.strengths.length > 0) {
      html += `
        <div class="feedback-section strengths">
          <h4>✅ Strengths</h4>
          <ul>
            ${eval.strengths.map(strength => `<li>${strength}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    
    if (eval.weaknesses && eval.weaknesses.length > 0) {
      html += `
        <div class="feedback-section weaknesses">
          <h4>⚠️ Areas for Improvement</h4>
          <ul>
            ${eval.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    
    if (eval.focus_areas && eval.focus_areas.length > 0) {
      html += `
        <div class="feedback-section focus">
          <h4>🎯 Focus Areas</h4>
          <div class="focus-tags">
            ${eval.focus_areas.map(area => `<span class="focus-tag">${area.replace(/_/g, ' ')}</span>`).join('')}
          </div>
        </div>
      `;
    }
  }
  
  // Add improvement course
  if (data.improvement_course) {
    const course = data.improvement_course;
    html += `
      <div class="course-section">
        <h4>📚 ${course.title}</h4>
        <div class="course-info">
          <p><strong>Current Level:</strong> ${course.current_level}</p>
          <p><strong>Target Level:</strong> ${course.target_level}</p>
          <p><strong>Duration:</strong> ${course.estimated_duration}</p>
        </div>
    `;
    
    if (course.weekly_plan && course.weekly_plan.length > 0) {
      html += '<div class="weekly-plan">';
      course.weekly_plan.slice(0, 3).forEach(week => {
        html += `
          <div class="week-card">
            <strong>Week ${week.week}: ${week.focus}</strong>
            ${week.activities ? `<p>${Array.isArray(week.activities) ? week.activities.join(', ') : week.activities}</p>` : ''}
          </div>
        `;
      });
      html += '</div>';
    }
    
    if (course.daily_activities && course.daily_activities.length > 0) {
      html += `
        <div class="daily-activities">
          <h5>Daily Practice:</h5>
          <ul>
            ${course.daily_activities.map(activity => `<li>${activity}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    
    html += '</div>';
  }
  
  box.innerHTML = html;
  box.classList.remove('hidden');
  
  // Scroll to results
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 12px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    max-width: 350px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;
  
  switch(type) {
    case 'success':
      notification.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      break;
    case 'error':
      notification.style.background = 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)';
      break;
    case 'warning':
      notification.style.background = 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)';
      break;
    default:
      notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
}

function showLoading(resultId) {
  const element = document.getElementById(resultId);
  element.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Processing your submission...</p>
      <p class="loading-tip">This may take a few seconds</p>
    </div>
  `;
  element.classList.remove('hidden');
}

function hideLoading(resultId) {
  const element = document.getElementById(resultId);
  element.classList.add('hidden');
}

// Enhanced event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Set up progress tracking for writing inputs
  const writingInput = document.getElementById('writingInput');
  if (writingInput) {
    writingInput.addEventListener('input', updateProgress);
  }
  
  const writingTask2 = document.getElementById('writingTask2');
  if (writingTask2) {
    writingTask2.addEventListener('input', () => {
      const wordCount = writingTask2.value.trim().split(/\s+/).filter(w => w.length > 0).length;
      updateWordCountDisplay('writingTask2', wordCount, 250);
    });
  }
  
  // Initialize first timer
  initializeTimer('writing');
  
  // Check if user is logged in
  if (authToken) {
    showNotification('Welcome back to GetEdu!', 'success');
  } else {
    showNotification('Welcome to GetEdu! Some features require login.', 'info');
  }
});

// Add required CSS for new components
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  .score-grid {
    display: grid;
    gap: 15px;
    margin: 20px 0;
  }
  
  .score-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border-left: 4px solid var(--cyber-accent);
  }
  
  .score-bar {
    width: 100px;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    overflow: hidden;
    margin-left: 10px;
  }
  
  .score-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--cyber-accent), var(--cyber-accent-light));
    transition: width 0.5s ease;
  }
  
  .overall-score {
    text-align: center;
    margin: 30px 0;
    padding: 20px;
    background: linear-gradient(135deg, var(--cyber-accent), var(--cyber-accent-light));
    border-radius: 16px;
    color: white;
  }
  
  .big-score {
    font-size: 3rem;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .feedback-section {
    margin: 20px 0;
    padding: 15px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
  }
  
  .feedback-section.strengths {
    border-left: 4px solid #4facfe;
  }
  
  .feedback-section.weaknesses {
    border-left: 4px solid #ff416c;
  }
  
  .feedback-section.focus {
    border-left: 4px solid #ffa726;
  }
  
  .focus-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }
  
  .focus-tag {
    background: var(--cyber-accent);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    text-transform: capitalize;
  }
  
  .course-section {
    margin: 30px 0;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .course-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    margin: 15px 0;
  }
  
  .weekly-plan {
    display: grid;
    gap: 12px;
    margin: 20px 0;
  }
  
  .week-card {
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border-left: 3px solid var(--cyber-accent);
  }
  
  .daily-activities {
    margin-top: 20px;
  }
  
  .daily-activities ul {
    list-style: none;
    padding: 0;
  }
  
  .daily-activities li {
    padding: 8px 0;
    padding-left: 20px;
    position: relative;
  }
  
  .daily-activities li::before {
    content: "•";
    color: var(--cyber-accent);
    font-weight: bold;
    position: absolute;
    left: 0;
  }
  
  .loading-container {
    text-align: center;
    padding: 40px 20px;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid var(--cyber-accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  
  .loading-tip {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-top: 10px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;

document.head.appendChild(additionalStyles);