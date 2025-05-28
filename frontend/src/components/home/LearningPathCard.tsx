import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Card from "../common/Card";
import { LearningPath } from "../../types/learningPath";
import Button from "../common/Button";
import { home } from "../../services/axiosService";

interface LearningPathCardProps {
  path: LearningPath;
  index: number;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ path, index }) => {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  useEffect(() => {
    const fetchEnrollments = async () => {
      const res = await home.getEnrollments();
      if (res.enrollments?.[index]?.learning_path_title === path.title)
        setIsEnrolled(true);
    };
    fetchEnrollments();
  }, []);
  const handleEnroll = async () => {
    try {
      await home.enroll({ learning_path_title: path.title });
      setIsEnrolled(true);
    } catch (err) {
      console.error("err enrolling", err);
    }
  };
  return (
    <Card
      variant="hover"
      className="h-full flex flex-col"
      onClick={() =>
        isEnrolled
          ? navigate(`/materials/${encodeURIComponent(path.title)}`)
          : null
      }
    >
      <div className="relative h-48 mb-4 overflow-hidden rounded-t-xl">
        <img
          src={path.image}
          alt={path.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {path.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow">{path.description}</p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Button
              onClick={handleEnroll}
              variant={isEnrolled ? "primary" : "outline"}
            >
              {" "}
              {isEnrolled ? "Enrolled" : "Enroll"}
            </Button>
          </div>

          <ArrowRight className="h-5 w-5 text-primary-600" />
        </div>
      </div>
    </Card>
  );
};

export default LearningPathCard;
