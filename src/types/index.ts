export interface Talent {
  _id: string;
  name: string;
  email: string;
  skills: string[];
  experience: number;
  createdAt: string;
}

export interface TalentFormData {
  name: string;
  email: string;
  skills: string;
  experience: string;
}

export interface TalentsState {
  items: Talent[];
  loading: boolean;
  error: string | null;
}