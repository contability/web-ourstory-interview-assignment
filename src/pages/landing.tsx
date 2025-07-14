import InfoDisplayLayout from '@components/layout/info-display-layout';
import Heading from '@components/typography/heading';
import BulletList from '@components/bullet-list';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main className="flex h-dvh flex-col items-center justify-center px-4 py-12">
      <section className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-md md:p-12">
        <div className="mb-8">
          <Heading level="h1" className="md:mb-4 lg:mb-4">
            회원가입 폼 구현 과제
          </Heading>
          <div className="mx-auto h-1 w-24 bg-mustard" />
        </div>

        <div className="mb-10 rounded-lg bg-cream p-6">
          <InfoDisplayLayout title="과제 개요">
            <div className="text-khaki">
              <p>단계적으로 이동하는 회원가입 폼을 구현해주세요.</p>
              <p>각 단계는 다음 버튼으로 이동하며, 이전 단계로 돌아갈 수 있어야 합니다.</p>
            </div>
          </InfoDisplayLayout>

          <InfoDisplayLayout title="요구사항">
            <BulletList
              className="text-khaki"
              items={[
                {
                  content: (
                    <span>
                      <strong>1단계:</strong> 아이디, 비밀번호, 이메일, 전화번호
                    </span>
                  ),
                },
                {
                  content: (
                    <span>
                      <strong>2단계:</strong> 생년월일, 성별, 나머지 구성은 자유
                    </span>
                  ),
                },
                {
                  content: (
                    <span>
                      <strong>3단계:</strong> SNS 소셜 계정 연결 항목
                    </span>
                  ),
                },
              ]}
            />
          </InfoDisplayLayout>

          <InfoDisplayLayout title="구현 조건">
            <BulletList
              className="text-khaki"
              items={[
                { content: 'Typescript 필수 사용' },
                { content: '그 외 기술 스택, 라이브러리, 프레임워크는 자유 선택' },
                { content: 'UI/UX 완성도 및 스타일링 구현력은 자유 표현' },
              ]}
            />
          </InfoDisplayLayout>

          <InfoDisplayLayout title="(선택) README 작성 내용">
            <BulletList
              className="text-khaki"
              items={[{ content: '프로젝트 실행 방법 (설치 및 실행 명령어)' }, { content: '기술 스택 및 선택 이유' }]}
            />
          </InfoDisplayLayout>
        </div>

        <Link
          to="/signup"
          className="mx-auto block w-fit rounded-full bg-forest px-8 py-3 text-lg font-medium text-white transition-colors duration-300 hover:bg-olive"
          aria-label="회원가입 페이지로 이동"
        >
          회원가입 시작하기
        </Link>
      </section>
    </main>
  );
};

export default Landing;
