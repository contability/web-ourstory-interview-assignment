import type { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InfoDisplayLayout from '@components/layout/info-display-layout';
import FormField from '@components/fields/form-field';
import Input from '@components/fields/input';
import type { SignupFormValues } from '../schema/signup';

interface AdditionalInfoStepProps {
  errors: FieldErrors<SignupFormValues>;
  register: UseFormRegister<SignupFormValues>;
  watch: UseFormWatch<SignupFormValues>;
  className?: string;
}

const AdditionalInfoStep = ({ errors, register, watch, className }: AdditionalInfoStepProps) => {
  return (
    <fieldset className={className}>
      <InfoDisplayLayout title="추가 정보">
        <div className="space-y-4">
          <FormField label={{ id: 'signup-birthday', content: 'BIRTH' }} error={errors.birthday}>
            <Input id="signup-birthday" type="date" value={watch('birthday')} {...register('birthday')} />
          </FormField>
          <FormField label={{ id: 'signup-gender', content: 'GENDER' }} error={errors.gender}>
            <Input id="signup-gender" value={watch('gender')} {...register('gender')} />
          </FormField>
          <FormField label={{ id: 'signup-name', content: 'NAME' }} error={errors.name}>
            <Input id="signup-name" value={watch('name')} {...register('name')} />
          </FormField>
          <FormField label={{ id: 'signup-nickName', content: 'NICK' }} error={errors.nickName}>
            <Input id="signup-nickName" value={watch('nickName')} {...register('nickName')} />
          </FormField>
        </div>
      </InfoDisplayLayout>
    </fieldset>
  );
};

export default AdditionalInfoStep;
