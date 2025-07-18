import { z } from 'zod';

export const signupFormSchema = z.object({
  id: z.string().min(1, { message: '아이디를 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '이메일 형식이 올바르지 않습니다.' }),
  countryCode: z.string().min(1, { message: '국가 코드를 선택해주세요.' }),
  phone: z
    .string()
    .min(1, { message: '전화번호를 입력해주세요.' })
    .refine(value => /^\d{9,11}$/.test(value), {
      message: '올바른 전화번호 형식이 아닙니다. (9-11자리 숫자)',
    }),
  birthday: z.string(),
  gender: z.number().optional(),
  name: z.string(),
  nickName: z.string(),
  googleId: z.string(),
  googleEmail: z.string(),
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;
