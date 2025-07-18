import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import StepIndicator from '@components/form/step-indicator';
import {
  type FieldValues,
  type UseFormTrigger,
  type UseFormHandleSubmit,
  type Path,
  type UseFormWatch,
} from 'react-hook-form';
import StepButtons from './step-buttons';
import { useSignupStore } from '../../stores/signup-store';

interface StepFormProps<T extends FieldValues = FieldValues> {
  content: ReactNode[];
  fieldsToValidateByStep?: Array<Array<Path<T>>>;
  submitButtonText?: string;
  cancelButtonText?: string;
  nextButtonText?: string;
  prevButtonText?: string;
  trigger: UseFormTrigger<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: (formData: T) => void;
  onCancel?: () => void;
  watch: UseFormWatch<T>;
}

function StepForm<T extends FieldValues = FieldValues>({
  content,
  fieldsToValidateByStep,
  submitButtonText = '완료',
  cancelButtonText = '취소',
  nextButtonText = '다음',
  prevButtonText = '이전',
  trigger,
  handleSubmit,
  onSubmit,
  onCancel,
  watch,
}: StepFormProps<T>) {
  const { setSignupData, setCurrentStep, currentStep, clearSignupData } = useSignupStore();
  const [stepIndex, setStepIndex] = useState(currentStep || 0);
  const isLastStep = stepIndex + 1 === content.length;

  const handleNext = async () => {
    if (fieldsToValidateByStep && fieldsToValidateByStep[stepIndex]) {
      const isStepValid = await trigger(fieldsToValidateByStep[stepIndex]);
      if (isStepValid) {
        const currentValues = watch();
        setSignupData(currentValues);
        setStepIndex((prev: number) => prev + 1);
      }
    } else {
      const currentValues = watch();
      setSignupData(currentValues);
      setStepIndex((prev: number) => prev + 1);
    }
  };

  const handlePrev = () => {
    const currentValues = watch();
    setSignupData(currentValues);
    setStepIndex((prev: number) => prev - 1);
  };

  const handleFormSubmit = handleSubmit(data => {
    if (isLastStep) {
      onSubmit(data);
      // 제출 후 데이터 초기화
      clearSignupData();
    } else {
      handleNext();
    }
  });

  const handleCancel = () => {
    clearSignupData();
    if (onCancel) onCancel();
  };

  useEffect(() => {
    setCurrentStep(stepIndex);
  }, [stepIndex, setCurrentStep]);

  return (
    <section>
      <div className="mb-8">
        <StepIndicator currentStep={stepIndex} totalSteps={content.length} />
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="rounded-lg bg-cream p-6">{content[stepIndex]}</div>
        <StepButtons
          stepIndex={stepIndex}
          prevButtonText={prevButtonText}
          cancelButtonText={cancelButtonText}
          isLastStep={isLastStep}
          submitButtonText={submitButtonText}
          nextButtonText={nextButtonText}
          handlePrev={handlePrev}
          onCancel={handleCancel}
        />
      </form>
    </section>
  );
}

export default StepForm;
