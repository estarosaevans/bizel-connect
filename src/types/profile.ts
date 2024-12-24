import type { Database } from "@/integrations/supabase/types";
import type { Json } from "@/integrations/supabase/types";

export type Profile = Database['public']['Tables']['profiles']['Insert'];

// Base types with index signatures for JSON compatibility
export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  [key: string]: Json;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  [key: string]: Json;
}

// Form data type that extends Profile but with strongly typed arrays
export interface ProfileFormData extends Omit<Profile, 'experiences' | 'education'> {
  experiences: Experience[];
  education: Education[];
}

// Type guard to check if an unknown value matches Experience shape
const isExperience = (value: unknown): value is Experience => {
  if (typeof value !== 'object' || value === null) return false;
  const exp = value as Record<string, unknown>;
  return typeof exp.title === 'string' &&
    typeof exp.company === 'string' &&
    typeof exp.startDate === 'string' &&
    typeof exp.endDate === 'string' &&
    typeof exp.description === 'string';
};

// Type guard to check if an unknown value matches Education shape
const isEducation = (value: unknown): value is Education => {
  if (typeof value !== 'object' || value === null) return false;
  const edu = value as Record<string, unknown>;
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
  })) as unknown as Json[];
};

// Helper function to convert Education[] to Json[]
const serializeEducation = (education: Education[]): Json[] => {
  return education.map(edu => ({
    degree: edu.degree,
    institution: edu.institution,
    year: edu.year
  })) as unknown as Json[];
};

// Helper function to safely convert Json[] to Experience[]
const deserializeExperiences = (json: Json[] | null): Experience[] => {
  if (!json) return [];
  return (json as unknown[]).filter((item): item is Experience => {
    if (typeof item !== 'object' || item === null) return false;
    return isExperience(item);
  });
};

// Helper function to safely convert Json[] to Education[]
const deserializeEducation = (json: Json[] | null): Education[] => {
  if (!json) return [];
  return (json as unknown[]).filter((item): item is Education => {
    if (typeof item !== 'object' || item === null) return false;
    return isEducation(item);
  });
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