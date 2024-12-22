import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Insert'];

interface ContactInformationProps {
  data: Profile;
  updateData: (data: Partial<Profile>) => void;
}

export const ContactInformation = ({ data, updateData }: ContactInformationProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-600 mb-6">
          How can people reach you?
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={data.phone || ""}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email || ""}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            value={data.whatsapp || ""}
            onChange={(e) => updateData({ whatsapp: e.target.value })}
            placeholder="WhatsApp number or username"
          />
        </div>

        <div>
          <Label htmlFor="telegram">Telegram</Label>
          <Input
            id="telegram"
            value={data.telegram || ""}
            onChange={(e) => updateData({ telegram: e.target.value })}
            placeholder="Telegram username"
          />
        </div>
      </div>
    </div>
  );
};