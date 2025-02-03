import { Progress } from "@/app/components/ui/progress";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-muted-foreground mt-2">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
