import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../../components/common/PrimaryButton";
import { registerUser } from "../auth.api";


const SignupForm = () => {
  const navigate = useNavigate();


  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  // =====================================================
  // UI STATE
  // =====================================================

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove previous error when user starts typing
    setError("");
  };


  // =====================================================
  // HANDLE SIGNUP
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");


    // ===================================================
    // FULL NAME VALIDATION
    // ===================================================

    if (!formData.username.trim()) {
      setError("Please enter your full name.");
      return;
    }


    // ===================================================
    // EMAIL VALIDATION
    // ===================================================

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }


    // ===================================================
    // PASSWORD VALIDATION
    // ===================================================

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }


    if (formData.password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }


    if (!/[A-Z]/.test(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter."
      );
      return;
    }


    if (!/[0-9]/.test(formData.password)) {
      setError(
        "Password must contain at least one number."
      );
      return;
    }


    // ===================================================
    // API REQUEST
    // ===================================================

    try {
      setLoading(true);


      const data = await registerUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });


      console.log(
        "Signup successful:",
        data
      );


      // =================================================
      // SUCCESS
      // =================================================

      navigate("/login");


    } catch (err) {
      console.error(
        "Signup error:",
        err
      );


      // Backend error message
      setError(
        err?.response?.data?.message ||
        "Something went wrong. Please try again."
      );


    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="w-full">


      {/* ================================================= */}
      {/* TITLE                                             */}
      {/* ================================================= */}

      <div className="mb-7">

        <h2
          className="
            text-3xl
            font-bold
            tracking-tight
            text-[#101633]
            sm:text-4xl
          "
        >
          Create your account
        </h2>


        <p
          className="
            mt-2
            text-sm
            text-[#62677D]
            sm:text-base
          "
        >
          Start your journey towards a brighter future.
        </p>

      </div>


      {/* ================================================= */}
      {/* FORM                                              */}
      {/* ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >


        {/* ================================================= */}
        {/* FULL NAME                                         */}
        {/* ================================================= */}

        <div>

          <label
            htmlFor="username"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[#4F556D]
            "
          >
            Full name
          </label>


          <div className="relative">

            <User
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#5F6478]
              "
            />


            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Lalit Dhone"
              autoComplete="name"
              className="
                h-14
                w-full
                rounded-xl
                border
                border-[#D9DAE5]
                bg-white/70
                pl-12
                pr-4
                text-sm
                text-[#252942]
                outline-none
                transition

                placeholder:text-[#9A9EAE]

                focus:border-[#5B43EA]

                focus:ring-4
                focus:ring-[#5B43EA]/10
              "
            />

          </div>

        </div>


        {/* ================================================= */}
        {/* EMAIL                                             */}
        {/* ================================================= */}

        <div>

          <label
            htmlFor="email"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[#4F556D]
            "
          >
            Email address
          </label>


          <div className="relative">

            <Mail
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#5F6478]
              "
            />


            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="lalit@example.com"
              autoComplete="email"
              className="
                h-14
                w-full
                rounded-xl
                border
                border-[#D9DAE5]
                bg-white/70
                pl-12
                pr-4
                text-sm
                text-[#252942]
                outline-none
                transition

                placeholder:text-[#9A9EAE]

                focus:border-[#5B43EA]

                focus:ring-4
                focus:ring-[#5B43EA]/10
              "
            />

          </div>

        </div>


        {/* ================================================= */}
        {/* PASSWORD                                          */}
        {/* ================================================= */}

        <div>

          <label
            htmlFor="password"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[#4F556D]
            "
          >
            Password
          </label>


          <div className="relative">

            <Lock
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#5F6478]
              "
            />


            <input
              id="password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••"
              autoComplete="new-password"
              className="
                h-14
                w-full
                rounded-xl
                border
                border-[#D9DAE5]
                bg-white/70
                pl-12
                pr-12
                text-sm
                text-[#252942]
                outline-none
                transition

                placeholder:text-[#9A9EAE]

                focus:border-[#5B43EA]

                focus:ring-4
                focus:ring-[#5B43EA]/10
              "
            />


            {/* SHOW / HIDE PASSWORD */}

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-[#64697C]
                transition
                hover:text-[#5B43EA]
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >

              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}

            </button>

          </div>


          {/* ================================================= */}
          {/* PASSWORD REQUIREMENTS                              */}
          {/* ================================================= */}

          <div className="mt-3 space-y-1.5">

            <p
              className="
                text-sm
                font-semibold
                text-[#20243D]
              "
            >
              Password must contain:
            </p>


            <p className="text-sm text-[#62677D]">

              <span className="mr-2 text-green-500">
                ●
              </span>

              At least 8 characters

            </p>


            <p className="text-sm text-[#62677D]">

              <span className="mr-2 text-green-500">
                ●
              </span>

              One uppercase letter

            </p>


            <p className="text-sm text-[#62677D]">

              <span className="mr-2 text-green-500">
                ●
              </span>

              One number

            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* ERROR                                             */}
        {/* ================================================= */}

        {error && (

          <div
            className="
              rounded-lg
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >
            {error}
          </div>

        )}


        {/* ================================================= */}
        {/* SIGN UP BUTTON                                    */}
        {/* ================================================= */}

        <div className="pt-2">

          <PrimaryButton
            type="submit"
            loading={loading}
          >
            Sign Up
          </PrimaryButton>

        </div>

      </form>


      {/* ================================================= */}
      {/* LOGIN LINK                                        */}
      {/* ================================================= */}

      <div
        className="
          mt-7
          border-t
          border-[#E4E3EB]
          pt-6
        "
      >

        <p
          className="
            text-sm
            text-[#686D80]
          "
        >

          Already have an account?

          <button
            type="button"
            onClick={() =>
              navigate("/login")
            }
            className="
              ml-1.5
              font-semibold
              text-[#5B43EA]
              hover:underline
            "
          >
            Login
          </button>

        </p>

      </div>

    </div>
  );
};


export default SignupForm;