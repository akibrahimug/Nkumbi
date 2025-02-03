import { useFormContext } from "react-hook-form";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

export function Harvesting() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Harvesting</h2>
      <div className="space-y-2">
        <Label htmlFor="harvestSigns">
          What are the signs that this crop is ready to harvest?
        </Label>
        <Textarea id="harvestSigns" {...register("harvestSigns")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="harvestPractices">
          What are the best harvesting practices?
        </Label>
        <Textarea id="harvestPractices" {...register("harvestPractices")} />
      </div>
    </div>
  );
}
