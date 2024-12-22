import type { Database } from "@/integrations/supabase/types";

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

export interface ProfileFormData extends Omit<Profile, 'experiences' | 'education'> {
  experiences: Experience[];
  education: Education[];
}

// Helper functions to convert between form data and database types
export const serializeFormData = (formData: ProfileFormData): Profile => {
  return {
    ...formData,
    experiences: formData.experiences as unknown as Json[],
    education: formData.education as unknown as Json[],
  };
};

export const deserializeProfileData = (profile: Profile): ProfileFormData => {
  return {
    ...profile,
    experiences: (profile.experiences || []) as unknown as Experience[],
    education: (profile.education || []) as unknown as Education[],
  };
};