import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProfileFormData } from "@/types/profile";

interface PersonalDetailsProps {
  data: ProfileFormData;
  updateData: (data: Partial<ProfileFormData>) => void;
}

export const PersonalDetails = ({ data, updateData }: PersonalDetailsProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData({ profile_picture_url: e.target.files[0] as unknown as string });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
        <p className="text-gray-600 mb-6">
          Let's start with your basic information
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={data.full_name || ""}
            onChange={(e) => updateData({ full_name: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={data.position || ""}
            onChange={(e) => updateData({ position: e.target.value })}
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            value={data.organization || ""}
            onChange={(e) => updateData({ organization: e.target.value })}
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={data.bio || ""}
            onChange={(e) => updateData({ bio: e.target.value })}
            placeholder="Tell us about yourself..."
            className="h-32"
          />
        </div>

        <div>
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <Input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};