import React, { useState, useEffect } from "react";
import { Search, BookOpen, Brain, Award, User } from "lucide-react";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import LearningPathCard from "../components/home/LearningPathCard";
import { useAuth } from "../contexts/AuthContext";
import { LearningPath } from "../types/learningPath";
import { home, teacher } from "../services/axiosService";
import { useNavigate } from "react-router-dom";
const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [filteredPaths, setFilteredPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState<string>("");
  const [students, setStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await teacher.getAllStudents(); // Update to your actual endpoint

        setStudents(res.students || []);
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, [emailSent]);
  const handleInvite = async (emails: string) => {
    try {
      await teacher.inviteStudents({ emails: emails });
      setEmailSent(!emailSent);
    } catch (e) {
      console.error("error sending invite");
    }
    setInvitedEmails([]);
  };

  const generateDescription = (title: string): string => {
    switch (title) {
      case "Adolescent Pregnancy Prevention":
        return "This course aims to equip adolescents with comprehensive knowledge and skills to make informed decisions regarding their sexual and reproductive health. It emphasizes the importance of abstinence, safe sex practices, and understanding the consequences of early pregnancies.";
      case "Youth Crime & Gang Prevention":
        return "This course delves into the factors leading to youth involvement in crime and gangs. It explores preventive measures, rehabilitation strategies, and the role of community and law enforcement in addressing juvenile delinquency.";
      case "Legal Literacy & Civic Education":
        return "This course focuses on enhancing individuals' understanding of legal systems and civic responsibilities. It aims to empower participants to actively engage in democratic processes and advocate for their rights and the rights of others.";
      default:
        return "Explore this essential topic and enhance your knowledge.";
    }
  };

  const getImageForCourse = (index: number): string => {
    const images = [
      "https://images.pexels.com/photos/4260323/pexels-photo-4260323.jpeg",
      "https://images.pexels.com/photos/5212322/pexels-photo-5212322.jpeg",
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    ];
    return images[index % images.length];
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await home.getCourses();
      console.log("res", res);

      const courseTitles: string[] = res.data || [];

      const mappedPaths: LearningPath[] = courseTitles.map((title, index) => ({
        id: (index + 1).toString(),
        title,
        description: generateDescription(title),
        image: getImageForCourse(index),
      }));

      setLearningPaths(mappedPaths);
      setFilteredPaths(mappedPaths);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPaths(learningPaths);
    } else {
      const filtered = learningPaths.filter(
        (path) =>
          path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          path.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPaths(filtered);
    }
  }, [searchQuery, learningPaths]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome section */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {user?.name || "Student"}
        </h1>
        <p className="text-gray-600 text-lg">
          {user?.type === "student"
            ? "Continue your learning journey or explore new paths."
            : "Start contributing for betterment of Bronx"}
        </p>
      </section>

      {user?.type === "student" ? (
        <>
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <Input
                  placeholder="Search for learning paths..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-5 w-5 text-gray-400" />}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Aim</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <BookOpen className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Accessible Education
                  </h3>
                </div>
                <p className="text-gray-600">
                  We're committed to making quality education accessible to
                  every member of the Bronx community, regardless of background
                  or prior experience.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <Brain className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Skill Development</h3>
                </div>
                <p className="text-gray-600">
                  Our interactive learning paths and quizzes are designed to
                  develop practical skills that empower community members in
                  their education and careers.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <Award className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Community Growth</h3>
                </div>
                <p className="text-gray-600">
                  By fostering a culture of continuous learning, we aim to
                  strengthen our community and create opportunities for everyone
                  to reach their full potential.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Learning Paths
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="h-80 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </Card>
                ))}
              </div>
            ) : filteredPaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPaths.map((path, index) => (
                  <LearningPathCard key={path.id} path={path} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No learning paths found for "{searchQuery}"
                </p>
              </div>
            )}
          </section>
        </>
      ) : (
        <>
          <>
            {/* Students List */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Username</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{student.username}</td>
                      <td className="px-6 py-4">{student.email}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => navigate(`/progress/${student.id}`)}
                          className="text-sm px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition"
                        >
                          View Progress
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Invite Students */}
            <section className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Invite Students
              </h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Email Addresses
                  </label>
                  <div className="border border-gray-300 rounded p-2 min-h-[3rem] flex flex-wrap gap-2">
                    {invitedEmails.map((email, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                      >
                        {email}
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() =>
                            setInvitedEmails(
                              invitedEmails.filter((e) => e !== email)
                            )
                          }
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="email"
                      placeholder="Type and press Enter"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && emailInput.trim()) {
                          e.preventDefault();
                          if (!invitedEmails.includes(emailInput.trim())) {
                            setInvitedEmails([
                              ...invitedEmails,
                              emailInput.trim(),
                            ]);
                          }
                          setEmailInput("");
                        }
                      }}
                      className="flex-1 border-none outline-none p-1 text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleInvite(invitedEmails.join(","))}
                  className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded"
                >
                  Invite
                </button>
              </div>
            </section>
          </>
        </>
      )}
    </div>
  );
};

export default Home;
