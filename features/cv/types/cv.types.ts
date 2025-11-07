// Types pour le module CV
export type PersonalDetails = {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  photoUrl?: string;
  description?: string;
  postSeeking?: string;
};

export type Experience = {
  id?: string;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  id?: string;
  school: string;
  degree: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type Skill = {
  id?: string;
  name: string;
};

export type Language = {
  id?: string;
  language: string;
  proficiency: "Débutant" | "Intermédiaire" | "Avancé";
};

export type Hobby = {
  id?: string;
  name: string;
};

export type CVData = {
  id?: string;
  title: string;
  personalDetails: PersonalDetails;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
  hobbies: Hobby[];
  theme: string;
  template: string;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CVTemplate = "classic" | "modern" | "premium" | "creative";

export type CVTheme = string;
