import {
  ArrowRight,
  FileText,
  Sparkles,
  Target,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import girlImage from "../assets/images/girl.png";


const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <main
      className="
        min-h-screen
        bg-[#F1F2FF]
        p-3
        sm:p-5
        lg:p-7
      "
    >

      {/* ================= MAIN CARD ================= */}

      <section
        className="
          relative
          mx-auto
          min-h-[calc(100vh-24px)]
          max-w-[1500px]
          overflow-hidden
          rounded-[30px]
          bg-gradient-to-br
          from-white
          via-white
          to-[#F7F4FF]
          shadow-[0_20px_70px_rgba(73,58,160,0.12)]
        "
      >

        {/* ================= DECORATIVE CIRCLE ================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-[35%]
            top-[25%]
            h-44
            w-44
            rounded-full
            bg-[#E8E3FF]
            opacity-70
            blur-sm
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-100px]
            left-[35%]
            h-72
            w-72
            rounded-full
            bg-[#FFF0D8]
            opacity-60
            blur-3xl
          "
        />


        {/* ================= HEADER ================= */}

        <header
          className="
            relative
            z-20
            flex
            items-center
            px-6
            py-6
            sm:px-10
            lg:px-12
          "
        >

          <Logo />

        </header>


        {/* ================= HERO ================= */}

        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            items-center
            gap-10
            px-6
            pb-8
            sm:px-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-8
            lg:px-12
            lg:pb-12
          "
        >

          {/* ================= LEFT CONTENT ================= */}

          <div>

            {/* ================= BADGE ================= */}

            <div
              className="
                mb-6
                flex
                w-fit
                items-center
                gap-2
                rounded-full
                bg-[#EEE9FF]
                px-4
                py-2
                text-sm
                font-semibold
                text-[#5B43EA]
              "
            >
              <Sparkles size={16} />

              Welcome to a better you
            </div>


            {/* ================= HEADING ================= */}

            <h2
              className="
                text-[42px]
                font-bold
                leading-[1.02]
                tracking-[-1.5px]
                text-[#101633]
                sm:text-5xl
                lg:text-[62px]
              "
            >
              Welcome to

              <br />

              <span className="text-[#5B43EA]">
                CareerSync
              </span>
            </h2>


            {/* ================= DESCRIPTION ================= */}

            <p
              className="
                mt-6
                max-w-xl
                text-base
                leading-7
                text-[#616780]
                sm:text-lg
              "
            >
              Optimize your resume with AI-powered
              suggestions and take the next step
              towards your dream career.
            </p>


            {/* ================= PURPLE LINE ================= */}

            <div
              className="
                mt-5
                h-1
                w-36
                -rotate-3
                rounded-full
                bg-[#6947EF]
              "
            />


            {/* ================= FEATURES ================= */}

            <div
              className="
                mt-10
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-3
              "
            >

              <Feature
                icon={<FileText size={20} />}
                title="Upload"
                description="Your Resume"
              />

              <Feature
                icon={<Target size={20} />}
                title="Add"
                description="Job Description"
              />

              <Feature
                icon={<Sparkles size={20} />}
                title="Get AI"
                description="Smart Suggestions"
              />

            </div>


            {/* ================= ACTION BUTTONS ================= */}

            <div
              className="
                mt-9
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              {/* ================= SIGN UP ================= */}

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#5B43EA]
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  shadow-xl
                  shadow-[#5B43EA]/20
                  transition
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#4D35D5]
                  active:scale-[0.98]
                "
              >
                Sign Up

                <ArrowRight
                  size={19}
                  className="
                    ml-2
                    transition
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              </button>


              {/* ================= LOGIN ================= */}

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="
                  rounded-xl
                  border-2
                  border-[#5B43EA]
                  bg-white
                  px-9
                  py-4
                  text-sm
                  font-semibold
                  text-[#5B43EA]
                  transition
                  duration-200
                  hover:bg-[#F5F2FF]
                  active:scale-[0.98]
                "
              >
                Login
              </button>

            </div>


            {/* ================= QUOTE ================= */}

            <div className="mt-8">

              <p
                className="
                  text-sm
                  text-[#62677D]
                "
              >
                Take a small step today, for a brighter tomorrow.
              </p>

              <div
                className="
                  mt-2
                  h-1
                  w-24
                  -rotate-2
                  rounded-full
                  bg-[#6947EF]
                "
              />

            </div>

          </div>


          {/* ================================================= */}
          {/* ================= RIGHT IMAGE =================== */}
          {/* ================================================= */}

          <div
            className="
              relative
              h-[520px]
              overflow-hidden
              rounded-[32px]
              bg-[#DDD9F3]

              sm:h-[600px]

              lg:h-[680px]
            "
          >

            <img
              src={girlImage}
              alt="CareerSync professional"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

          </div>

        </div>

      </section>

    </main>
  );
};


/* ========================================================= */
/* ================= FEATURE COMPONENT ==================== */
/* ========================================================= */

const Feature = ({
  icon,
  title,
  description,
}) => {

  return (
    <div
      className="
        flex
        items-center
        gap-3
      "
    >

      {/* ================= ICON ================= */}

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-[#EAE6FF]
          text-[#5B43EA]
        "
      >
        {icon}
      </div>


      {/* ================= TEXT ================= */}

      <div>

        <h3
          className="
            text-sm
            font-bold
            text-[#111633]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-0.5
            text-xs
            text-[#6A6F85]
          "
        >
          {description}
        </p>

      </div>

    </div>
  );
};


export default WelcomePage;