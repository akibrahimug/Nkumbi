import { useFormContext } from "react-hook-form";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

export function YieldAndQuality() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Yield and Quality</h2>
      <div className="space-y-2">
        <Label htmlFor="expectedYield">
          What is the expected yield per acre under standard conditions?
        </Label>
        <Input id="expectedYield" {...register("expectedYield")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="qualityIndicators">
          How can farmers ensure the highest quality produce?
        </Label>
        <Textarea id="qualityIndicators" {...register("qualityIndicators")} />
      </div>
    </div>
  );
}
