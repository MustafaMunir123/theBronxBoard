import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Loader,
} from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { Quiz } from "../types/quiz";
import { quizSection } from "../services/axiosService";
import { useDispatch } from "react-redux";
import { setQuizResult } from "../redux/reducers/quizResultSlice";
const QuizPage: React.FC = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [lockedAnswers, setLockedAnswers] = useState<{
    [key: number]: boolean;
  }>({});
  const [showWarning, setShowWarning] = useState(false);
  const decodedTitle = decodeURIComponent(quizId || "");
  console.log("deccc", decodedTitle);
  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await quizSection.getQuestions({
        learning_path_title: decodedTitle,
      });

      const fetchedQuestions = {
        id: res.quiz_id,
        title: decodedTitle,
        questionCount: res.questions.length,
        questions: res.questions,
      };

      setQuiz(fetchedQuestions);
    };
    if (decodedTitle) {
      fetchQuiz();
    }
  }, [decodedTitle]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: e.target.value,
    }));
  };

  const handleLockAnswer = async (qId: string) => {
    if (answers[currentQuestionIndex].trim() !== "") {
      try {
        await quizSection.submitAns({
          question_id: qId,
          answer: answers[currentQuestionIndex],
        });
        setLockedAnswers((prev) => ({
          ...prev,
          [currentQuestionIndex]: true,
        }));
      } catch {
        console.error("error");
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const isQuizComplete = () => {
    return Object.values(lockedAnswers).every((locked) => locked);
  };

  const handleSubmitQuiz = async () => {
    if (!isQuizComplete() && !showWarning) {
      setShowWarning(true);
      return;
    }

    try {
      const res = await quizSection.submitQuiz({ quiz_id: quiz?.id as string });
      dispatch(setQuizResult(res.data));
      navigate(`/quiz-result/${decodedTitle}`);
    } catch {
      console.error("error");
    }
  };

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  if (!quiz || !currentQuestion) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>

      <Card padding="lg" className="mb-8">
        <div className="mb-4 text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {quiz.questionCount}
        </div>

        <h2 className="text-xl font-semibold mb-4">
          {currentQuestion.question}
        </h2>

        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
          rows={4}
          placeholder="Type your answer here..."
          value={answers[currentQuestionIndex]}
          onChange={handleAnswerChange}
          disabled={lockedAnswers[currentQuestionIndex]}
        />

        <div className="flex items-center gap-4">
          {!lockedAnswers[currentQuestionIndex] && (
            <Button
              onClick={() => handleLockAnswer(currentQuestion.question_id)}
              variant="primary"
            >
              Lock Answer
            </Button>
          )}
          {currentQuestionIndex !== quiz.questions.length - 1 && (
            <Button
              onClick={handleNextQuestion}
              variant="outline"
              disabled={!lockedAnswers[currentQuestionIndex]}
            >
              Next
            </Button>
          )}
        </div>

        {currentQuestionIndex === quiz.questions.length - 1 &&
          isQuizComplete() && (
            <Button
              onClick={handleSubmitQuiz}
              className="mt-6"
              variant="primary"
            >
              Submit Quiz
            </Button>
          )}

        {showWarning && !isQuizComplete() && (
          <div className="text-red-500 mt-4">
            Please lock all answers before submitting.
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuizPage;
