import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Login from "../Login";
import styles from "./index.module.scss";

const AuthPage = () => {
  return (
    <div className={styles.root}>
      <AuthLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthLayout>
    </div>
  );
};

export default AuthPage;
