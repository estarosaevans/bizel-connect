import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialLinksProps {
  data: {
    linkedin: string;
    tiktok: string;
    twitter: string;
    facebook: string;
    youtube: string;
    website: string;
  };
  updateData: (data: Partial<SocialLinksProps["data"]>) => void;
}

export const SocialLinks = ({ data, updateData }: SocialLinksProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
        <p className="text-gray-600 mb-6">
          Connect your social media profiles
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => updateData({ linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <Label htmlFor="tiktok">TikTok</Label>
          <Input
            id="tiktok"
            value={data.tiktok}
            onChange={(e) => updateData({ tiktok: e.target.value })}
            placeholder="@username"
          />
        </div>

        <div>
          <Label htmlFor="twitter">Twitter</Label>
          <Input
            id="twitter"
            value={data.twitter}
            onChange={(e) => updateData({ twitter: e.target.value })}
            placeholder="@username"
          />
        </div>

        <div>
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            value={data.facebook}
            onChange={(e) => updateData({ facebook: e.target.value })}
            placeholder="https://facebook.com/username"
          />
        </div>

        <div>
          <Label htmlFor="youtube">YouTube</Label>
          <Input
            id="youtube"
            value={data.youtube}
            onChange={(e) => updateData({ youtube: e.target.value })}
            placeholder="https://youtube.com/@username"
          />
        </div>

        <div>
          <Label htmlFor="website">Personal Website</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => updateData({ website: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
      </div>
    </div>
  );
};