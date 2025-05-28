// import { Material } from '../types/material';

// const materials: Material[] = [
//   {
//     id: '1',
//     title: 'Adolescent Pregnancy Prevention',
//     description: 'A gentle introduction to fundamental mathematical concepts.',
//     learningPathId: '1',
//     sections: [
//       {
//         title: 'What is Mathematics?',
//         content: [
//           'Mathematics is the study of numbers, shapes, patterns, and structures. It serves as the foundation for many fields including science, engineering, economics, and technology.',
//           'In this material, we will explore the basic concepts that form the building blocks of mathematics. Understanding these fundamentals will help you develop problem-solving skills and logical thinking.'
//         ],
//         image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//       },
//       {
//         title: 'Numbers and Operations',
//         content: [
//           'Numbers are the basic elements of mathematics. We start with natural numbers (1, 2, 3, ...), then expand to integers, rational numbers, and real numbers.',
//           'The fundamental operations—addition, subtraction, multiplication, and division—allow us to manipulate numbers and solve problems.',
//           'These operations follow specific properties such as the commutative, associative, and distributive properties.'
//         ]
//       },
//       {
//         title: 'Algebraic Thinking',
//         content: [
//           'Algebra extends arithmetic by using variables to represent unknown quantities. This allows us to express relationships and solve for unknowns.',
//           'Algebraic expressions combine numbers, variables, and operations. Equations state that two expressions are equal and can be solved to find the value of variables.',
//           'Understanding algebra helps us model real-world problems and find systematic solutions.'
//         ],
//         image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//       }
//     ],
//     references: [
//       {
//         title: 'Khan Academy: Basic Mathematics',
//         type: 'website',
//         url: 'https://www.khanacademy.org/math/basic-geo',
//         description: 'Free online lessons covering basic mathematical concepts.'
//       },
//       {
//         title: 'The Beauty of Mathematics',
//         type: 'video',
//         url: 'https://www.youtube.com/watch?v=yPtPHqZVBc4',
//         description: 'An inspiring video showcasing the elegance and importance of mathematics.'
//       },
//       {
//         title: 'Mathematics for Beginners',
//         type: 'article',
//         url: 'https://www.mathsisfun.com/',
//         description: 'A comprehensive resource with clear explanations of mathematical concepts.'
//       }
//     ]
//   },
//   {
//     id: '2',
//     title: 'Algebra Fundamentals',
//     description: 'Learn the basics of algebraic thinking and problem-solving.',
//     learningPathId: '1',
//     sections: [
//       {
//         title: 'Introduction to Algebra',
//         content: [
//           'Algebra is a branch of mathematics that uses symbols and letters to represent numbers and quantities in formulas and equations.',
//           'It provides a way to formulate general rules and solve problems that would be difficult to express or solve with just arithmetic.',
//           'In this section, we will explore the fundamental concepts of algebra and how they relate to real-world problem-solving.'
//         ],
//         image: 'https://images.pexels.com/photos/5428827/pexels-photo-5428827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//       },
//       {
//         title: 'Variables and Expressions',
//         content: [
//           'Variables are symbols (usually letters) that represent unknown values or quantities that can change.',
//           'Algebraic expressions combine numbers, variables, and operations. For example, 3x + 5 is an expression where x is a variable.',
//           'We can evaluate expressions by substituting specific values for the variables.'
//         ]
//       }
//     ],
//     references: [
//       {
//         title: 'Introduction to Algebra',
//         type: 'video',
//         url: 'https://www.youtube.com/watch?v=NybHckSEQBI',
//         description: 'A comprehensive introduction to algebraic concepts.'
//       },
//       {
//         title: 'Algebra Practice Problems',
//         type: 'website',
//         url: 'https://www.mathplanet.com/education/algebra-1',
//         description: 'Interactive practice problems to reinforce algebraic skills.'
//       }
//     ]
//   },
//   {
//     id: '3',
//     title: 'Introduction to Chemistry',
//     description: 'Explore the fundamental principles of chemistry and matter.',
//     learningPathId: '2',
//     sections: [
//       {
//         title: 'What is Chemistry?',
//         content: [
//           'Chemistry is the scientific study of matter, its properties, and how it interacts with energy and other forms of matter.',
//           'It is central to understanding the behavior of atoms, molecules, and the chemical reactions that transform substances.',
//           'In this material, we will explore the basic concepts of chemistry and how they relate to everyday phenomena.'
//         ],
//         image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//       },
//       {
//         title: 'Atoms and Elements',
//         content: [
//           'Atoms are the basic units of matter, composed of protons, neutrons, and electrons.',
//           'Elements are substances made up of only one type of atom. The Periodic Table organizes all known elements based on their properties.',
//           'Understanding atomic structure helps explain chemical bonding and reactions.'
//         ]
//       }
//     ],
//     references: [
//       {
//         title: 'Chemistry Basics',
//         type: 'website',
//         url: 'https://www.chemistryworld.com/',
//         description: 'A comprehensive resource for chemistry concepts and news.'
//       },
//       {
//         title: 'Introduction to the Periodic Table',
//         type: 'video',
//         url: 'https://www.youtube.com/watch?v=0RRVV4Diomg',
//         description: 'An engaging overview of the periodic table and its organization.'
//       }
//     ]
//   }
// ];

// export const getMaterials = () => {
//   return materials;
// };

// export const getMaterialById = (id: string) => {
//   return materials.find(material => material.title === id) || null;
// };

// // export const getMaterialsByLearningPathId = (learningPathId: string) => {
// //   return materials.filter(material => material.learningPathId === learningPathId);
// // };
