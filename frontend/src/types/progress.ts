export interface Activity {
  type: 'completed' | 'started' | 'failed';
  message: string;
  date: string;
}

export interface StudentProgress {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  completedQuizzes: number;
  totalQuizzes: number;
  averageScore: number;
  recentActivity: Activity[];
}