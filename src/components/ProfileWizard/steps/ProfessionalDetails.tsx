import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface ProfessionalDetailsProps {
  data: {
    skills: string[];
    interests: string[];
    experiences: Array<{
      title: string;
      company: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
  };
  updateData: (data: Partial<ProfessionalDetailsProps["data"]>) => void;
}

export const ProfessionalDetails = ({ data, updateData }: ProfessionalDetailsProps) => {
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const addSkill = () => {
    if (newSkill.trim()) {
      updateData({ skills: [...data.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    updateData({
      skills: data.skills.filter((_, i) => i !== index),
    });
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      updateData({ interests: [...data.interests, newInterest.trim()] });
      setNewInterest("");
    }
  };

  const removeInterest = (index: number) => {
    updateData({
      interests: data.interests.filter((_, i) => i !== index),
    });
  };

  const addExperience = () => {
    updateData({
      experiences: [
        ...data.experiences,
        {
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperiences = [...data.experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value,
    };
    updateData({ experiences: newExperiences });
  };

  const removeExperience = (index: number) => {
    updateData({
      experiences: data.experiences.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    updateData({
      education: [
        ...data.education,
        {
          degree: "",
          institution: "",
          year: "",
        },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...data.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    updateData({ education: newEducation });
  };

  const removeEducation = (index: number) => {
    updateData({
      education: data.education.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Professional Details</h2>
        <p className="text-gray-600 mb-6">
          Tell us about your professional background
        </p>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <Label>Skills</Label>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
          />
          <Button type="button" onClick={addSkill} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="hover:text-primary-700"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-4">
        <Label>Interests</Label>
        <div className="flex gap-2">
          <Input
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add an interest"
            onKeyPress={(e) => e.key === "Enter" && addInterest()}
          />
          <Button type="button" onClick={addInterest} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.interests.map((interest, index) => (
            <span
              key={index}
              className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {interest}
              <button
                onClick={() => removeInterest(index)}
                className="hover:text-primary-700"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Experience</Label>
          <Button type="button" onClick={addExperience} variant="outline" size="sm">
            Add Experience
          </Button>
        </div>
        <div className="space-y-4">
          {data.experiences.map((exp, index) => (
            <Card key={index} className="p-4 relative">
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(index, "title", e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Brief description of your role"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Education</Label>
          <Button type="button" onClick={addEducation} variant="outline" size="sm">
            Add Education
          </Button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <Card key={index} className="p-4 relative">
              <button
                onClick={() => removeEducation(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="space-y-4">
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="Degree / Certificate"
                  />
                </div>
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="School / University"
                  />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => updateEducation(index, "year", e.target.value)}
                    placeholder="Graduation Year"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};