import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '@components/typography/heading';
import InfoDisplayLayout from '@components/layout/info-display-layout';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '@components/fields/form-field';
import Input from '@components/fields/input';

const signupFormSchema = z.object({
  id: z.string().min(1, { message: '아이디를 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '이메일 형식이 올바르지 않습니다.' }),
  phone: z
    .string()
    .min(1, { message: '전화번호를 입력해주세요.' })
    .refine(value => /^\+\d{1,3}\d{9,10}$/.test(value), {
      message: '국제번호(+국가코드)와 전화번호를 입력해주세요. (예: +821012345678)',
    }),
  birthday: z.string(),
  gender: z.number(),
  name: z.string(),
  nickname: z.string(),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      id: '',
      password: '',
      email: '',
      phone: '',
      birthday: '',
      gender: undefined,
      name: '',
      nickname: '',
    },
  });

  // 다음 단계로 이동
  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  // 이전 단계로 이동
  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  // 회원가입 완료
  const onSubmit = (formValues: SignupFormValues) => {
    // 여기서 실제 회원가입 API 호출 로직이 들어갈 수 있음
    console.log('회원가입 데이터:', formValues);
  };

  return (
    <main className="flex h-dvh flex-col items-center justify-center px-4 py-12">
      <section className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-md md:p-12">
        <div className="mb-8">
          <Heading level="h1" className="md:mb-4 lg:mb-4">
            회원가입
          </Heading>
          <div className="mx-auto h-1 w-24 bg-mustard" />
        </div>

        {/* 단계 표시 */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 1 ? 'bg-forest text-white' : 'bg-cream text-khaki'}`}
            >
              1
            </span>
            <span className={`h-1 w-16 ${step >= 2 ? 'bg-forest' : 'bg-cream'}`}></span>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 2 ? 'bg-forest text-white' : 'bg-cream text-khaki'}`}
            >
              2
            </span>
            <span className={`h-1 w-16 ${step >= 3 ? 'bg-forest' : 'bg-cream'}`}></span>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 3 ? 'bg-forest text-white' : 'bg-cream text-khaki'}`}
            >
              3
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-cream p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 1단계: 기본 정보 */}
            {step === 1 && (
              <div>
                <InfoDisplayLayout title="기본 정보">
                  <div className="space-y-4">
                    {/* TODO: Required props 및 UI 추가 */}
                    <FormField label={{ id: 'signup-id', content: 'ID' }} error={errors.id}>
                      <Input id="signup-id" value={watch('id')} aria-required="true" {...register('id')} />
                    </FormField>
                    <FormField label={{ id: 'signup-password', content: 'PW' }} error={errors.id}>
                      <Input
                        id="signup-password"
                        value={watch('password')}
                        aria-required="true"
                        {...register('password')}
                      />
                    </FormField>
                    <FormField label={{ id: 'signup-email', content: 'EMAIL' }} error={errors.id}>
                      <Input id="signup-email" value={watch('email')} aria-required="true" {...register('email')} />
                    </FormField>
                    <FormField label={{ id: 'signup-phone', content: 'PHONE' }} error={errors.id}>
                      <Input id="signup-phone" value={watch('phone')} aria-required="true" {...register('email')} />
                    </FormField>
                  </div>
                </InfoDisplayLayout>
              </div>
            )}

            {/* 2단계: 추가 정보 */}
            {step === 2 && (
              <div>
                <InfoDisplayLayout title="추가 정보">
                  <div className="space-y-4"></div>
                </InfoDisplayLayout>
              </div>
            )}

            {/* 3단계: SNS 연동 */}
            {/* {step === 3 && (
              <div>
                <InfoDisplayLayout title="SNS 연동">
                  <div className="space-y-4">
                    <p className="text-khaki">소셜 계정을 연동하면 더 편리하게 서비스를 이용할 수 있습니다.</p>

                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setSignupData({ sns: 'kakao' })}
                        className={`flex w-full items-center justify-center rounded-md border p-2 transition-colors ${
                          signupData.sns === 'kakao'
                            ? 'border-forest bg-forest text-white'
                            : 'border-sage bg-white text-khaki hover:bg-cream'
                        }`}
                      >
                        카카오 계정 연동
                      </button>

                      <button
                        type="button"
                        onClick={() => setSignupData({ sns: 'google' })}
                        className={`flex w-full items-center justify-center rounded-md border p-2 transition-colors ${
                          signupData.sns === 'google'
                            ? 'border-forest bg-forest text-white'
                            : 'border-sage bg-white text-khaki hover:bg-cream'
                        }`}
                      >
                        구글 계정 연동
                      </button>

                      <button
                        type="button"
                        onClick={() => setSignupData({ sns: 'naver' })}
                        className={`flex w-full items-center justify-center rounded-md border p-2 transition-colors ${
                          signupData.sns === 'naver'
                            ? 'border-forest bg-forest text-white'
                            : 'border-sage bg-white text-khaki hover:bg-cream'
                        }`}
                      >
                        네이버 계정 연동
                      </button>

                      <button
                        type="button"
                        onClick={() => setSignupData({ sns: 'none' })}
                        className={`flex w-full items-center justify-center rounded-md border p-2 transition-colors ${
                          signupData.sns === 'none'
                            ? 'border-forest bg-forest text-white'
                            : 'border-sage bg-white text-khaki hover:bg-cream'
                        }`}
                      >
                        연동하지 않음
                      </button>
                    </div>
                  </div>
                </InfoDisplayLayout>
              </div>
            )} */}

            {/* 버튼 영역 */}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="rounded-full border border-forest px-6 py-2 text-forest transition-colors hover:bg-cream"
                >
                  이전
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="rounded-full border border-forest px-6 py-2 text-forest transition-colors hover:bg-cream"
                >
                  취소
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full bg-forest px-6 py-2 text-white transition-colors hover:bg-olive"
                >
                  다음
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-full bg-forest px-6 py-2 text-white transition-colors hover:bg-olive"
                >
                  가입 완료
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
