import { StudentProgress } from '../types/progress';

const studentProgress: StudentProgress[] = [
  {
    id: '1',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completedQuizzes: 8,
    totalQuizzes: 12,
    averageScore: 85,
    recentActivity: [
      {
        type: 'completed',
        message: 'Completed "Mathematics Fundamentals Quiz" with a score of 90%',
        date: 'Yesterday at 2:30 PM'
      },
      {
        type: 'started',
        message: 'Started "Algebra Basics" quiz',
        date: 'Yesterday at 10:15 AM'
      },
      {
        type: 'completed',
        message: 'Completed "Chemistry Basics Quiz" with a score of 75%',
        date: 'May 15, 2023'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completedQuizzes: 10,
    totalQuizzes: 12,
    averageScore: 92,
    recentActivity: [
      {
        type: 'completed',
        message: 'Completed "Algebra Basics" with a score of 95%',
        date: 'Today at 9:45 AM'
      },
      {
        type: 'completed',
        message: 'Completed "Mathematics Fundamentals Quiz" with a score of 88%',
        date: '2 days ago'
      },
      {
        type: 'failed',
        message: 'Failed "Chemistry Basics Quiz" with a score of 60%',
        date: 'May 10, 2023'
      }
    ]
  },
  {
    id: '3',
    name: 'David Chen',
    email: 'david.chen@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completedQuizzes: 5,
    totalQuizzes: 12,
    averageScore: 78,
    recentActivity: [
      {
        type: 'started',
        message: 'Started "Chemistry Basics Quiz"',
        date: 'Today at 11:20 AM'
      },
      {
        type: 'completed',
        message: 'Completed "Mathematics Fundamentals Quiz" with a score of 82%',
        date: '3 days ago'
      }
    ]
  },
  {
    id: '4',
    name: 'Jennifer Lopez',
    email: 'jennifer.lopez@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completedQuizzes: 12,
    totalQuizzes: 12,
    averageScore: 95,
    recentActivity: [
      {
        type: 'completed',
        message: 'Completed "Chemistry Basics Quiz" with a score of 98%',
        date: 'Yesterday at 4:15 PM'
      },
      {
        type: 'completed',
        message: 'Completed "Algebra Basics" with a score of 92%',
        date: '2 days ago'
      }
    ]
  },
  {
    id: '5',
    name: 'Michael Smith',
    email: 'michael.smith@example.com',
    completedQuizzes: 3,
    totalQuizzes: 12,
    averageScore: 65,
    recentActivity: [
      {
        type: 'failed',
        message: 'Failed "Mathematics Fundamentals Quiz" with a score of 60%',
        date: 'Today at 10:45 AM'
      },
      {
        type: 'started',
        message: 'Started "Algebra Basics"',
        date: 'Yesterday at 3:30 PM'
      }
    ]
  },
  {
    id: '6',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    completedQuizzes: 7,
    totalQuizzes: 12,
    averageScore: 88,
    recentActivity: [
      {
        type: 'completed',
        message: 'Completed "Chemistry Basics Quiz" with a score of 90%',
        date: '2 days ago'
      },
      {
        type: 'completed',
        message: 'Completed "Mathematics Fundamentals Quiz" with a score of 85%',
        date: 'May 12, 2023'
      }
    ]
  }
];

export const getStudentsProgress = () => {
  return studentProgress;
};

export const getStudentProgressById = (id: string) => {
  return studentProgress.find(student => student.id === id) || null;
};