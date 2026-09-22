import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import WelcomePage from "../pages/WelcomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import InterviewPlanPage from "../pages/InterviewPlanPage";
const Placeholder = ({ title }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F2FF]">
      <h1 className="text-3xl font-bold text-[#5B43EA]">
        {title}
      </h1>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<WelcomePage />}
        />

        <Route
          path="/signup"
           element={<SignUpPage />}
        />

        <Route
          path="/login"
         element={<LoginPage />}
        />
        {/* <Route path="/interview/:interviewId" element={<InterviewPlanPage />} /> */}
          <Route path="/interview" element={<InterviewPlanPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;