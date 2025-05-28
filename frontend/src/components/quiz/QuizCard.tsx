import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Award, CheckCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Quiz } from '../../types/quiz';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const navigate = useNavigate();

  return (
    <Card variant="hover" className="h-full flex flex-col">
      <div className="mb-4">
        <span className={`
          inline-flex px-3 py-1 rounded-full text-xs font-medium
          ${quiz.difficulty === 'Easy' ? 'bg-success-100 text-success-800' :
            quiz.difficulty === 'Medium' ? 'bg-warning-100 text-warning-800' :
            'bg-error-100 text-error-800'}
        `}>
          {quiz.difficulty}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{quiz.description}</p>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-2" />
          <span>{quiz.timeLimit} minutes</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <CheckCircle className="h-4 w-4 mr-2" />
          <span>{quiz.questionCount} questions</span>
        </div>
        {quiz.passingScore && (
          <div className="flex items-center text-gray-500 text-sm">
            <Award className="h-4 w-4 mr-2" />
            <span>Pass: {quiz.passingScore}%</span>
          </div>
        )}
      </div>
      
      <Button
        onClick={() => navigate(`/quiz/${quiz.id}`)}
        className="w-full mt-auto"
      >
        Start Quiz
      </Button>
    </Card>
  );
};

export default QuizCard;