interface StepButtonsProps {
  stepIndex: number;
  prevButtonText: string;
  cancelButtonText: string;
  isLastStep: boolean;
  submitButtonText: string;
  nextButtonText: string;
  handlePrev: () => void;
  onCancel?: () => void;
}

const StepButtons = ({
  stepIndex,
  prevButtonText,
  cancelButtonText,
  isLastStep,
  submitButtonText,
  nextButtonText,
  handlePrev,
  onCancel,
}: StepButtonsProps) => {
  return (
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
      <button type="submit" className="rounded-full bg-forest px-6 py-2 text-white transition-colors hover:bg-olive">
        {isLastStep ? submitButtonText : nextButtonText}
      </button>
    </div>
  );
};

export default StepButtons;
