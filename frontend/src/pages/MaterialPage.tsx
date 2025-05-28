import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Link as LinkIcon,
  FileText,
  Play,
  ChevronRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
// import { getMaterialById } from "../data/materials";
import { Quiz } from "../types/quiz";
import { Material } from "../types/material";
import { materials } from "../services/axiosService";

type ContentResponse = {
  serial_number: number;
  id: string;
  title: string;
  enabled: boolean;
};

const MaterialPage: React.FC = () => {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [material, setMaterial] = useState<Material | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contentId, setContentId] = useState("");
  const [sections, setSections] = useState<ContentResponse[] | undefined>();
  const [activeTab, setActiveTab] = useState<"content" | "references">(
    "content"
  );
  const [completedSections, setCompletedSections] = useState<Set<number>>(
    new Set()
  );

  const [isFullyCompleted, setIsFullyCompleted] = useState(false);
  const decodedTitle = decodeURIComponent(pathId || "");
  const pageSize = 1;

  // const currentSections = material
  //   ? material.sections.slice(
  //       (currentPage - 1) * pageSize,
  //       currentPage * pageSize
  //     )
  //   : [];

  useEffect(() => {
    const fetchContents = async () => {
      const res = await materials.getContents({
        learning_path_title: decodedTitle,
      });
      setSections(res.enrollments);
      setContentId(res.enrollments?.[currentPage - 1].id);
    };

    if (decodedTitle) {
      fetchContents();
    }
  }, [decodedTitle]);
  // console.log("con", contentId);
  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const res = await materials.getMaterial(contentId);
        if (res.data.completed) {
          const newCompletedSections = new Set(completedSections);
          newCompletedSections.add(res.data.serial_number);
          setCompletedSections(newCompletedSections);
        }
        const fetchedMaterial = {
          title: res.data.title,
          description: "", // or any static/default if not available
          sections: [
            {
              title: res.data.title,
              content: res.data.content?.split("\n") || [],
              image: "",
              completed: res.data.completed,
            },
          ],
          reference: res.data.reference,
        };
        setMaterial(fetchedMaterial);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch material", error);
        setIsLoading(false);
      }
    };

    if (contentId) {
      fetchMaterial();
    }
  }, [contentId]);
  console.log("material", material);
  // useEffect(() => {
  //   if (decodedTitle) {
  //     const fetchedMaterial = getMaterialById(decodedTitle);
  //     const fetchedQuizzes = getQuizzesByMaterialId(decodedTitle);
  //     setMaterial(fetchedMaterial);
  //     setQuizzes(fetchedQuizzes);
  //     setIsLoading(false);
  //   }
  // }, [decodedTitle]);
  const handleConentClick = (index: number, section: any) => {
    setCurrentPage(index + 1);
    setContentId(section?.id);
  };
  const handleSectionComplete = async (sectionIndex: number) => {
    const newCompletedSections = new Set(completedSections);
    if (completedSections.has(sectionIndex)) {
      await materials.markAsRead(contentId, { completed: false });
      newCompletedSections.delete(sectionIndex);
    } else {
      await materials.markAsRead(contentId, { completed: true });
      newCompletedSections.add(sectionIndex);
    }
    setCompletedSections(newCompletedSections);
    setIsFullyCompleted(
      newCompletedSections.size === material?.sections.length
    );
  };

  console.log("compeletedSecs", Array.from(completedSections));
  const completionPercentage =
    material && sections?.length
      ? Math.round((completedSections.size / sections.length) * 100)
      : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Material not found
            </h1>
            <Button
              variant="outline"
              onClick={() => navigate("/home")}
              icon={<ArrowLeft className="h-5 w-5" />}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              onClick={() => navigate("/home")}
              icon={<ArrowLeft className="h-5 w-5" />}
            >
              Back to Learning Paths
            </Button>
            {/* <Button
              onClick={handleMarkComplete}
              variant={isFullyCompleted ? "outline" : "primary"}
              icon={
                isFullyCompleted ? (
                  <CheckCircle className="h-5 w-5 text-success-600" />
                ) : undefined
              }
            >
              {isFullyCompleted ? "Marked as Complete" : "Mark as Complete"}
            </Button> */}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {material.title}
              </h1>
              <p className="text-gray-600">{material.description}</p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-gray-500">
              <Clock className="h-5 w-5" />
              <span>Est. time: 20 mins</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <Card className="overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  className={`py-3 px-5 font-medium text-sm ${
                    activeTab === "content"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("content")}
                >
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Content
                  </div>
                </button>
                <button
                  className={`py-3 px-5 font-medium text-sm ${
                    activeTab === "references"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("references")}
                >
                  <div className="flex items-center">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    References
                  </div>
                </button>
              </div>

              <div className="p-6">
                {activeTab === "content" ? (
                  <>
                    {material.sections.map((section, index) => (
                      <div key={index} className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-semibold text-gray-900">
                            {section.title}
                          </h2>
                          <Button
                            variant="ghost"
                            onClick={() =>
                              handleSectionComplete(currentPage - 1)
                            }
                            icon={
                              completedSections.has(currentPage - 1) ||
                              section.completed ? (
                                <CheckCircle className="h-5 w-5 text-success-600" />
                              ) : undefined
                            }
                          >
                            {completedSections.has(currentPage - 1) ||
                            section.completed
                              ? "Completed"
                              : "Mark Complete"}
                          </Button>
                        </div>
                        {section.image && (
                          <img
                            src={section.image}
                            alt={section.title}
                            className="w-full rounded-lg shadow-md mb-6"
                          />
                        )}
                        <div className="prose max-w-none">
                          {section.content.map((paragraph, pIndex) => (
                            <p
                              key={pIndex}
                              className="text-gray-700 leading-relaxed mb-4"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        icon={<ArrowLeft className="h-5 w-5" />}
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        icon={<ArrowRight className="h-5 w-5" />}
                      >
                        Next
                      </Button>
                    </div> */}
                  </>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Reference Materials
                      </h3>
                      <div className="space-y-4">
                        {material.reference
                          ?.split(/\r?\n/) // split by \r\n or \n
                          .map((url, index) => (
                            <a
                              key={index}
                              href={url.trim()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-4 rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors"
                            >
                              <div className="flex items-center space-x-2">
                                <LinkIcon className="h-5 w-5 text-primary-500" />
                                <span className="text-gray-900 break-all">
                                  {url.trim()}
                                </span>
                              </div>
                            </a>
                          ))}
                      </div>
                    </div>

                    {/* {quizzes.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Available Quizzes
                        </h3>
                        <div className="space-y-3">
                          {quizzes.map((quiz) => (
                            <button
                              key={quiz.id}
                              onClick={() => navigate(`/quiz/${quiz.id}`)}
                              className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors"
                              disabled={!isFullyCompleted}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {quiz.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {quiz.questionCount} questions •{" "}
                                    {quiz.timeLimit} minutes
                                  </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )} */}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Course Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-medium text-gray-900">
                      {completionPercentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-primary-600 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span>Time Spent</span>
                    <span>45 minutes</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Last Activity</span>
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Navigation
              </h3>
              <nav className="space-y-1">
                {sections?.map((section, index) => {
                  const isCompleted = completedSections.has(index);
                  const lastCompletedIndex =
                    Array.from(completedSections).length > 0
                      ? Math.max(...Array.from(completedSections))
                      : -1;
                  const isCurrent = currentPage === index + 1;
                  const isNext = index === lastCompletedIndex + 1;
                  const isAccessible =
                    isCompleted || isNext || index <= lastCompletedIndex;

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        isAccessible && handleConentClick(index, section)
                      }
                      disabled={!isAccessible}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between
        ${
          isCurrent
            ? "bg-primary-50 text-primary-700 font-medium"
            : isAccessible
            ? "text-gray-600 hover:bg-gray-50"
            : "text-gray-400 cursor-not-allowed"
        }`}
                    >
                      <span>{section.title}</span>
                      {isCompleted && (
                        <CheckCircle className="h-4 w-4 text-success-600" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </Card>

            <Card className="p-6">
              <Button
                variant="primary"
                disabled={completionPercentage < 100}
                onClick={() => navigate(`/quiz/${decodedTitle}`)}
              >
                Start Quiz
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialPage;
