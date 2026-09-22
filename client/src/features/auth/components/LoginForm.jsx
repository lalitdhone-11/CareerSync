import { useState } from "react";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../auth.api";


const LoginForm = () => {

  const navigate = useNavigate();


  // ================= FORM STATE =================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // ================= PASSWORD VISIBILITY =================

  const [showPassword, setShowPassword] =
    useState(false);


  // ================= LOADING =================

  const [loading, setLoading] =
    useState(false);


  // ================= ERROR =================

  const [error, setError] =
    useState("");


  // ================= SUCCESS =================

  const [success, setSuccess] =
    useState("");


  // ================= INPUT CHANGE =================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };


  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    // ================= VALIDATION =================

    if (!formData.email.trim()) {

      setError(
        "Please enter your email address."
      );

      return;
    }


    if (!formData.password) {

      setError(
        "Please enter your password."
      );

      return;
    }


    try {

      setLoading(true);


      // ================= API =================

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });


      console.log(
        "Login successful:",
        data
      );


      setSuccess(
        "Login successful. Redirecting..."
      );


      /*
        Your backend sets:

        token cookie

        because loginUserController
        uses res.cookie("token", token)
      */


      setTimeout(() => {

        navigate("/dashboard");

      }, 700);


    } catch (err) {

      console.error(
        "Login error:",
        err
      );


      setError(
        err?.response?.data?.message ||
        "Invalid email or password."
      );


    } finally {

      setLoading(false);

    }

  };


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
          Welcome Back!
        </h2>


        <p
          className="
            mt-2
            text-sm
            text-[#62677D]
            sm:text-base
          "
        >
          Continue your journey to a smarter career.
        </p>

      </div>


      {/* ================================================= */}
      {/* FORM                                              */}
      {/* ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >


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
              size={20}
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
              size={20}
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
              autoComplete="current-password"
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


            {/* SHOW / HIDE */}

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
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
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* REMEMBER + FORGOT PASSWORD                        */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          {/* Remember */}

          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-2
              text-sm
              text-[#62677D]
            "
          >

            <input
              type="checkbox"
              className="
                h-4
                w-4
                accent-[#5B43EA]
              "
            />

            Remember me

          </label>


          {/* Forgot */}

          <button
            type="button"
            className="
              text-sm
              font-medium
              text-[#5B43EA]
              transition
              hover:underline
            "
          >
            Forgot Password?
          </button>

        </div>


        {/* ================================================= */}
        {/* ERROR                                             */}
        {/* ================================================= */}

        {error && (

          <div
            className="
              rounded-xl
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
        {/* SUCCESS                                           */}
        {/* ================================================= */}

        {success && (

          <div
            className="
              rounded-xl
              border
              border-green-200
              bg-green-50
              px-4
              py-3
              text-sm
              text-green-600
            "
          >
            {success}
          </div>

        )}


        {/* ================================================= */}
        {/* LOGIN BUTTON                                      */}
        {/* ================================================= */}

        <button
          type="submit"
          disabled={loading}
          className="
            group
            flex
            h-14
            w-full
            items-center
            justify-center
            rounded-xl
            bg-[#5B43EA]
            px-6
            text-base
            font-semibold
            text-white
            shadow-lg
            shadow-[#5B43EA]/20
            transition-all
            duration-200

            hover:bg-[#4D35D5]

            active:scale-[0.99]

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          {loading
            ? "Signing In..."
            : "Sign In"
          }


          {!loading && (

            <ArrowRight
              size={20}
              className="
                ml-2
                transition
                duration-200
                group-hover:translate-x-1
              "
            />

          )}

        </button>


      </form>


      {/* ================================================= */}
      {/* SIGN UP                                           */}
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

          Don't have an account?

          <button
            type="button"
            onClick={() =>
              navigate("/signup")
            }
            className="
              ml-2
              font-semibold
              text-[#5B43EA]
              hover:underline
            "
          >
            Sign Up
          </button>

        </p>

      </div>

    </div>
  );
};


export default LoginForm;