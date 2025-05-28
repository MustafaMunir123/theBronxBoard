import axios, {
  AxiosRequestTransformer,
  AxiosResponseTransformer,
} from "axios";
import { getLocalStorage } from "../utils/localStorage";
import { Users } from "../types/users";
import { Courses, Enrollments } from "../types/learningPath";
import {
  ContentResponse,
  MaterialResponse,
  QuizQuestons,
  ReportResponse,
  Resources,
  ServerResponse,
  Student,
  SubmissionReponse,
} from "./types";

function getApiUrl() {
  return "http://localhost:8000/api";
}

const config = {
  apiUrl: getApiUrl(),
  regId: import.meta.env.VITE_REG_ID,
  deviceName: window.navigator.userAgent,
};

const transformRequest: AxiosRequestTransformer = (request) => {
  try {
    return JSON.stringify(request);
  } catch {
    return request;
  }
};

const transformResponse: AxiosResponseTransformer = (response) => {
  try {
    return JSON.parse(response);
  } catch {
    return null;
  }
};

export const agent = axios.create({
  baseURL: config.apiUrl,
  transformRequest,
  transformResponse,
  headers: {
    "Content-Type": "application/json",
  },
});

agent.interceptors.request.use(
  (request) => {
    const token = getLocalStorage("token");
    if (token) {
      request.headers["Authorization"] = `Token ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

agent.interceptors.response.use(
  (response) => {
    if (response.status === 401 || response.status === 403) {
      window.location.href = "/login";
      return;
    }
    if (response.data?.success === false) {
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/signin" &&
      window.location.pathname !== "/"
    ) {
      window.localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (payload: { username: string; password: string }) =>
    agent.post<unknown, Users>("/users/login", payload),
  signUp: (payload: {
    username: string;
    password: string;
    email: string;
    type: string;
  }) => agent.post<unknown, Users>("/users/signup", payload),
};

export const home = {
  getCourses: () => agent.get<unknown, Courses>("/lms/courses"),
  getEnrollments: () => agent.get<unknown, Enrollments>("/lms/enrollments"),
  enroll: (payload: { learning_path_title: string }) =>
    agent.post<unknown, ServerResponse>("/lms/enroll", payload),
};

export const materials = {
  getContents: (payload: { learning_path_title: string }) =>
    agent.post<unknown, ContentResponse>("/lms/catalog", payload),
  getMaterial: (contentId: string) =>
    agent.get<unknown, MaterialResponse>(`/lms/content/${contentId}`),

  markAsRead: (contentId: string, payload: { completed: boolean }) =>
    agent.patch<unknown, MaterialResponse>(
      `/lms/content/${contentId}`,
      payload
    ),
};

export const quizSection = {
  getQuestions: (paylod: { learning_path_title: string }) =>
    agent.post<unknown, QuizQuestons>("/lms/quiz/generate", paylod),
  submitAns: (payload: { question_id: string; answer: string }) =>
    agent.post<unknown, any>("/lms/quiz/question/submit", payload),
  submitQuiz: (payload: { quiz_id: string }) =>
    agent.post<unknown, SubmissionReponse>("/lms/quiz/submit", payload),
};

export const progress = {
  getReport: (uid: string) =>
    agent.get<unknown, ReportResponse>(`/lms/report/${uid}`),
};

export const resources = {
  getSkillRsources: () => agent.get<unknown, Resources>("/lms/resource/skills"),
  getWelfareRsources: () =>
    agent.get<unknown, Resources>("/lms/resource/welfare"),
};
export const teacher = {
  getAllStudents: () => agent.get<unknown, Student>("/users/students"),
  inviteStudents: (payload: { emails: string }) =>
    agent.post<unknown, any>("/users/invite", payload),
};
