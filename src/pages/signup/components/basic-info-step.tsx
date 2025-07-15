import type { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InfoDisplayLayout from '@components/layout/info-display-layout';
import FormField from '@components/fields/form-field';
import Input from '@components/fields/input';
import type { SignupFormValues } from '../schema/signup';

interface BasicInfoStepProps {
  errors: FieldErrors<SignupFormValues>;
  register: UseFormRegister<SignupFormValues>;
  watch: UseFormWatch<SignupFormValues>;
  className?: string;
}

const BasicInfoStep = ({ errors, register, watch, className }: BasicInfoStepProps) => {
  return (
    <fieldset className={className}>
      <InfoDisplayLayout title="기본 정보">
        <div className="space-y-4">
          {/* TODO: Required props 및 UI 추가 */}
          <FormField label={{ id: 'signup-id', content: 'ID' }} error={errors.id}>
            <Input id="signup-id" value={watch('id')} aria-required="true" {...register('id')} />
          </FormField>
          <FormField label={{ id: 'signup-password', content: 'PW' }} error={errors.password}>
            <Input
              id="signup-password"
              type="password"
              value={watch('password')}
              aria-required="true"
              {...register('password')}
            />
          </FormField>
          <FormField label={{ id: 'signup-email', content: 'EMAIL' }} error={errors.email}>
            <Input id="signup-email" type="email" value={watch('email')} aria-required="true" {...register('email')} />
          </FormField>
          <FormField label={{ id: 'signup-phone', content: 'PHONE' }} error={errors.phone}>
            <Input id="signup-phone" type="tel" value={watch('phone')} aria-required="true" {...register('phone')} />
          </FormField>
        </div>
      </InfoDisplayLayout>
    </fieldset>
  );
};

export default BasicInfoStep;
