interface Reference {
  title: string;
  type: "article" | "video" | "website";
  url: string;
  description: string;
}

interface Section {
  title: string;
  content: string[];
  image?: string;
  isCompleted?: boolean;
}
export interface Material {
  title: string;
  description?: string;
  sections: {
    title: string;
    content: string[];
    image?: string;
    completed: boolean;
  }[];
  reference?: string;
}
