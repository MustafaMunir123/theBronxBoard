export type ResourceType = "Skills" | "Welfare";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  website: string;
}
