# 사용한 주요 기술 스택 및 개발 환경

---

> 개인적으로 생각하는 4가지 중요한 기준을 적용해 기술 스택을 선택하고 있습니다.
>
> 1. npm trends를 통한 글로벌 트렌드 분석: 패키지의 인기도와 성장 추세를 파악하여 커뮤니티 지원이 활발한 도구를 선택하였습니다.
> 2. 국내 개발 커뮤니티 트렌드 고려: 해외와 국내 개발 트렌드가 상이한 경우가 많습니다. 1번보다 우선적으로 국내에서 활발하게 사용되는 도구를 선택함으로써 향후 인수인계 시 난이도를 낮추는 것도 효율적이라고 생각합니다.
> 3. 안정적인 기술 선호: 지속적으로 유지보수되는 기술을 선호합니다. 프로젝트의 장기적인 안정성을 보장하고, 보안 취약점이나 버그가 신속하게 해결되어 서비스 품질을 일관되게 유지할 수 있기 때문입니다.
> 4. 패키지 용량 최적화: 번들 사이즈에 영향을 미치는 패키지 용량을 고려합니다. 사용자 경험과 페이지 로딩 속도에 직접적인 영향을 주는 요소이므로, 동일한 기능을 제공하는 라이브러리라면 더 가벼운 패키지를 선택하는 것을 원칙으로 합니다.
>
> 이 기준들은 대부분 사용자 커뮤니티의 규모와 활성화 정도를 중요시합니다. 이는 레퍼런스와 해결책이 풍부하게 존재한다는 의미일 것입니다.
> 개발 과정에서 마주치는 문제들에 대한 다양한 해결 사례와 문서화가 잘 되어 있어 불확실성을 크게 줄일 수 있으며, 이는 개발 효율성 향상으로 이어진다고 생각하고 있습니다.

## 사용 언어 및 프레임워크

### TypeScript

- 타입 시스템을 통해 개발 중에 오류를 미리 잡아내 코드 안정성 확보
- 자동 완성과 타입 힌트로 개발 속도 향상

### React

일반적으로 Next.js를 선호하지만, 본 프로젝트에서는 API 연동이 없고 단순 회원가입 폼 구현이 목적이기 때문에 React를 선택하였습니다. 서버 사이드 렌더링이나 API 라우트 등 Next.js의 핵심 기능이 불필요한 상황에서 더 간결한 설정과 빠른 개발 환경을 제공하는 React가 적합하다고 판단하였습니다.

- 컴포넌트 기반 UI 개발로 재사용성과 유지보수성 향상
- 가상 DOM을 활용한 효율적인 렌더링 처리
- 간결한 설정으로 회원가입 폼 구현에 집중 가능

## 전역 상태 관리

### Zustand

Redux, Recoil 등 다양한 상태 관리 라이브러리를 고려했지만, Zustand를 선택하게 되었습니다.

Redux는 보일러플레이트가 많고 러닝 커브가 높으며,
Recoil은 아직 실험적 단계에 있어 안정성이 우려된다는 평이었습니다.

반면 Zustand는 간결한 API와 적은 보일러플레이트로 개발 속도를 높일 수 있어 자주 사용하고 있습니다.

### UI 및 폼 관리 도구

#### Tailwind CSS

CSS-in-JS 방식의 styled-components나 emotion 등도 고려했지만, Tailwind CSS를 선택하게 되었습니다.

CSS-in-JS는 런타임 오버헤드, 번들 크기 증가 등의 성능상 이슈가 있었습니다.
Material UI나 Chakra UI 같은 컴포넌트 라이브러리는 커스터마이징 제약이 있었습니다.

반면, Tailwind CSS는 Vite와 함께 간편하고 사용하기 쉽게 되어있습니다.
유틸리티 클래스 방식이 처음에는 익숙해지는 데 시간이 걸리지만 익숙해진 후에는 HTML 구조 내에서 스타일을 직관적으로 파악할 수 있어 가독성이 좋고, 빌드 시 사용하지 않는 클래스를 제거하여 번들 크기를 최적화할 수 있다는 장점이 있어 선택하게 되었습니다.

#### React Hook Form + Zod

Formik, Redux Form 등의 폼 라이브러리와 Yup 등의 유효성 검증 라이브러리를 고려했지만, React Hook Form과 Zod 조합을 선택했습니다.

Formik은 리렌더링이 많이 발생하는 문제가 있었고,
Redux Form은 Redux 의존성이 필요했습니다.

Yup은 TypeScript 지원이 Zod보다 약했습니다.

React Hook Form은 불필요한 리렌더링 없이 폼 상태를 관리할 수 있고, Zod는 TypeScript와의 통합이 뛰어나 타입 안전성을 보장하면서 폼 유효성 검사를 간소화할 수 있어 이 조합을 선택하게 되었습니다.

## 개발 환경 및 도구

### Storybook

- 컴포넌트 단위로 개발하고 문서화하여 재사용성 향상
- UI 컴포넌트를 독립적으로 테스트하고 시각화
- 디자이너와 개발자 간 협업 도구로 활용 가능

### Jest

- 컴포넌트 단위 테스트로 코드 품질 보장
- 사용자 관점에서 테스트하여 실제 사용 시나리오 검증
- 테스트 커버리지 측정으로 안정적인 코드베이스 유지

# 코딩 스타일

---

- 컴포넌트 분리: 관심사 분리 원칙에 따라 컴포넌트를 기능별로 분리하여 재사용성과 유지보수성을 높이려고 노력하고 있습니다.
- 타입 안전성: 명시적 타입 정의를 통해 코드의 안정성을 확보하는 것을 지향합니다.
- 접근성 고려: 모든 사용자가 웹 애플리케이션을 이용할 수 있도록 시맨틱 태그와 ARIA 속성을 적극적으로 활용하는 방향으로 개발하려고 노력하고 있습니다.
- 디렉토리 구조: 기능 중심의 명확한 폴더 구조를 통해 코드 탐색의 용이성을 높이는 것을 목표로 하고 있습니다.
