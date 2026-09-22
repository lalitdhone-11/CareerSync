import Logo from "../common/Logo";

const AuthLayout = ({
  children,
  image,
}) => {
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

      <section
        className="
          relative
          mx-auto
          flex
          min-h-[calc(100vh-24px)]
          max-w-[1450px]
          overflow-hidden
          rounded-[30px]
          bg-gradient-to-br
          from-white
          via-[#FAFAFF]
          to-[#FFF4E3]
          shadow-[0_20px_70px_rgba(73,58,160,0.12)]
        "
      >

        {/* ================= LEFT SIDE ================= */}

        <div
          className="
            relative
            z-10
            flex
            w-full
            flex-col
            px-6
            py-6
            sm:px-10
            lg:w-[52%]
            lg:px-16
            lg:py-8
          "
        >

          {/* Logo */}

          <div>
            <Logo />
          </div>


          {/* Form area */}

          <div
            className="
              flex
              flex-1
              items-center
              py-8
              sm:py-10
              lg:py-5
            "
          >
            <div className="w-full max-w-[510px]">
              {children}
            </div>
          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div
          className="
            relative
            hidden
            overflow-hidden
            lg:block
            lg:w-[48%]
          "
        >

          {/* Image */}

          <img
            src={image}
            alt="CareerSync"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

        </div>

      </section>

    </main>
  );
};

export default AuthLayout;