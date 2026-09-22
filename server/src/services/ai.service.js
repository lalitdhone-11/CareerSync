const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question that can be asked in the interview"),

        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question"
          ),

        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, and what approach to take"
          ),
      })
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and answer guidance"
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question that can be asked in the interview"),

        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question"
          ),

        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, and what approach to take"
          ),
      })
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and answer guidance"
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe("The skill which the candidate is lacking"),

        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of this skill gap"),
      })
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity"
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),

        focus: z
          .string()
          .describe("The main focus of this day in the preparation"),

        tasks: z
          .array(z.string())
          .describe("List of tasks to be completed on this day"),
      })
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow"
    ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate an interview report for a candidate with the following details:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Analyze the candidate's resume and self-description against the job description.
Generate a match score, technical questions, behavioral questions, skill gaps,
and a day-wise preparation plan.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  const report = JSON.parse(response.text);

  return report;
}

module.exports = {
  generateInterviewReport,
};