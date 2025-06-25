import { Routes, Route } from 'react-router-dom';
import App from './App';
import Summary from './pages/Summary';
import Success from './pages/Success';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}export default AppRouter;