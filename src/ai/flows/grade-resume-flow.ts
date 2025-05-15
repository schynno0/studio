
'use server';
/**
 * @fileOverview An AI agent to grade resumes based on a target domain.
 *
 * - gradeResume - A function that grades a resume.
 * - GradeResumeInput - The input type for the gradeResume function.
 * - GradeResumeOutput - The return type for the gradeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GradeResumeInputSchema = z.object({
  resumeText: z.string().min(100, { message: "Resume text must be at least 100 characters." })
    .describe('The full text of the resume to be graded.'),
  targetDomain: z.string().min(3, { message: "Target domain must be at least 3 characters."})
    .describe('The target job domain or field (e.g., Software Engineering, Data Science, Product Management).'),
});
export type GradeResumeInput = z.infer<typeof GradeResumeInputSchema>;

const GradeResumeOutputSchema = z.object({
  overallScore: z.number().min(0).max(100)
    .describe('An overall score for the resume on a scale of 0 to 100, based on its suitability for the target domain.'),
  strengths: z.array(z.string())
    .describe('A list of key strengths identified in the resume relevant to the target domain.'),
  areasForImprovement: z.array(z.string())
    .describe('A list of areas where the resume could be improved for the target domain.'),
  detailedFeedback: z.string()
    .describe('Comprehensive feedback explaining the score, strengths, and areas for improvement.'),
});
export type GradeResumeOutput = z.infer<typeof GradeResumeOutputSchema>;

export async function gradeResume(input: GradeResumeInput): Promise<GradeResumeOutput> {
  return gradeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gradeResumePrompt',
  input: {schema: GradeResumeInputSchema},
  output: {schema: GradeResumeOutputSchema},
  prompt: `You are an expert career coach and resume reviewer with deep knowledge across various professional domains.
Your task is to meticulously review the provided resume text and evaluate its effectiveness for the specified target domain.

Target Domain: {{{targetDomain}}}

Resume Text:
\`\`\`
{{{resumeText}}}
\`\`\`

Based on the resume and target domain, provide:
1.  An overall score (0-100) reflecting the resume's suitability and strength for the target domain.
2.  A list of 3-5 key strengths.
3.  A list of 3-5 specific and actionable areas for improvement.
4.  Detailed feedback that elaborates on the score, justifies the strengths, and explains the areas for improvement. Focus on clarity, conciseness, and constructive advice.

Ensure your output strictly adheres to the JSON schema provided.
`,
});

const gradeResumeFlow = ai.defineFlow(
  {
    name: 'gradeResumeFlow',
    inputSchema: GradeResumeInputSchema,
    outputSchema: GradeResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate resume grading. The model might be overloaded or the input was problematic.");
    }
    return output;
  }
);
