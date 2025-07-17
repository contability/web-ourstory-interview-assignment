import InfoDisplayLayout from '@components/layout/info-display-layout';
import GoogleLoginButton from './google-login-button';

const SnsStep = () => {
  return (
    <div>
      <InfoDisplayLayout title="SNS 계정 연결">
        <div className="flex flex-col items-center gap-4">
          <GoogleLoginButton />
        </div>
      </InfoDisplayLayout>
    </div>
  );
};

export default SnsStep;
