import { useFormContext } from "react-hook-form";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

export function SustainabilityPractices() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Sustainability Practices</h2>
      <div className="space-y-2">
        <Label htmlFor="cropRotation">
          What crops should follow this one in rotation?
        </Label>
        <Textarea id="cropRotation" {...register("cropRotation")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="organicFarming">
          What organic practices work best for this crop?
        </Label>
        <Textarea id="organicFarming" {...register("organicFarming")} />
      </div>
    </div>
  );
}
