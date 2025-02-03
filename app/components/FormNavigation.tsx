import { Button } from "@/app/components/ui/button";

interface FormNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  back: () => void;
  isSubmitting: boolean;
}

export function FormNavigation({
  isFirstStep,
  isLastStep,
  back,
  isSubmitting,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between w-full">
      {!isFirstStep && (
        <Button type="button" variant="outline" onClick={back}>
          Back
        </Button>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : isLastStep ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
