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