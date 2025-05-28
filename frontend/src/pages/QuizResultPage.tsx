import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Trophy,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
// import { Quiz } from "../types/quiz";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// interface ResultLocation {
//   score: number;
//   correctAnswers: number;
//   totalQuestions: number;
//   timeSpent: number;
//   passed: boolean;
//   answers: { [key: number]: number | null };
// }

const QuizResultPage: React.FC = () => {
  const { quizId } = useParams();
  const quizResult = useSelector((state: RootState) => state.quizResult.result);
  // const location = useLocation();
  const navigate = useNavigate();
  console.log("quizResult", quizResult);
  // const [quiz, setQuiz] = useState<Quiz | null>(null);
  // const [result, setResult] = useState<ResultLocation | null>(null);
  const decodedTitle = decodeURIComponent(quizId || "");
  // useEffect(() => {
  //   if (quizId) {
  //     const fetchedQuiz = getQuizById(quizId);
  //     setQuiz(fetchedQuiz);

  //     // Get results from location state or mock some data for demonstration
  //     if (location.state) {
  //       setResult(location.state as ResultLocation);
  //     } else {
  //       // Mock data if no state passed (in a real app, you might redirect to the quiz)
  //       setResult({
  //         score: 80,
  //         correctAnswers: 8,
  //         totalQuestions: 10,
  //         timeSpent: 600,
  //         passed: true,
  //         answers: {},
  //       });
  //     }
  //   }
  // }, [quizId, location.state]);

  if (!quizResult) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Results not found
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate("/home")}
          icon={<ArrowLeft className="h-5 w-5" />}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins} minute${mins !== 1 ? "s" : ""} ${secs} second${
  //     secs !== 1 ? "s" : ""
  //   }`;
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={() => navigate("/home")}
          icon={<ArrowLeft className="h-5 w-5" />}
          className="mb-4"
        >
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Results</h1>
        <p className="text-gray-600">{decodedTitle}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <Card variant="hover" className="text-center p-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-32 w-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {quizResult.percentage.toFixed(1)}%
                </span>
              </div>
              {quizResult.status === "Pass" ? (
                <div className="absolute bottom-0 right-0 bg-success-500 rounded-full p-2">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              ) : (
                <div className="absolute bottom-0 right-0 bg-error-500 rounded-full p-2">
                  <XCircle className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold mb-1">
              {quizResult.status === "Pass" ? "Passed!" : "Not Passed"}
            </h2>
            {/* <p className="text-gray-500 text-sm">
              {quizResult.obtained_marks !== undefined && quizResult.total_marks !== undefined && (
                <>Score: {quizResult.obtained_marks}/{ quizResult.total_marks}</>
              )}
            </p> */}
          </div>
        </Card>

        <Card variant="hover" className="text-center p-6">
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 p-4 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold mb-1">
              {quizResult.obtained_marks}/{quizResult.total_marks}
            </h2>
            <p className="text-gray-500 text-sm">Score</p>
          </div>
        </Card>

        <Card variant="hover" className="text-center p-6">
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 p-4 rounded-full mb-4">
              <Trophy className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold mb-1">2 hrs</h2>
            <p className="text-gray-500 text-sm">Time Spent</p>
          </div>
        </Card>
      </div>

      <div className="flex justify-between">
        {/* <Button
          variant="outline"
          onClick={() => navigate("/home")}
          icon={<ArrowLeft className="h-5 w-5" />}
        >
          Back to Home
        </Button> */}

        {quizResult.status === "Pass" && (
          <Button
            onClick={() => window.open("https://mail.google.com", "_blank")}
            icon={<ChevronRight className="h-5 w-5" />}
          >
            Certificate sent to your email!
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizResultPage;
