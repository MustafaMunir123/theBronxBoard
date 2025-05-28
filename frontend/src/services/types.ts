export type ServerResponse<
  T = Record<string, unknown> | Record<string, unknown>[]
> = {
  success: boolean;
  data: T;
  message: string;
};
export type ContentResponse = {
  success: boolean;
  enrollments: {
    serial_number: number;
    id: string;
    title: string;
    enabled: boolean;
  }[];
  message: string;
};

export type MaterialResponse = {
  success: boolean;
  data: {
    id: string;
    course_id: string;
    student_id: string;
    completed: boolean;
    enabled: boolean;
    title: string;
    content: string;
    reference: string;
    serial_number: number;
  };
  message: string;
};
export type QuizQuestons = {
  success: boolean;
  message: string;
  quiz_id: string;
  questions: {
    serial_number: number;
    question_id: string;
    question: string;
  }[];
};

export type SubmissionReponse = {
  success: boolean;
  message: string;
  data: {
    obtained_marks: number;
    total_marks: number;
    percentage: number;
    status: string;
  };
};
export interface ReportResult {
  attempt_number: number;
  obtained_marks: number;
  total_marks: number;
  status: string;
  percentage: number;
}

export interface ReportItem {
  id: string;
  learning_path_title: string;
  content_title: string;
  results: ReportResult[];
}

export interface ReportResponse {
  success: boolean;
  message: string;
  report: ReportItem[];
}

export type ResourceType = "Skills" | "Welfare";

export interface Resources {
  success: boolean;
  message: string;
  resources: {
    id: string;
    title: string;
    description: string;
    type: ResourceType;
    website: string;
  };
}

export type StudentData = {
  username: string;
  first_name?: string;
  last_name?: string;
  date_joined: string;
  email: string;
  type: string;
  invited_by: string;
  id: string;
};
export interface Student {
  success: boolean;
  message: string;
  students: StudentData[];
}
