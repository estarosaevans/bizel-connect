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

// Helper function to convert form data to database format
export const serializeFormData = (formData: ProfileFormData): Profile => {
  return {
    ...formData,
    experiences: serializeExperiences(formData.experiences) as Json[],
    education: serializeEducation(formData.education) as Json[],
  };
};

// Helper function to convert database format to form data
export const deserializeProfileData = (profile: Profile): ProfileFormData => {
  return {
    ...profile,
    experiences: (profile.experiences || []) as Experience[],
    education: (profile.education || []) as Education[],
  };
};