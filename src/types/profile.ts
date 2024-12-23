import type { Database } from "@/integrations/supabase/types";
import type { Json } from "@/integrations/supabase/types";

export type Profile = Database['public']['Tables']['profiles']['Insert'];

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

// Make sure ProfileFormData extends Profile but overrides specific fields
export interface ProfileFormData extends Omit<Profile, 'experiences' | 'education'> {
  experiences: Experience[];
  education: Education[];
}

// Type guard to check if a JSON object is an Experience
const isExperience = (json: Json): json is Experience => {
  if (typeof json !== 'object' || json === null) return false;
  const exp = json as Record<string, unknown>;
  return typeof exp.title === 'string' &&
    typeof exp.company === 'string' &&
    typeof exp.startDate === 'string' &&
    typeof exp.endDate === 'string' &&
    typeof exp.description === 'string';
};

// Type guard to check if a JSON object is an Education
const isEducation = (json: Json): json is Education => {
  if (typeof json !== 'object' || json === null) return false;
  const edu = json as Record<string, unknown>;
  return typeof edu.degree === 'string' &&
    typeof edu.institution === 'string' &&
    typeof edu.year === 'string';
};

// Helper function to convert Experience[] to Json[]
const serializeExperiences = (experiences: Experience[]): Json[] => {
  return experiences.map(exp => ({
    title: exp.title,
    company: exp.company,
    startDate: exp.startDate,
    endDate: exp.endDate,
    description: exp.description
  }));
};

// Helper function to convert Education[] to Json[]
const serializeEducation = (education: Education[]): Json[] => {
  return education.map(edu => ({
    degree: edu.degree,
    institution: edu.institution,
    year: edu.year
  }));
};

// Helper function to safely convert Json[] to Experience[]
const deserializeExperiences = (json: Json[] | null): Experience[] => {
  if (!json) return [];
  return json.filter(isExperience);
};

// Helper function to safely convert Json[] to Education[]
const deserializeEducation = (json: Json[] | null): Education[] => {
  if (!json) return [];
  return json.filter(isEducation);
};

// Helper function to convert form data to database format
export const serializeFormData = (formData: ProfileFormData): Profile => {
  return {
    ...formData,
    experiences: serializeExperiences(formData.experiences),
    education: serializeEducation(formData.education),
  };
};

// Helper function to convert database format to form data
export const deserializeProfileData = (profile: Profile): ProfileFormData => {
  return {
    ...profile,
    experiences: deserializeExperiences(profile.experiences),
    education: deserializeEducation(profile.education),
  };
};