"use client";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import MultiStepFormOne from "./MultiStepOne";
import MultiStepFormTwo from "./MultiStepFormTwo";
import { useCreateForm } from "@/apis/workers";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export interface UUID {
  uuid?: string;
}

export interface GeneralDetails {
  familyId: string;
  cohort: string;
  firstName: string;
  lastName: string;
  dob: any;
  age: string;
  gender: string;
  state: string;
}

export interface VaccinationDetails {
  vaccinationStatus: string;
  height: string;
  weightKg: string;
  weightGrams: string;
  bmi: string;
  nutritionStatus: string;
  enrolledFeedingProgram: boolean;
}

export type FormData = GeneralDetails & VaccinationDetails & UUID;

const steps = ["General Details", "Vaccination & Nutrition"];

const MultiStepForm: React.FC = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    familyId: "",
    cohort: "",
    firstName: "",
    lastName: "",
    dob: null,
    age: "",
    gender: "",
    state: "",
    vaccinationStatus: "",
    height: "",
    weightKg: "",
    weightGrams: "0",
    bmi: "",
    nutritionStatus: "",
    enrolledFeedingProgram: false,
  });

  const { mutate, isPending } = useCreateForm();

  const handleNext = (stepData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setActiveStep((prev) => prev + 1);
  };

  const handleSubmit = (finalData: Partial<FormData>) => {
    const fullData = {
      ...formData,
      ...finalData,
      state: formData.state.toLowerCase(),
    };

    mutate(fullData, {
      onSuccess: () => {
        router.replace("/form-submit");
      },
    });
  };

  const handleSaveDraft = (finalData: Partial<FormData>) => {
    const fullData = { ...formData, ...finalData, uuid: uuidv4() };

    // Get existing drafts array from localStorage or initialize a new one
    const existingDrafts = JSON.parse(
      localStorage.getItem("formDrafts") || "[]"
    );

    // Append the new draft
    const updatedDrafts = [...existingDrafts, fullData];

    // Save updated drafts array to localStorage
    localStorage.setItem("formDrafts", JSON.stringify(updatedDrafts));

    router.replace("/form-sync");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 700, mx: "auto", py: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === 0 && (
          <MultiStepFormOne data={formData} onNext={handleNext} />
        )}
        {activeStep === 1 && (
          <MultiStepFormTwo
            isPending={isPending}
            data={formData}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
          />
        )}
      </Box>
    </Box>
  );
};

export default MultiStepForm;
