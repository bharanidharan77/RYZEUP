/**
 * Data Types and Constants for PaperGen AI
 */

export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  AVERAGE: 'Average',
  HARD: 'Hard'
};

export const QUESTION_ORIENTATIONS = [
  { id: 'Theory', label: 'Theory', description: 'Concepts, definitions & explanations' },
  { id: 'Analytical', label: 'Analytical', description: 'Reasoning, derivation & comparisons' },
  { id: 'Practical', label: 'Practical', description: 'Problem solving & calculations' },
  { id: 'Application', label: 'Application', description: 'Real-world scenarios & case studies' }
];

export const DEFAULT_EXAM_HEADER = {
  collegeName: 'MANAKULA VINAYAGAR INSTITUTE OF TECHNOLOGY',
  department: 'Department of Computer Science & Engineering',
  examName: 'Internal Assessment Examination - I',
  subjectName: 'Data Structures & Algorithms',
  subjectCode: '22CS301',
  duration: '3 Hours',
  academicYear: '2025-2026',
  regulations: 'R-2020',
  semester: 'V Semester',
  degree: 'B.Tech - CSE',
  instructions: [
    'Answer ALL Part-A questions. Each question carries 2 marks.',
    'Answer ALL Part-B questions. Each question carries 5 marks.',
    'Answer ALL Part-C questions. Each question carries 10 marks.',
    'Answer ALL Part-D questions. Each question carries 13 marks.'
  ]
};

export const DEFAULT_QUESTION_CONFIG = {
  twoMarkCount: 10,
  fiveMarkCount: 3,
  tenMarkCount: 0,
  thirteenMarkCount: 2,
  difficulty: DIFFICULTY_LEVELS.AVERAGE,
  orientations: ['Analytical', 'Practical', 'Theory', 'Application']
};

export function calculateTotalQuestions(config) {
  return (
    (Number(config.twoMarkCount) || 0) +
    (Number(config.fiveMarkCount) || 0) +
    (Number(config.tenMarkCount) || 0) +
    (Number(config.thirteenMarkCount) || 0)
  );
}

export function calculateTotalMarks(config) {
  return (
    (Number(config.twoMarkCount) || 0) * 2 +
    (Number(config.fiveMarkCount) || 0) * 5 +
    (Number(config.tenMarkCount) || 0) * 10 +
    (Number(config.thirteenMarkCount) || 0) * 13
  );
}
