import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("./AuthPage"));
const MainPage = lazy(() => import("./MainPage"));

export const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const page = isLoggedIn ? <MainPage /> : <AuthPage />;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/*" element={page} />
      </Routes>
    </Suspense>
  );
};
