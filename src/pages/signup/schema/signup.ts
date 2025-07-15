import { z } from 'zod';

export const signupFormSchema = z.object({
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
  gender: z.string(),
  name: z.string(),
  nickName: z.string(),
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;
