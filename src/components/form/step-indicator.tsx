interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const StepIndicator = ({ currentStep, totalSteps, className = '' }: StepIndicatorProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-label="단계 진행 상황">
      <ol className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <li key={`step-${index}`} className="flex items-center">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= index ? 'bg-forest text-white' : 'bg-cream text-khaki'
              }`}
            >
              {index + 1}
            </span>
            {index < totalSteps - 1 && (
              <span className={`h-1 w-16 ${currentStep >= index + 1 ? 'bg-forest' : 'bg-cream'}`} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StepIndicator;
