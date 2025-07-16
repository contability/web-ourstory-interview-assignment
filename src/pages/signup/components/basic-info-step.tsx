import type { Control, FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InfoDisplayLayout from '@components/layout/info-display-layout';
import FormField from '@components/fields/form-field';
import Input from '@components/fields/input';
import type { SignupFormValues } from '../schema/signup';
import Select from '@components/fields/select';
import { COUNTRY_CODES } from 'constants/signup-form';

interface BasicInfoStepProps {
  errors: FieldErrors<SignupFormValues>;
  register: UseFormRegister<SignupFormValues>;
  watch: UseFormWatch<SignupFormValues>;
  control?: Control<SignupFormValues>;
  className?: string;
}

const BasicInfoStep = ({ errors, register, watch, control, className }: BasicInfoStepProps) => {
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
          <FormField label={{ id: 'signup-phone', content: 'PHONE' }} error={errors.phone || errors.countryCode}>
            <div className="flex w-full gap-2">
              <div className="w-1/3 md:w-1/4">
                <Select optionList={COUNTRY_CODES} control={control} name="countryCode" />
              </div>
              <div className="flex-1">
                <Input
                  id="signup-phone"
                  type="tel"
                  value={watch('phone')}
                  aria-required="true"
                  placeholder="전화번호 (숫자만 입력)"
                  {...register('phone')}
                />
              </div>
            </div>
          </FormField>
        </div>
      </InfoDisplayLayout>
    </fieldset>
  );
};

export default BasicInfoStep;
