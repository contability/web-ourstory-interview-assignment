import Landing from 'pages/landing';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/signup"
          element={<div className="p-8 text-center text-forest">회원가입 페이지는 아직 구현되지 않았습니다.</div>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
