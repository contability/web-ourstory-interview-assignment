import Heading from '@components/typography/heading';
import StepForm from '@components/form/step-form';
import BasicInfoStep from './components/basic-info-step';
import AdditionalInfoStep from './components/additional-info-step';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema } from '../../schema/signup';
import type { SignupFormValues } from '../../schema/signup';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AlertModal from '@components/modal/content/alert-modal';
import KeyValueList from '@components/key-value-list.tsx';
import SnsStep from './components/sns-step';
import { useSignupStore } from '../../stores/signup-store';

const SignupPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Record<string, string | number>>();
  const { signupData, clearSignupData } = useSignupStore();

  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      id: '',
      password: '',
      email: '',
      countryCode: '',
      phone: '',
      birthday: '',
      gender: undefined,
      name: '',
      nickName: '',
      googleId: '',
      googleEmail: '',
    },
    mode: 'onSubmit',
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    control,
    reset,
    formState: { errors },
  } = methods;

  // 저장된 데이터 복원
  useEffect(() => {
    if (signupData && Object.keys(signupData).length > 0) {
      reset(signupData as any);
    }
  }, [reset, signupData]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    // 회원가입 완료 후 데이터 초기화
    clearSignupData();
    navigate('/');
  };

  const handleSignupComplete = (formData: SignupFormValues) => {
    // NOTE: 실제 API 연동으로 이어지지 않으므로 모달로 시각화하는 것으로 임시 구현.
    setModalContent({
      id: formData.id,
      password: formData.password,
      email: formData.email,
      phone: `${formData.countryCode}${formData.phone}`,
      birthday: formData.birthday,
      gender: formData.gender ?? '',
      name: formData.name,
      nickName: formData.nickName,
      googleId: formData.googleId,
      googleEmail: formData.googleEmail,
    });
    setIsModalOpen(true);
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
          <FormProvider {...methods}>
            <StepForm
              content={[
                <BasicInfoStep key="basic-info" register={register} watch={watch} errors={errors} control={control} />,
                <AdditionalInfoStep
                  key="additional-info"
                  register={register}
                  watch={watch}
                  errors={errors}
                  control={control}
                />,
                <SnsStep key="sns" />,
              ]}
              fieldsToValidateByStep={[
                ['id', 'password', 'email', 'countryCode', 'phone'],
                ['birthday', 'gender', 'name', 'nickName'],
                ['googleId', 'googleEmail'],
              ]}
              submitButtonText="가입 완료"
              trigger={trigger}
              onSubmit={handleSignupComplete}
              handleSubmit={handleSubmit}
              onCancel={() => navigate('/')}
              watch={watch}
            />
          </FormProvider>
        </div>
      </article>
      <AlertModal
        title="회원가입 완료"
        message={<KeyValueList data={modalContent ?? {}} />}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalClose}
      />
    </main>
  );
};

export default SignupPage;
