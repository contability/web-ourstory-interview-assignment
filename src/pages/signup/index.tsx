import Heading from '@components/typography/heading';
import StepForm from '@components/form/step-form';
import BasicInfoStep from './components/basic-info-step';
import AdditionalInfoStep from './components/additional-info-step';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema } from './schema/signup';
import type { SignupFormValues } from './schema/signup';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    control,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      id: '',
      password: '',
      email: '',
      countryCode: '',
      phone: '',
      birthday: '',
      gender: '',
      name: '',
      nickName: '',
    },
    mode: 'onSubmit',
  });

  const handleSignupComplete = (formData: SignupFormValues) => {
    // TODO: 모달 처리
    console.log('회원가입 데이터:', formData);
  };

  return (
    <main className="flex h-dvh flex-col items-center justify-center px-4 py-12">
      <article className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-md md:p-12">
        <header className="mb-8">
          <Heading level="h1" className="md:mb-4 lg:mb-4">
            회원가입
          </Heading>
          <div className="mx-auto h-1 w-24 bg-mustard" role="presentation" />
        </header>

        <div className="p-6">
          <StepForm
            content={[
              <BasicInfoStep key="basic-info" register={register} watch={watch} errors={errors} control={control} />,
              <AdditionalInfoStep key="additional-info" register={register} watch={watch} errors={errors} />,
            ]}
            fieldsToValidateByStep={[
              ['id', 'password', 'email', 'countryCode', 'phone'],
              ['birthday', 'gender', 'name', 'nickName'],
            ]}
            submitButtonText="가입 완료"
            trigger={trigger}
            onSubmit={handleSignupComplete}
            handleSubmit={handleSubmit}
            onCancel={() => navigate('/')}
          />
        </div>
      </article>
    </main>
  );
};

export default SignupPage;
