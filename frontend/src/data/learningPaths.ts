import { LearningPath } from '../types/learningPath';

const learningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Mathematics Fundamentals',
    description: 'Build a strong foundation in mathematics with this comprehensive learning path.',
    image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    // level: 'Beginner',
    // instructors: [
    //   { id: '1', name: 'Dr. Sarah Johnson', avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    //   { id: '2', name: 'Prof. Michael Chen' }
    // ],
    // duration: 20,
    // materials: ['1', '2', '3']
  },
  {
    id: '2',
    title: 'Science Exploration',
    description: 'Discover the wonders of science through interactive lessons and experiments.',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    // level: 'Intermediate',
    // instructors: [
    //   { id: '3', name: 'Dr. Robert Wilson', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    // ],
    // duration: 25,
    // materials: ['4', '5']
  },
  {
    id: '3',
    title: 'Language Arts',
    description: 'Enhance your reading, writing, and communication skills with this comprehensive course.',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    // level: 'Beginner',
    // instructors: [
    //   { id: '4', name: 'Emma Rodriguez', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    //   { id: '5', name: 'James Smith' }
    // ],
    // duration: 15,
    // materials: ['6', '7']
  },

];

export const getLearningPaths = () => {
  return learningPaths;
};

export const getLearningPathById = (id: string) => {
  return learningPaths.find(path => path.id === id) || null;
};