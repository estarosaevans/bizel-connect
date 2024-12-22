import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PersonalDetails } from "./steps/PersonalDetails";
import { ContactInformation } from "./steps/ContactInformation";
import { SocialLinks } from "./steps/SocialLinks";
import { ProfessionalDetails } from "./steps/ProfessionalDetails";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TOTAL_STEPS = 4;

export const ProfileCreator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    position: "",
    organization: "",
    bio: "",
    profilePicture: null as File | null,
    
    // Contact Information
    phone: "",
    email: "",
    whatsapp: "",
    telegram: "",
    
    // Social Links
    linkedin: "",
    tiktok: "",
    twitter: "",
    facebook: "",
    youtube: "",
    website: "",
    
    // Professional Details
    skills: [] as string[],
    interests: [] as string[],
    experiences: [] as Array<{
      title: string;
      company: string;
      startDate: string;
      endDate: string;
      description: string;
    }>,
    education: [] as Array<{
      degree: string;
      institution: string;
      year: string;
    }>,
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = async () => {
    try {
      let profilePictureUrl = "";
      
      // Upload profile picture if exists
      if (formData.profilePicture) {
        const fileExt = formData.profilePicture.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('profile-pictures')
          .upload(fileName, formData.profilePicture);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(fileName);
          
        profilePictureUrl = publicUrl;
      }
      
      const { error } = await supabase.from('profiles').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        full_name: formData.fullName,
        position: formData.position,
        organization: formData.organization,
        bio: formData.bio,
        profile_picture_url: profilePictureUrl,
        phone: formData.phone,
        email: formData.email,
        whatsapp: formData.whatsapp,
        telegram: formData.telegram,
        linkedin: formData.linkedin,
        tiktok: formData.tiktok,
        twitter: formData.twitter,
        facebook: formData.facebook,
        youtube: formData.youtube,
        website: formData.website,
        skills: formData.skills,
        interests: formData.interests,
        experiences: formData.experiences,
        education: formData.education,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your profile has been created successfully.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Create Your Profile</h1>
        <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
        <p className="text-sm text-gray-600 mt-2">Step {currentStep} of {TOTAL_STEPS}</p>
      </div>

      <Card className="p-6">
        {currentStep === 1 && (
          <PersonalDetails
            data={formData}
            updateData={updateFormData}
          />
        )}
        {currentStep === 2 && (
          <ContactInformation
            data={formData}
            updateData={updateFormData}
          />
        )}
        {currentStep === 3 && (
          <SocialLinks
            data={formData}
            updateData={updateFormData}
          />
        )}
        {currentStep === 4 && (
          <ProfessionalDetails
            data={formData}
            updateData={updateFormData}
          />
        )}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <div className="space-x-2">
            <Button
              variant="ghost"
              onClick={handleSkip}
              disabled={currentStep === TOTAL_STEPS}
            >
              Skip
            </Button>
            {currentStep === TOTAL_STEPS ? (
              <Button onClick={handleSubmit}>
                Complete
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};