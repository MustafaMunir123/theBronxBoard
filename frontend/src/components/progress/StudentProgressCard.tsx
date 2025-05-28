import React from 'react';
import { BarChart, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import { StudentProgress } from '../../types/progress';

interface StudentProgressCardProps {
  student: StudentProgress;
}

const StudentProgressCard: React.FC<StudentProgressCardProps> = ({ student }) => {
  const completionPercentage = Math.round((student.completedQuizzes / student.totalQuizzes) * 100) || 0;
  
  return (
    <Card padding="md" className="h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {student.avatar ? (
            <img 
              src={student.avatar} 
              alt={student.name} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-primary-100 text-primary-700 font-semibold">
              {student.name.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
          <p className="text-gray-500 text-sm">{student.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <CheckCircle className="h-4 w-4 mr-2 text-success-500" />
            <span>Completed</span>
          </div>
          <p className="text-xl font-semibold">
            {student.completedQuizzes} / {student.totalQuizzes}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <BarChart className="h-4 w-4 mr-2 text-primary-500" />
            <span>Avg. Score</span>
          </div>
          <p className="text-xl font-semibold">{student.averageScore}%</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary-600 h-2.5 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-auto">
        <h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
        <div className="space-y-2">
          {student.recentActivity.length > 0 ? (
            student.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start text-sm">
                {activity.type === 'completed' ? (
                  <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-success-500" />
                ) : activity.type === 'started' ? (
                  <Clock className="h-4 w-4 mt-0.5 mr-2 text-warning-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 mt-0.5 mr-2 text-error-500" />
                )}
                <div>
                  <p className="text-gray-700">{activity.message}</p>
                  <p className="text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent activity</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StudentProgressCard;