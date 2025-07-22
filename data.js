
// Comprehensive dummy data for school admin dashboard

const students = [
  {
    id: 1,
    name: "Aigerim S.",
    group: "IELTS B1 - Morning",
    attendance: 92,
    performance: {
      speaking: 6.5,
      listening: 7,
      reading: 6,
      writing: 5.5,
      vocabulary: 65,
      grammar: 70,
      pronunciation: 80,
      spelling: 60,
    },
    aiFeedback: [
      "Focus on passive voice usage in writing.",
      "Improve clarity in pronunciation of 'th' sounds.",
    ],
    goals: [
      { goal: "Learn 30 new words", progress: 60 },
      { goal: "Improve writing by 1 band", progress: 40 },
    ],
  },
  {
    id: 2,
    name: "Elena K.",
    group: "IELTS C1 - Evening",
    attendance: 98,
    performance: {
      speaking: 8.5,
      listening: 8.0,
      reading: 8.5,
      writing: 8.0,
      vocabulary: 90,
      grammar: 95,
      pronunciation: 88,
      spelling: 85,
    },
    aiFeedback: [
      "Excellent overall performance. Focus on advanced idiomatic expressions.",
      "Consider practicing formal writing structures for academic contexts.",
    ],
    goals: [
      { goal: "Master advanced vocabulary", progress: 85 },
      { goal: "Achieve 8.5 overall band", progress: 90 },
    ],
  },
  {
    id: 3,
    name: "David M.",
    group: "IELTS B2 - Morning",
    attendance: 89,
    performance: {
      speaking: 7.0,
      listening: 8.0,
      reading: 8.5,
      writing: 6.5,
      vocabulary: 75,
      grammar: 80,
      pronunciation: 70,
      spelling: 78,
    },
    aiFeedback: [
      "Strong reading skills. Work on speaking fluency.",
      "Pronunciation needs attention on vowel sounds.",
    ],
    goals: [
      { goal: "Improve speaking confidence", progress: 55 },
      { goal: "Master conditional sentences", progress: 70 },
    ],
  },
  {
    id: 4,
    name: "Sarah L.",
    group: "IELTS C1 - Evening",
    attendance: 95,
    performance: {
      speaking: 8.0,
      listening: 7.5,
      reading: 8.0,
      writing: 7.5,
      vocabulary: 85,
      grammar: 88,
      pronunciation: 82,
      spelling: 80,
    },
    aiFeedback: [
      "Well-rounded performance across all skills.",
      "Focus on listening comprehension in noisy environments.",
    ],
    goals: [
      { goal: "Perfect listening accuracy", progress: 75 },
      { goal: "Expand academic vocabulary", progress: 60 },
    ],
  },
  {
    id: 5,
    name: "Ahmed R.",
    group: "IELTS B1 - Evening",
    attendance: 87,
    performance: {
      speaking: 6.0,
      listening: 6.5,
      reading: 5.5,
      writing: 5.0,
      vocabulary: 58,
      grammar: 62,
      pronunciation: 65,
      spelling: 55,
    },
    aiFeedback: [
      "Needs consistent practice in writing structure.",
      "Reading comprehension improving steadily.",
    ],
    goals: [
      { goal: "Write 250-word essays confidently", progress: 35 },
      { goal: "Learn 50 academic words", progress: 45 },
    ],
  },
  {
    id: 6,
    name: "Maria G.",
    group: "IELTS B2 - Evening",
    attendance: 94,
    performance: {
      speaking: 7.5,
      listening: 7.0,
      reading: 7.0,
      writing: 6.5,
      vocabulary: 82,
      grammar: 78,
      pronunciation: 85,
      spelling: 75,
    },
    aiFeedback: [
      "Excellent pronunciation skills. Maintain consistency.",
      "Grammar accuracy needs fine-tuning in complex sentences.",
    ],
    goals: [
      { goal: "Master prepositions usage", progress: 65 },
      { goal: "Achieve 7.5 overall band", progress: 70 },
    ],
  },
  {
    id: 7,
    name: "James T.",
    group: "IELTS A2 - Morning",
    attendance: 91,
    performance: {
      speaking: 5.0,
      listening: 5.5,
      reading: 5.0,
      writing: 4.5,
      vocabulary: 45,
      grammar: 50,
      pronunciation: 55,
      spelling: 48,
    },
    aiFeedback: [
      "Building strong foundation. Continue regular practice.",
      "Focus on basic sentence structures in writing.",
    ],
    goals: [
      { goal: "Complete basic grammar course", progress: 40 },
      { goal: "Learn 100 common words", progress: 60 },
    ],
  },
  {
    id: 8,
    name: "Fatima H.",
    group: "IELTS B2 - Morning",
    attendance: 96,
    performance: {
      speaking: 7.0,
      listening: 7.5,
      reading: 7.0,
      writing: 6.0,
      vocabulary: 78,
      grammar: 75,
      pronunciation: 72,
      spelling: 70,
    },
    aiFeedback: [
      "Listening skills are excellent. Keep practicing.",
      "Writing coherence needs improvement.",
    ],
    goals: [
      { goal: "Improve essay coherence", progress: 50 },
      { goal: "Practice speaking for 30 min daily", progress: 80 },
    ],
  },
];

const teachers = [
  {
    id: 1,
    name: "Ms. Johnson",
    avatar: "👩‍🏫",
    classes: ["IELTS B2 - Morning", "IELTS C1 - Evening"],
    studentsCount: 15,
    lessonsThisMonth: 68,
    avgStudentImprovement: 7.8,
    satisfactionRate: 95,
    aiSuggestions: [
      "Continue using interactive speaking activities - very effective",
      "Consider more visual aids for vocabulary teaching",
      "Students respond well to your feedback style"
    ]
  },
  {
    id: 2,
    name: "Mr. Thompson",
    avatar: "👨‍🏫",
    classes: ["IELTS B1 - Morning", "IELTS B1 - Evening"],
    studentsCount: 18,
    lessonsThisMonth: 72,
    avgStudentImprovement: 7.5,
    satisfactionRate: 92,
    aiSuggestions: [
      "Try more speaking activities for Group B",
      "Grammar drills showing good results",
      "Increase writing practice time by 10 minutes"
    ]
  },
  {
    id: 3,
    name: "Dr. Williams",
    avatar: "👨‍🏫",
    classes: ["IELTS C1 - Evening", "IELTS C2 - Weekend"],
    studentsCount: 12,
    lessonsThisMonth: 48,
    avgStudentImprovement: 8.2,
    satisfactionRate: 98,
    aiSuggestions: [
      "Advanced students benefit from your academic approach",
      "Consider peer review sessions for writing",
      "Excellent progress in critical thinking skills"
    ]
  },
  {
    id: 4,
    name: "Ms. Garcia",
    avatar: "👩‍🏫",
    classes: ["IELTS A2 - Morning", "IELTS B1 - Evening"],
    studentsCount: 22,
    lessonsThisMonth: 88,
    avgStudentImprovement: 7.1,
    satisfactionRate: 89,
    aiSuggestions: [
      "Beginner students need more encouragement",
      "Vocabulary games are very popular",
      "Consider smaller group activities"
    ]
  }
];

const classes = [
  {
    id: 1,
    name: "IELTS B1 - Morning",
    teacher: "Mr. Thompson",
    schedule: "Mon/Wed/Fri 09:00-11:00",
    studentsCount: 12,
    avgAttendance: 91,
    skillsAverage: {
      speaking: 6.2,
      listening: 6.8,
      reading: 6.1,
      writing: 5.8
    },
    performanceHeatmap: {
      week1: "high",
      week2: "medium",
      week3: "high",
      week4: "medium"
    }
  },
  {
    id: 2,
    name: "IELTS B2 - Morning",
    teacher: "Ms. Johnson",
    schedule: "Tue/Thu/Sat 09:00-11:30",
    studentsCount: 8,
    avgAttendance: 94,
    skillsAverage: {
      speaking: 7.2,
      listening: 7.5,
      reading: 7.8,
      writing: 6.8
    },
    performanceHeatmap: {
      week1: "high",
      week2: "high",
      week3: "medium",
      week4: "high"
    }
  },
  {
    id: 3,
    name: "IELTS C1 - Evening",
    teacher: "Dr. Williams",
    schedule: "Mon/Wed 18:00-20:30",
    studentsCount: 6,
    avgAttendance: 97,
    skillsAverage: {
      speaking: 8.1,
      listening: 7.8,
      reading: 8.3,
      writing: 7.8
    },
    performanceHeatmap: {
      week1: "high",
      week2: "high",
      week3: "high",
      week4: "high"
    }
  },
  {
    id: 4,
    name: "IELTS B1 - Evening",
    teacher: "Ms. Garcia",
    schedule: "Tue/Thu 18:00-20:00",
    studentsCount: 14,
    avgAttendance: 88,
    skillsAverage: {
      speaking: 5.9,
      listening: 6.3,
      reading: 5.7,
      writing: 5.4
    },
    performanceHeatmap: {
      week1: "medium",
      week2: "low",
      week3: "medium",
      week4: "medium"
    }
  }
];

const aiInsights = {
  urgent: [
    {
      status: "Action Needed",
      message: "Group C needs immediate grammar intervention",
      impact: "5 students scoring below 5.0"
    },
    {
      status: "Action Needed",
      message: "5 students at risk of failing this month",
      impact: "Below 60% attendance threshold"
    },
    {
      status: "Action Needed",
      message: "Writing scores declining in B2 classes",
      impact: "15% decrease in last 2 weeks"
    }
  ],
  warnings: [
    {
      status: "Monitor",
      message: "Writing scores declining in B2 evening class",
      impact: "Average dropped to 6.1 from 6.8"
    },
    {
      status: "Monitor",
      message: "Attendance dropping in morning sessions",
      impact: "3% decrease this week"
    },
    {
      status: "Monitor",
      message: "Vocabulary retention below average in A2 group",
      impact: "40% lower than target"
    }
  ],
  success: [
    {
      status: "Excellent",
      message: "Teacher A's students excelling in pronunciation",
      impact: "95% improvement rate"
    },
    {
      status: "Excellent",
      message: "C1 classes showing consistent improvement",
      impact: "0.5 band increase monthly"
    },
    {
      status: "Excellent",
      message: "Speaking confidence increased across all levels",
      impact: "Student satisfaction up 20%"
    }
  ]
};

const recommendations = [
  {
    icon: "📚",
    title: "Implement Vocabulary Drills",
    description: "Group C shows 40% lower vocabulary retention. Suggest daily 10-minute vocab quizzes.",
    impact: "Expected improvement: +15%"
  },
  {
    icon: "🗣️",
    title: "Increase Speaking Practice",
    description: "B1 students need more conversational practice. Add 20 minutes per session.",
    impact: "Expected improvement: +0.5 band"
  },
  {
    icon: "✍️",
    title: "Writing Workshop Sessions",
    description: "Implement weekly writing workshops focusing on Task 2 essay structure.",
    impact: "Expected improvement: +1.0 band in writing"
  },
  {
    icon: "🎯",
    title: "Personalized Learning Paths",
    description: "Create individual study plans based on skill gaps analysis.",
    impact: "Expected improvement: +25% overall"
  }
];

// Performance data for charts
const performanceData = {
  labels: ['Speaking', 'Listening', 'Reading', 'Writing'],
  datasets: [{
    label: 'School Average',
    data: [6.8, 7.1, 6.9, 6.2],
    backgroundColor: [
      'rgba(79, 70, 229, 0.8)',
      'rgba(0, 179, 176, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)'
    ],
    borderWidth: 2,
    borderColor: '#fff'
  }]
};

const attendanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Attendance Rate (%)',
    data: [88, 92, 89, 94, 91, 89.5],
    borderColor: '#4F46E5',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    tension: 0.4,
    fill: true
  }]
};

const parents = [
  {
    id: 1,
    name: "John Smith",
    children: ["Aigerim S."],
    phone: "+1234567890",
    lastMessage: "Thank you for the update on Aigerim's progress",
    lastMessageTime: "2 hours ago",
    unreadCount: 0,
    totalMessages: 45,
    responseRate: "95%"
  },
  {
    id: 2,
    name: "Maria Gonzalez", 
    children: ["Elena K."],
    phone: "+1234567891",
    lastMessage: "When is the next parent meeting?",
    lastMessageTime: "1 day ago",
    unreadCount: 2,
    totalMessages: 32,
    responseRate: "88%"
  },
  {
    id: 3,
    name: "David Miller",
    children: ["David M."],
    phone: "+1234567892", 
    lastMessage: "David is doing much better with pronunciation",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
    totalMessages: 28,
    responseRate: "92%"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    children: ["Sarah L."],
    phone: "+1234567893",
    lastMessage: "Could you send me Sarah's homework schedule?",
    lastMessageTime: "5 hours ago", 
    unreadCount: 1,
    totalMessages: 51,
    responseRate: "97%"
  }
];

const whatsappChats = [
  {
    id: 1,
    parentName: "Maria Gonzalez",
    lastMessage: "When is the next parent meeting?",
    time: "1 day ago",
    unread: 2,
    avatar: "MG"
  },
  {
    id: 2,
    parentName: "Sarah Johnson", 
    lastMessage: "Could you send me Sarah's homework schedule?",
    time: "5 hours ago",
    unread: 1,
    avatar: "SJ"
  },
  {
    id: 3,
    parentName: "John Smith",
    lastMessage: "Thank you for the update on Aigerim's progress",
    time: "2 hours ago",
    unread: 0,
    avatar: "JS"
  },
  {
    id: 4,
    parentName: "David Miller",
    lastMessage: "David is doing much better with pronunciation", 
    time: "3 days ago",
    unread: 0,
    avatar: "DM"
  }
];

// Teacher attributes data
const teacherAttributes = {
  1: { // Ms. Johnson
    generalEnglish: {
      vocabulary: 9.0,
      grammar: 8.5,
      pronunciation: 9.5,
      conversation: 9.0,
      writing: 8.0
    },
    ieltsSkills: {
      listening: 8.5,
      reading: 9.0,
      writing: 8.0,
      speaking: 9.5
    }
  },
  2: { // Mr. Thompson
    generalEnglish: {
      vocabulary: 8.5,
      grammar: 9.0,
      pronunciation: 7.5,
      conversation: 8.0,
      writing: 8.5
    },
    ieltsSkills: {
      listening: 8.0,
      reading: 8.5,
      writing: 9.0,
      speaking: 7.5
    }
  },
  3: { // Dr. Williams
    generalEnglish: {
      vocabulary: 9.5,
      grammar: 9.5,
      pronunciation: 8.0,
      conversation: 8.5,
      writing: 9.5
    },
    ieltsSkills: {
      listening: 9.0,
      reading: 9.5,
      writing: 9.5,
      speaking: 8.5
    }
  },
  4: { // Ms. Garcia
    generalEnglish: {
      vocabulary: 8.0,
      grammar: 8.5,
      pronunciation: 9.0,
      conversation: 9.5,
      writing: 7.5
    },
    ieltsSkills: {
      listening: 7.5,
      reading: 8.0,
      writing: 7.0,
      speaking: 9.0
    }
  }
};

// Enhanced calendar data for teachers with detailed lesson info
const enhancedTeacherCalendar = {
  1: { // Ms. Johnson
    "2024-01-01": { 
      lessonStatus: "completed", 
      group: "IELTS C1 - Evening", 
      topic: "Advanced Speaking Techniques", 
      duration: "2 hours", 
      time: "18:00-20:00",
      studentsPresent: 6, 
      totalStudents: 6 
    },
    "2024-01-03": { 
      lessonStatus: "completed", 
      group: "IELTS B2 - Morning", 
      topic: "Writing Task 2 - Opinion Essays", 
      duration: "2.5 hours", 
      time: "09:00-11:30",
      studentsPresent: 7, 
      totalStudents: 8 
    },
    "2024-01-05": { 
      lessonStatus: "missed", 
      group: "IELTS C1 - Evening", 
      reason: "Teacher illness" 
    },
    "2024-01-08": { 
      lessonStatus: "completed", 
      group: "IELTS B2 - Morning", 
      topic: "Reading Comprehension Strategies", 
      duration: "2.5 hours", 
      time: "09:00-11:30",
      studentsPresent: 8, 
      totalStudents: 8 
    },
    "2024-01-10": { 
      lessonStatus: "completed", 
      group: "IELTS C1 - Evening", 
      topic: "Mock Speaking Test", 
      duration: "2 hours", 
      time: "18:00-20:00",
      studentsPresent: 5, 
      totalStudents: 6 
    },
    "2024-01-12": { 
      lessonStatus: "completed", 
      group: "IELTS B2 - Morning", 
      topic: "Listening for Details", 
      duration: "2.5 hours", 
      time: "09:00-11:30",
      studentsPresent: 8, 
      totalStudents: 8 
    },
    "2024-01-15": { 
      lessonStatus: "completed", 
      group: "IELTS C1 - Evening", 
      topic: "Academic Vocabulary Building", 
      duration: "2 hours", 
      time: "18:00-20:00",
      studentsPresent: 6, 
      totalStudents: 6 
    },
    "2024-01-17": { 
      lessonStatus: "completed", 
      group: "IELTS B2 - Morning", 
      topic: "Writing Task 1 - Data Description", 
      duration: "2.5 hours", 
      time: "09:00-11:30",
      studentsPresent: 7, 
      totalStudents: 8 
    },
    "2024-01-19": { 
      group: "IELTS C1 - Evening", 
      topic: "Advanced Grammar Review", 
      duration: "2 hours", 
      time: "18:00-20:00" 
    },
    "2024-01-22": { 
      group: "IELTS B2 - Morning", 
      topic: "Speaking Practice - Part 3", 
      duration: "2.5 hours", 
      time: "09:00-11:30" 
    },
    "2024-01-24": { 
      group: "IELTS C1 - Evening", 
      topic: "Reading Speed Improvement", 
      duration: "2 hours", 
      time: "18:00-20:00" 
    },
    "2024-01-26": { 
      group: "IELTS B2 - Morning", 
      topic: "Pronunciation Workshop", 
      duration: "2.5 hours", 
      time: "09:00-11:30" 
    },
    "2024-01-29": { 
      group: "IELTS C1 - Evening", 
      topic: "Mock Test Review", 
      duration: "2 hours", 
      time: "18:00-20:00" 
    },
    "2024-01-31": { 
      group: "IELTS B2 - Morning", 
      topic: "Final Assessment Preparation", 
      duration: "2.5 hours", 
      time: "09:00-11:30" 
    }
  },
  2: { // Mr. Thompson
    "2024-01-02": { 
      lessonStatus: "completed", 
      group: "IELTS B1 - Morning", 
      topic: "Basic Grammar Structures", 
      duration: "2 hours", 
      time: "09:00-11:00",
      studentsPresent: 11, 
      totalStudents: 12 
    },
    "2024-01-04": { 
      lessonStatus: "completed", 
      group: "IELTS B1 - Evening", 
      topic: "Vocabulary Building - Daily Life", 
      duration: "2 hours", 
      time: "18:00-20:00",
      studentsPresent: 13, 
      totalStudents: 14 
    },
    "2024-01-06": { 
      lessonStatus: "missed", 
      group: "IELTS B1 - Morning", 
      reason: "Public holiday" 
    },
    "2024-01-09": { 
      lessonStatus: "completed", 
      group: "IELTS B1 - Morning", 
      topic: "Simple Writing Structures", 
      duration: "2 hours", 
      time: "09:00-11:00",
      studentsPresent: 12, 
      totalStudents: 12 
    },
    "2024-01-11": { 
      lessonStatus: "completed", 
      group: "IELTS B1 - Evening", 
      topic: "Basic Speaking Practice", 
      duration: "2 hours", 
      time: "18:00-20:00",
      studentsPresent: 14, 
      totalStudents: 14 
    },
    "2024-01-13": { 
      lessonStatus: "completed", 
      group: "IELTS B1 - Morning", 
      topic: "Listening for Main Ideas", 
      duration: "2 hours", 
      time: "09:00-11:00",
      studentsPresent: 11, 
      totalStudents: 12 
    },
    "2024-01-16": { 
      lessonStatus: "completed", 
      group: "IELTS B1 - Morning", 
      topic: "Reading Comprehension Basics", 
      duration: "2 hours", 
      time: "09:00-11:00",
      studentsPresent: 12, 
      totalStudents: 12 
    },
    "2024-01-18": { 
      lessonStatus: "completed", 
      group: "IELTS B1 - Evening", 
      topic: "Sentence Construction", 
      duration: "2 hours", 
      time: "18:00-20:00",
      studentsPresent: 13, 
      totalStudents: 14 
    },
    "2024-01-20": { 
      group: "IELTS B1 - Morning", 
      topic: "Present and Past Tenses", 
      duration: "2 hours", 
      time: "09:00-11:00" 
    },
    "2024-01-23": { 
      group: "IELTS B1 - Morning", 
      topic: "Vocabulary Review", 
      duration: "2 hours", 
      time: "09:00-11:00" 
    },
    "2024-01-25": { 
      group: "IELTS B1 - Evening", 
      topic: "Basic Writing Practice", 
      duration: "2 hours", 
      time: "18:00-20:00" 
    },
    "2024-01-27": { 
      group: "IELTS B1 - Morning", 
      topic: "Speaking Confidence Building", 
      duration: "2 hours", 
      time: "09:00-11:00" 
    },
    "2024-01-30": { 
      group: "IELTS B1 - Morning", 
      topic: "Monthly Progress Test", 
      duration: "2 hours", 
      time: "09:00-11:00" 
    }
  },
  3: { // Dr. Williams
    "2024-01-01": { 
      lessonStatus: "completed", 
      group: "IELTS C1 - Evening", 
      topic: "Advanced Academic Writing", 
      duration: "2.5 hours", 
      time: "18:00-20:30",
      studentsPresent: 6, 
      totalStudents: 6 
    },
    "2024-01-03": { 
      lessonStatus: "completed", 
      group: "IELTS C2 - Weekend", 
      topic: "Critical Analysis Techniques", 
      duration: "3 hours", 
      time: "10:00-13:00",
      studentsPresent: 4, 
      totalStudents: 4 
    },
    "2024-01-08": { 
      lessonStatus: "completed", 
      group: "IELTS C1 - Evening", 
      topic: "Research Methodology", 
      duration: "2.5 hours", 
      time: "18:00-20:30",
      studentsPresent: 6, 
      totalStudents: 6 
    },
    "2024-01-10": { 
      lessonStatus: "completed", 
      group: "IELTS C2 - Weekend", 
      topic: "Advanced Reading Strategies", 
      duration: "3 hours", 
      time: "10:00-13:00",
      studentsPresent: 4, 
      totalStudents: 4 
    },
    "2024-01-15": { 
      lessonStatus: "completed", 
      group: "IELTS C1 - Evening", 
      topic: "Thesis Statement Development", 
      duration: "2.5 hours", 
      time: "18:00-20:30",
      studentsPresent: 5, 
      totalStudents: 6 
    },
    "2024-01-17": { 
      lessonStatus: "completed", 
      group: "IELTS C2 - Weekend", 
      topic: "Advanced Vocabulary Usage", 
      duration: "3 hours", 
      time: "10:00-13:00",
      studentsPresent: 4, 
      totalStudents: 4 
    },
    "2024-01-22": { 
      group: "IELTS C1 - Evening", 
      topic: "Academic Debate Techniques", 
      duration: "2.5 hours", 
      time: "18:00-20:30" 
    },
    "2024-01-24": { 
      group: "IELTS C2 - Weekend", 
      topic: "Advanced Grammar Mastery", 
      duration: "3 hours", 
      time: "10:00-13:00" 
    },
    "2024-01-29": { 
      group: "IELTS C1 - Evening", 
      topic: "Mock Exam Preparation", 
      duration: "2.5 hours", 
      time: "18:00-20:30" 
    },
    "2024-01-31": { 
      group: "IELTS C2 - Weekend", 
      topic: "Final Assessment Review", 
      duration: "3 hours", 
      time: "10:00-13:00" 
    }
  },
  4: { // Ms. Garcia
    "2024-01-02": { 
      lessonStatus: "completed", 
      group: "IELTS A2 - Morning", 
      topic: "Alphabet and Basic Sounds", 
      duration: "1.5 hours", 
      time: "09:00-10:30",
      studentsPresent: 10, 
      totalStudents: 12 
    },
    "2024-01-04": { 
      lessonStatus: "completed", 
      group: "IELTS B1 - Evening", 
      topic: "Simple Conversations", 
      duration: "2 hours", 
      time: "18:00-20:00",
      studentsPresent: 9, 
      totalStudents: 10 
    },
    "2024-01-06": { 
      lessonStatus: "missed", 
      group: "IELTS A2 - Morning", 
      reason: "Low attendance" 
    },
    "2024-01-09": { 
      lessonStatus: "completed", 
      group: "IELTS A2 - Morning", 
      topic: "Basic Vocabulary Games", 
      duration: "1.5 hours", 
      time: "09:00-10:30",
      studentsPresent: 12, 
      totalStudents: 12 
    },
    "2024-01-11": { 
      lessonStatus: "completed", 
      group: "IELTS B1 - Evening", 
      topic: "Grammar Fundamentals", 
      duration: "2 hours", 
      time: "18:00-20:00",
      studentsPresent: 10, 
      totalStudents: 10 
    },
    "2024-01-13": { 
      lessonStatus: "completed", 
      group: "IELTS A2 - Morning", 
      topic: "Numbers and Colors", 
      duration: "1.5 hours", 
      time: "09:00-10:30",
      studentsPresent: 11, 
      totalStudents: 12 
    },
    "2024-01-16": { 
      lessonStatus: "completed", 
      group: "IELTS A2 - Morning", 
      topic: "Family and Friends", 
      duration: "1.5 hours", 
      time: "09:00-10:30",
      studentsPresent: 12, 
      totalStudents: 12 
    },
    "2024-01-18": { 
      lessonStatus: "completed", 
      group: "IELTS B1 - Evening", 
      topic: "Basic Writing Skills", 
      duration: "2 hours", 
      time: "18:00-20:00",
      studentsPresent: 9, 
      totalStudents: 10 
    },
    "2024-01-20": { 
      group: "IELTS A2 - Morning", 
      topic: "Food and Drinks", 
      duration: "1.5 hours", 
      time: "09:00-10:30" 
    },
    "2024-01-23": { 
      group: "IELTS A2 - Morning", 
      topic: "Daily Routines", 
      duration: "1.5 hours", 
      time: "09:00-10:30" 
    },
    "2024-01-25": { 
      group: "IELTS B1 - Evening", 
      topic: "Question Formation", 
      duration: "2 hours", 
      time: "18:00-20:00" 
    },
    "2024-01-27": { 
      group: "IELTS A2 - Morning", 
      topic: "Places and Directions", 
      duration: "1.5 hours", 
      time: "09:00-10:30" 
    },
    "2024-01-30": { 
      group: "IELTS A2 - Morning", 
      topic: "Monthly Review Game", 
      duration: "1.5 hours", 
      time: "09:00-10:30" 
    }
  }
};

// Calendar data for teachers (keeping for backward compatibility)
const teacherCalendar = {
  1: { // Ms. Johnson
    "2024-01-15": { hasLesson: true, student: "Elena K.", lesson: "IELTS C1 - Speaking Practice" },
    "2024-01-16": { hasLesson: true, student: "David M.", lesson: "IELTS B2 - Writing Workshop" },
    "2024-01-17": { hasLesson: false },
    "2024-01-18": { hasLesson: true, student: "Sarah L.", lesson: "IELTS C1 - Grammar Review" },
    "2024-01-19": { hasLesson: true, student: "Elena K.", lesson: "IELTS C1 - Mock Test" }
  },
  2: { // Mr. Thompson
    "2024-01-15": { hasLesson: true, student: "Aigerim S.", lesson: "IELTS B1 - Vocabulary" },
    "2024-01-16": { hasLesson: false },
    "2024-01-17": { hasLesson: true, student: "Ahmed R.", lesson: "IELTS B1 - Writing Structure" },
    "2024-01-18": { hasLesson: true, student: "Maria G.", lesson: "IELTS B2 - Listening Practice" },
    "2024-01-19": { hasLesson: true, student: "Aigerim S.", lesson: "IELTS B1 - Speaking" }
  }
};

// Export data for use in main.js
window.dashboardData = {
  students,
  teachers,
  classes,
  aiInsights,
  recommendations,
  performanceData,
  attendanceData,
  parents,
  whatsappChats,
  teacherCalendar,
  teacherAttributes,
  enhancedTeacherCalendar
};
