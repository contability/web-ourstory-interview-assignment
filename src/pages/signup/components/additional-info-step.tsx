import type { Control, FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InfoDisplayLayout from '@components/layout/info-display-layout';
import FormField from '@components/fields/form-field';
import Input from '@components/fields/input';
import type { SignupFormValues } from '../schema/signup';
import RadioGroup from '@components/fields/radio-group';
import { GENDER_OPTIONS } from 'constants/signup-form';
import DayPickerInput from '@components/fields/day-picker-input';

interface AdditionalInfoStepProps {
  errors: FieldErrors<SignupFormValues>;
  register: UseFormRegister<SignupFormValues>;
  watch: UseFormWatch<SignupFormValues>;
  control?: Control<SignupFormValues>;
  className?: string;
}

const AdditionalInfoStep = ({ errors, register, watch, control, className }: AdditionalInfoStepProps) => {
  return (
    <fieldset className={className}>
      <InfoDisplayLayout title="추가 정보">
        <div className="space-y-4">
          <FormField label={{ id: 'signup-birthday', content: 'BIRTH' }} error={errors.birthday}>
            {/* <Input id="signup-birthday" type="date" value={watch('birthday')} {...register('birthday')} /> */}
            <DayPickerInput control={control} name="birthday" />
          </FormField>
          <FormField label={{ content: 'GENDER' }} error={errors.gender}>
            <RadioGroup optionList={GENDER_OPTIONS} name="gender" control={control} />
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
