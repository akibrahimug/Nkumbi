"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CropInformation } from "@/app/components/add-data-components/CropInformation";
import { PlantingGuide } from "@/app/components/add-data-components/PlantingGuide";
import { GrowthCycle } from "@/app/components/add-data-components/GrowthCycle";
import { Watering } from "@/app/components/add-data-components/Watering";
import { Fertilization } from "@/app/components/add-data-components/Fertilization";
import { Harvesting } from "@/app/components/add-data-components/Harvesting";
import { PestAndDiseaseManagement } from "@/app/components/add-data-components/PestAndDiseaseManagement";
import { EnvironmentalAdaptations } from "@/app/components/add-data-components/EnvironmentalAdaptations";
import { YieldAndQuality } from "@/app/components/add-data-components/YieldAndQuality";
import { MarketInformation } from "@/app/components/add-data-components/MarketInformation";
import { SustainabilityPractices } from "@/app/components/add-data-components/SustainabilityPractices";
import { ProgressIndicator } from "./ProgressIndicator";
import { FormNavigation } from "./FormNavigation";

const TOTAL_STEPS = 11;

export function ExpertApplicationForm() {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const {
    currentStepIndex,
    step,
    steps,
    isFirstStep,
    isLastStep,
    goTo,
    next,
    back,
  } = useMultiStepForm(TOTAL_STEPS);
  const [formData, setFormData] = useState({});

  const onSubmit = async (data: any) => {
    if (isLastStep) {
      // Submit the form data to your backend here
      console.log("Form submitted:", { ...formData, ...data });
      // You can add API call here to send data to the backend
    } else {
      setFormData((prevData) => ({ ...prevData, ...data }));
      next();
    }
  };

  const stepComponents = [
    <CropInformation key="crop-info" />,
    <PlantingGuide key="planting-guide" />,
    <GrowthCycle key="growth-cycle" />,
    <Watering key="watering" />,
    <Fertilization key="fertilization" />,
    <Harvesting key="harvesting" />,
    <PestAndDiseaseManagement key="pest-disease" />,
    <EnvironmentalAdaptations key="environmental" />,
    <YieldAndQuality key="yield-quality" />,
    <MarketInformation key="market-info" />,
    <SustainabilityPractices key="sustainability" />,
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Expert Application Form</CardTitle>
            <ProgressIndicator currentStep={step} totalSteps={steps} />
          </CardHeader>
          <CardContent>{stepComponents[currentStepIndex]}</CardContent>
          <CardFooter>
            <FormNavigation
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              back={back}
              isSubmitting={isSubmitting}
            />
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
