import AuthLayout from "../components/auth/AuthLayout";

import LoginForm from "../features/auth/components/LoginForm";

import laptopImage from "../assets/images/laptop.png";


const LoginPage = () => {

  return (
    <AuthLayout image={laptopImage}>

      <LoginForm />

    </AuthLayout>
  );
};


export default LoginPage;