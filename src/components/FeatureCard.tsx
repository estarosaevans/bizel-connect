import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  step?: number;
}

export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  step,
}: FeatureCardProps) => {
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border border-gray-200">
      {step && (
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-primary-600 font-semibold">{step}</span>
        </div>
      )}
      <CardHeader className="space-y-1">
        <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};