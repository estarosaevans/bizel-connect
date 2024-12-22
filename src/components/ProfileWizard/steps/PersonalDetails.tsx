import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PersonalDetailsProps {
  data: {
    fullName: string;
    position: string;
    organization: string;
    bio: string;
    profilePicture: File | null;
  };
  updateData: (data: Partial<PersonalDetailsProps["data"]>) => void;
}

export const PersonalDetails = ({ data, updateData }: PersonalDetailsProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData({ profilePicture: e.target.files[0] });
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
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={data.position}
            onChange={(e) => updateData({ position: e.target.value })}
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            value={data.organization}
            onChange={(e) => updateData({ organization: e.target.value })}
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={data.bio}
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