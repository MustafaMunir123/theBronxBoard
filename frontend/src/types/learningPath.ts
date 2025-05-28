export interface Instructor {
  id: string;
  name: string;
  avatar?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  image: string;
  // level: 'Beginner' | 'Intermediate' | 'Advanced';
  // instructors: Instructor[];
  // duration: number; 
  // materials: string[]; 
}

export interface Courses {
  success : boolean;
  message: string;
  data: string[];
}
export interface Enrollments {
  success : boolean;
  message: string;
  enrollments: {
    id: string;
    learning_path_title: string;
    content_title: string;
  }[];
}