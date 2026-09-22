import { useRef, useState } from "react";
import {
  BriefcaseBusiness,
  UserRound,
  Upload,
  X,
  Sparkles,
  Info,
  FileText,
  ArrowRight,
} from "lucide-react";
import Logo from "../components/common/Logo";

const InterviewPlanPage = () => {
  const fileInputRef = useRef(null);

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleFile = (file) => {
    setError("");

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const extension = file.name.split(".").pop().toLowerCase();

    if (
      !allowedTypes.includes(file.type) &&
      !["pdf", "doc", "docx"].includes(extension)
    ) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Resume size must be less than 5 MB.");
      return;
    }

    setResume(file);
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeResume = () => {
    setResume(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGenerate = async () => {
    setError("");

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    if (!resume && !selfDescription.trim()) {
      setError("Please upload your resume or enter a self-description.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("jobDescription", jobDescription);

      if (resume) {
        formData.append("resume", resume);
      }

      if (selfDescription.trim()) {
        formData.append("selfDescription", selfDescription);
      }

      console.log("Interview plan data:", {
        jobDescription,
        resume,
        selfDescription,
      });

      // Connect your backend API here.
      //
      // Example:
      //
      // const response = await axios.post(
      //   "http://localhost:8000/api/interview/generate",
      //   formData,
      //   {
      //     withCredentials: true,
      //   }
      // );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Interview strategy generation started.");
    } catch (err) {
      console.error("Generate interview plan error:", err);

      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F7FF] px-4 py-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-[1500px] items-center justify-between rounded-2xl border border-[#E7E8F5] bg-white px-5 py-4 shadow-sm sm:px-8">
        <Logo />

        <div className="flex items-center gap-4">
          <div className="hidden h-8 w-px bg-[#E3E4ED] sm:block" />

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#583FEB] text-lg font-semibold text-white shadow-md">
            L
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative mx-auto w-full max-w-[1280px] py-8 sm:py-10 lg:py-12">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-24 top-0 hidden h-72 w-72 rounded-full border-[60px] border-[#E9E7FF] opacity-70 lg:block" />

        <div className="pointer-events-none absolute -left-32 bottom-0 hidden h-72 w-72 rounded-full border-[55px] border-[#E9E7FF] opacity-60 lg:block" />

        {/* Heading */}
        <div className="relative z-10 mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#11183D] sm:text-4xl lg:text-[42px]">
            Create Your Custom{" "}
            <span className="text-[#5B43EA]">Interview Plan</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#65709A] sm:text-base">
            Let our AI analyze the job requirements and your unique profile to
            build a personalized interview strategy.
          </p>
        </div>

        {/* Main Card */}
        <div className="relative z-10 overflow-hidden rounded-2xl border border-[#E1E4F1] bg-white shadow-[0_20px_60px_rgba(53,63,120,0.08)]">
          <div className="grid lg:grid-cols-2">
            {/* Target Job Description */}
            <div className="border-b border-[#E6E7F0] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEEAFE] text-[#5B43EA]">
                    <BriefcaseBusiness size={19} />
                  </div>

                  <h2 className="text-lg font-bold text-[#12183D] sm:text-xl">
                    Target Job Description
                  </h2>
                </div>

                <span className="rounded-md bg-[#EEEBFF] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#5B43EA]">
                  Required
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                    setError("");
                  }}
                  maxLength={5000}
                  placeholder={`Paste the full job description here...

e.g. "Senior Frontend Engineer requires
proficiency in React, TypeScript, and
large-scale system design..."`}
                  className="h-[360px] w-full resize-none rounded-xl border border-[#D8DCEF] bg-white p-5 pb-12 text-sm leading-7 text-[#27305A] outline-none transition placeholder:text-[#7A84A9] focus:border-[#6550ED] focus:ring-4 focus:ring-[#6550ED]/10 sm:h-[400px] sm:text-base"
                />

                <div className="absolute bottom-4 right-5 text-xs font-medium text-[#68729A]">
                  {jobDescription.length} / 5000 chars
                </div>
              </div>
            </div>

            {/* Your Profile */}
            <div className="p-6 sm:p-8 lg:p-9">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEEAFE] text-[#5B43EA]">
                  <UserRound size={19} />
                </div>

                <h2 className="text-lg font-bold text-[#12183D] sm:text-xl">
                  Your Profile
                </h2>
              </div>

              {/* Resume Upload */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-sm font-bold text-[#171D43] sm:text-base">
                    Upload Resume
                  </h3>

                  <span className="rounded-md bg-[#EEEBFF] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#5B43EA]">
                    Best Results
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!resume ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-[125px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#8B7CFF] bg-[#FAFAFF] transition hover:bg-[#F5F3FF]"
                  >
                    <Upload
                      size={28}
                      className="mb-2 text-[#5B43EA]"
                    />

                    <p className="text-sm font-semibold text-[#18204A] sm:text-base">
                      Click to upload or drag & drop
                    </p>

                    <p className="mt-1 text-xs text-[#737DA4]">
                      PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-xl border border-[#D7DCEF] bg-[#FAFAFF] px-4 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E7F9F0] text-[#16A66A]">
                        <FileText size={23} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#1A2145]">
                          {resume.name}
                        </p>

                        <p className="mt-1 text-xs text-[#737DA4]">
                          {(resume.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeResume}
                      className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#3C4263] transition hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove resume"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>

              {/* OR */}
              <div className="my-5 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#DEE1EC]" />

                <span className="text-xs font-semibold text-[#7881A4]">
                  OR
                </span>

                <div className="h-px flex-1 bg-[#DEE1EC]" />
              </div>

              {/* Self Description */}
              <div>
                <label
                  htmlFor="selfDescription"
                  className="mb-3 block text-sm font-bold text-[#171D43] sm:text-base"
                >
                  Quick Self-Description
                </label>

                <textarea
                  id="selfDescription"
                  value={selfDescription}
                  onChange={(e) => {
                    setSelfDescription(e.target.value);
                    setError("");
                  }}
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                  className="h-[105px] w-full resize-none rounded-xl border border-[#D8DCEF] bg-white p-4 text-sm leading-6 text-[#27305A] outline-none transition placeholder:text-[#7A84A9] focus:border-[#6550ED] focus:ring-4 focus:ring-[#6550ED]/10"
                />
              </div>

              {/* Information */}
              <div className="mt-3 flex gap-3 rounded-xl bg-[#F0F2FF] px-4 py-3.5">
                <Info
                  size={18}
                  className="mt-0.5 shrink-0 text-[#238BEA]"
                />

                <p className="text-xs leading-5 text-[#53608B]">
                  Either a{" "}
                  <span className="font-bold text-[#202958]">Resume</span> or
                  a{" "}
                  <span className="font-bold text-[#202958]">
                    Self Description
                  </span>{" "}
                  is required to generate a personalized plan.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col gap-5 border-t border-[#E6E7F0] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-9">
            <div className="flex items-center gap-2 text-sm text-[#68729A]">
              <Sparkles size={18} className="text-[#5B43EA]" />

              <span>AI-Powered Strategy Generation</span>

              <span className="hidden sm:inline">• Approx 30s</span>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#5B43EA] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#5B43EA]/20 transition hover:bg-[#4D36D7] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Sparkles size={18} />

              {loading
                ? "Generating..."
                : "Generate My Interview Strategy"}

              {!loading && <ArrowRight size={19} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="border-t border-red-100 bg-red-50 px-6 py-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default InterviewPlanPage;