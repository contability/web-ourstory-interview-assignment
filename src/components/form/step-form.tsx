import { useState } from 'react';
import type { ReactNode } from 'react';
import StepIndicator from '@components/form/step-indicator';
import { type FieldValues, type UseFormTrigger, type UseFormHandleSubmit } from 'react-hook-form';

interface StepFormProps<T extends FieldValues = FieldValues> {
  content: Array<ReactNode>;
  fieldsToValidateByStep?: Array<Array<keyof T | string>>;
  submitButtonText?: string;
  cancelButtonText?: string;
  nextButtonText?: string;
  prevButtonText?: string;
  trigger: UseFormTrigger<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: (formData: T) => void;
  onCancel?: () => void;
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
}: StepFormProps<T>) {
  const [stepIndex, setStepIndex] = useState(0);

  const handleNext = async () => {
    if (fieldsToValidateByStep && fieldsToValidateByStep[stepIndex]) {
      const isStepValid = await trigger(fieldsToValidateByStep[stepIndex] as any);
      if (isStepValid) setStepIndex(prev => prev + 1);
    } else {
      setStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setStepIndex(prev => prev - 1);
  };

  return (
    <section>
      <div className="mb-8">
        <StepIndicator currentStep={stepIndex} totalSteps={content.length} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-lg bg-cream p-6">{content[stepIndex]}</div>

        <div className="mt-8 flex justify-between">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-full border border-forest px-6 py-2 text-forest transition-colors hover:bg-cream"
            >
              {prevButtonText}
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-forest px-6 py-2 text-forest transition-colors hover:bg-cream"
            >
              {cancelButtonText}
            </button>
          )}

          {stepIndex + 1 < content.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-forest px-6 py-2 text-white transition-colors hover:bg-olive"
            >
              {nextButtonText}
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-full bg-forest px-6 py-2 text-white transition-colors hover:bg-olive"
            >
              {submitButtonText}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default StepForm;
