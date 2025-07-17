import GoogleIcon from '@components/icons/google-icon';
import { useGoogleLogin } from '@react-oauth/google';
import type { SignupFormValues } from 'pages/signup/schema/signup';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface GoogleUserInfo {
  email: string;
  sub: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

const GoogleLoginButton = () => {
  const [isConnected, setIsConnected] = useState(false);

  const { setValue, watch } = useFormContext<SignupFormValues>();

  const googleId = watch('googleId');
  const googleEmail = watch('googleEmail');

  useEffect(() => {
    if (googleId) {
      setIsConnected(true);
    }
  }, [googleId, googleEmail]);

  const googleLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: async tokenResponse => {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const responseData = await response.json();
        setIsConnected(true);

        if (responseData.sub && responseData.email) {
          setValue('googleId', responseData.sub);
          setValue('googleEmail', responseData.email);
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      }
    },
    onError: error => {
      console.error('구글 로그인 실패:', error);
    },
  });

  const handleDisconnect = () => {
    setIsConnected(false);
    setValue('googleId', '');
    setValue('googleEmail', '');
  };

  return (
    <div>
      {!isConnected ? (
        <button
          type="button"
          onClick={() => googleLogin()}
          className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100"
        >
          <GoogleIcon size={24} grayscale={true} />
          <span>구글 계정 연결하기</span>
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <GoogleIcon size={24} grayscale={false} />
            <p>연결된 계정: {watch('googleEmail')}</p>
          </div>
          <button type="button" onClick={handleDisconnect} className="text-sm text-red-500 hover:underline">
            연결 해제
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
