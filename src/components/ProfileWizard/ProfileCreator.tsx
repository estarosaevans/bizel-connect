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
import { ProfileFormData, serializeFormData } from "@/types/profile";

const TOTAL_STEPS = 4;

interface ProfileCreatorProps {
  onComplete?: () => void | Promise<void>;
}

export const ProfileCreator = ({ onComplete }: ProfileCreatorProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProfileFormData>({
    // Personal Details
    full_name: "",
    position: "",
    organization: "",
    bio: "",
    profile_picture_url: null,
    
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
    skills: [],
    interests: [],
    experiences: [],
    education: [],
    
    // Required field
    user_id: "",
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      let profilePictureUrl = "";
      
      // Upload profile picture if exists
      if (formData.profile_picture_url) {
        const file = formData.profile_picture_url as unknown as File;
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('profile-pictures')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(fileName);
          
        profilePictureUrl = publicUrl;
      }

      // Convert form data to database format
      const profileData = serializeFormData({
        ...formData,
        user_id: user.id,
        profile_picture_url: profilePictureUrl || null,
      });
      
      const { error } = await supabase
        .from('profiles')
        .insert(profileData);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your profile has been created successfully.",
      });

      // Call onComplete callback if provided
      if (onComplete) {
        await onComplete();
      }

      // Navigate to dashboard after successful completion
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

  const updateFormData = (data: Partial<ProfileFormData>) => {
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