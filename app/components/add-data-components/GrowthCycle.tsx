import { useFormContext } from "react-hook-form";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Input } from "@/app/components/ui/input";

export function GrowthCycle() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Growth Cycle</h2>
      <div className="space-y-2">
        <Label htmlFor="growthStages">
          Describe the growth stages of this crop
        </Label>
        <Textarea id="growthStages" {...register("growthStages")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="growthDuration">
          How long does it take from planting to harvest under optimal
          conditions? (in days)
        </Label>
        <Input
          type="number"
          id="growthDuration"
          {...register("growthDuration", { valueAsNumber: true })}
        />
      </div>
    </div>
  );
}
