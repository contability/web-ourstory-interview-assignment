import type { SignupFormValues } from 'schema/signup';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface SignupStore {
  signupData: Partial<SignupFormValues>;
  currentStep: number;
  setSignupData: (data: Partial<SignupFormValues>) => void;
  setCurrentStep: (step: number) => void;
  clearSignupData: () => void;
}

export const useSignupStore = create<SignupStore>()(
  devtools(
    persist(
      set => ({
        signupData: {},
        currentStep: 0,
        setSignupData: data => {
          set(state => ({
            signupData: {
              ...state.signupData,
              ...data,
            },
          }));
        },
        setCurrentStep: step => {
          set({ currentStep: step });
        },
        clearSignupData: () => set({ signupData: {}, currentStep: 0 }),
      }),
      {
        name: 'signup-data',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
