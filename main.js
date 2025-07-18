
// Global variables
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
      return;
    }
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `Time Remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

// Multiple choice selection
function selectChoice(element, questionName, value) {
  // Remove selection from other choices in the same group
  const group = element.closest('.multiple-choice') || element.parentElement;
  group.querySelectorAll('.choice').forEach(choice => choice.classList.remove('selected'));
  
  // Select current choice
  element.classList.add('selected');
  currentAnswers[questionName] = value;
}

// Progress tracking for writing
function updateProgress() {
  const writingInput = document.getElementById('writingInput');
  const words = writingInput.value.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const targetWords = 150;
  const progress = Math.min((wordCount / targetWords) * 100, 100);
  
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    progressFill.style.width = progress + '%';
  }
}

// Event listeners for progress tracking
document.addEventListener('DOMContentLoaded', () => {
  const writingInput = document.getElementById('writingInput');
  if (writingInput) {
    writingInput.addEventListener('input', updateProgress);
  }
});

// Writing functions
async function submitWriting() {
  const content = document.getElementById('writingInput').value;
  if (!content.trim()) {
    showNotification('Please write something before submitting.', 'error');
    return;
  }
  
  if (content.trim().split(/\s+/).length < 150) {
    showNotification('Your response should be at least 150 words.', 'warning');
  }
  
  try {
    showLoading('writingResults');
    const data = await api.post('/api/evaluate/writing', { 
      content,
      task_type: 'task1',
      test_type: 'ielts'
    });
    showEvaluationResults('writingResults', data, 'Writing Task 1');
  } catch (error) {
    console.error('Error submitting writing:', error);
    showNotification('Error submitting writing. Please try again.', 'error');
    hideLoading('writingResults');
  }
}

async function submitWritingTask2() {
  const content = document.getElementById('writingTask2').value;
  if (!content.trim()) {
    showNotification('Please write something before submitting.', 'error');
    return;
  }
  
  if (content.trim().split(/\s+/).length < 250) {
    showNotification('Your essay should be at least 250 words.', 'warning');
  }
  
  try {
    showLoading('writingResults');
    const data = await api.post('/api/evaluate/writing', { 
      content,
      task_type: 'task2',
      test_type: 'ielts'
    });
    showEvaluationResults('writingResults', data, 'Writing Task 2');
  } catch (error) {
    console.error('Error submitting writing task 2:', error);
    showNotification('Error submitting essay. Please try again.', 'error');
    hideLoading('writingResults');
  }
}

// Reading functions
async function loadReading() {
  try {
    const passage = await api.get('/api/tasks/reading');
    document.getElementById('readingPassage').innerHTML = passage.text || generateSamplePassage();
    showNotification('New passage loaded successfully.', 'success');
  } catch (error) {
    console.error('Error loading passage:', error);
    document.getElementById('readingPassage').innerHTML = generateSamplePassage();
    showNotification('Using sample passage. Please check your connection.', 'warning');
  }
}

function generateSamplePassage() {
  return `
    <h3>Passage: The Evolution of Artificial Intelligence</h3>
    <p>Artificial Intelligence (AI) has undergone remarkable transformations since its conceptual inception in the mid-20th century. What began as theoretical discussions among computer scientists has evolved into practical applications that permeate nearly every aspect of modern life.</p>
    
    <p>The journey of AI development can be traced through several distinct phases. The initial phase, often called "symbolic AI," focused on rule-based systems that could manipulate symbols according to logical rules. This approach dominated AI research from the 1950s through the 1980s, producing expert systems that could solve specific problems within narrow domains.</p>
    
    <p>However, these early systems had significant limitations. They required extensive manual programming of rules and struggled with uncertainty and incomplete information. The inability to learn from experience meant that these systems remained static unless manually updated by programmers.</p>
    
    <p>The resurgence of neural networks in the 1980s and 1990s marked a paradigm shift. Machine learning algorithms enabled computers to identify patterns in data and improve their performance through experience. This approach proved particularly effective for tasks such as image recognition and natural language processing.</p>
  `;
}

async function submitReading() {
  // Collect all answers
  const answers = {
    multiple_choice: currentAnswers,
    short_answers: {
      q6: document.getElementById('shortAnswer1').value,
      q7: document.getElementById('shortAnswer2').value
    }
  };
  
  if (Object.keys(answers.multiple_choice).length === 0 && 
      !answers.short_answers.q6 && !answers.short_answers.q7) {
    showNotification('Please answer at least one question before submitting.', 'error');
    return;
  }
  
  try {
    showLoading('readingResults');
    const data = await api.post('/api/evaluate/reading', { 
      answers,
      test_type: 'ielts'
    });
    showEvaluationResults('readingResults', data, 'Reading Comprehension');
  } catch (error) {
    console.error('Error submitting reading:', error);
    showNotification('Error submitting reading. Please try again.', 'error');
    hideLoading('readingResults');
  }
}

// Speaking functions
async function submitSpeaking() {
  if (!recordedChunks || recordedChunks.length === 0) {
    showNotification('Please record audio before submitting.', 'error');
    return;
  }
  
  try {
    showLoading('speakingResults');
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const data = await api.upload('/api/evaluate/speaking', 'file', blob, 'speech.webm');
    showEvaluationResults('speakingResults', data, 'Speaking Assessment');
  } catch (error) {
    console.error('Error submitting speaking:', error);
    showNotification('Error submitting speaking. Please try again.', 'error');
    hideLoading('speakingResults');
  }
}

// Listening functions
async function loadListening() {
  try {
    const audio = await api.getBinary('/api/tasks/listening');
    const url = URL.createObjectURL(audio);
    document.getElementById('listeningAudio').src = url;
    showNotification('Audio loaded successfully.', 'success');
  } catch (error) {
    console.error('Error loading listening audio:', error);
    showNotification('Error loading audio. Using sample audio.', 'warning');
  }
}

async function submitListening() {
  const answers = {
    form_completion: [
      document.getElementById('listening1').value,
      document.getElementById('listening2').value,
      document.getElementById('listening3').value,
      document.getElementById('listening4').value,
      document.getElementById('listening5').value
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
    const data = await api.post('/api/evaluate/listening', { 
      answers,
      test_type: 'ielts'
    });
    showEvaluationResults('listeningResults', data, 'Listening Assessment');
  } catch (error) {
    console.error('Error submitting listening:', error);
    showNotification('Error submitting listening. Please try again.', 'error');
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
    <input type="text" placeholder="Your answer">
    
    <p>2. She spoke _______ (CONFIDENCE) about her research findings.</p>
    <input type="text" placeholder="Your answer">
    
    <p>3. The _______ (SUSTAIN) of our environment is crucial for future generations.</p>
    <input type="text" placeholder="Your answer">
    
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

// UI Helper functions
function showEvaluationResults(elId, data, skillType) {
  const box = document.getElementById(elId);
  
  let html = `<h3>${skillType} Evaluation Results</h3>`;
  
  // Check if we have structured scoring data
  if (data.scores || data.raw_scores) {
    const scores = data.scores || data.raw_scores;
    html += '<div class="score-grid">';
    
    Object.entries(scores).forEach(([criterion, score]) => {
      const formattedCriterion = criterion.replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      html += `
        <div class="score-item">
          <span class="criterion">${formattedCriterion}:</span>
          <span class="score">${score}</span>
        </div>
      `;
    });
    html += '</div>';
  }
  
  // Add overall band score if available
  if (data.band_score || data.overall_score) {
    html += `
      <div class="score-item" style="background: var(--cyber-accent); color: var(--cyber-bg); margin: 20px 0;">
        <span class="criterion">Overall Band Score:</span>
        <span class="score" style="background: var(--cyber-bg); color: var(--cyber-accent);">${data.band_score || data.overall_score}</span>
      </div>
    `;
  }
  
  // Add feedback sections
  if (data.strengths || data.summary_of_strengths) {
    html += `
      <div class="feedback-section">
        <h4>Summary of strengths:</h4>
        <p>${data.strengths || data.summary_of_strengths}</p>
      </div>
    `;
  }
  
  if (data.weaknesses || data.list_of_weaknesses) {
    html += `
      <div class="feedback-section">
        <h4>Areas for improvement:</h4>
        <p>${data.weaknesses || data.list_of_weaknesses}</p>
      </div>
    `;
  }
  
  // Add recommendations if available
  if (data.recommendations) {
    html += `
      <div class="feedback-section">
        <h4>Recommendations:</h4>
        <p>${data.recommendations}</p>
      </div>
    `;
  }
  
  // Fallback to JSON if no structured data
  if (!data.scores && !data.raw_scores && !data.strengths && !data.weaknesses) {
    html += `<pre class="json-fallback">${JSON.stringify(data, null, 2)}</pre>`;
  }
  
  box.innerHTML = html;
  box.classList.remove('hidden');
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
    border-radius: 6px;
    color: white;
    font-weight: bold;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
  
  switch(type) {
    case 'success':
      notification.style.background = 'var(--cyber-accent)';
      break;
    case 'error':
      notification.style.background = 'var(--cyber-error)';
      break;
    case 'warning':
      notification.style.background = 'var(--cyber-warning)';
      break;
    default:
      notification.style.background = 'var(--cyber-border)';
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

function showLoading(resultId) {
  const element = document.getElementById(resultId);
  element.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div style="border: 2px solid var(--cyber-border); border-top: 2px solid var(--cyber-accent); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div>
      <p>Processing your submission...</p>
    </div>
  `;
  element.classList.remove('hidden');
}

function hideLoading(resultId) {
  const element = document.getElementById(resultId);
  element.classList.add('hidden');
}

// Add CSS animation for spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);
