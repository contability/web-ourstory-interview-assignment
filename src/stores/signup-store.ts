import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface SignupData {
  id?: string;
  password?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  gender?: string;
  name?: string;
  nickName?: string;
  sns?: string;
}

interface SignupStore {
  signupData: SignupData;
  setSignupData: (data: SignupData) => void;
  clearSignupData: () => void;
}

export const useSignupStore = create<SignupStore>()(
  devtools(
    persist(
      set => ({
        signupData: {},
        setSignupData: data => {
          set(state => ({
            signupData: {
              ...state.signupData,
              ...data,
            },
          }));
        },
        clearSignupData: () => set({ signupData: {} }),
      }),
      {
        name: 'signup-data',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
