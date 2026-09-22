import AuthLayout from "../components/auth/AuthLayout";

import SignupForm from "../features/auth/components/SignupForm";

import boyImage from "../assets/images/boy.png";


const SignUpPage = () => {
  return (
    <AuthLayout image={boyImage}>
      <SignupForm />
    </AuthLayout>
  );
};


export default SignUpPage;