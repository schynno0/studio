
'use server';
/**
 * @fileOverview An AI agent to suggest project ideas based on a resume or skills.
 *
 * - suggestProjects - A function that suggests projects.
 * - SuggestProjectsInput - The input type for the suggestProjects function.
 * - SuggestProjectsOutput - The return type for the suggestProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectsInputSchema = z.object({
  resumeText: z.string().min(50, { message: "Resume/skills text must be at least 50 characters." })
    .describe('The full text of the resume or a summary of skills and experience.'),
  interests: z.string().optional()
    .describe('Optional: Specific areas of interest for project suggestions (e.g., web development, machine learning, sustainability).'),
  projectCount: z.number().min(1).max(5).default(3).optional()
    .describe('The number of project suggestions to generate (default is 3).'),
});
export type SuggestProjectsInput = z.infer<typeof SuggestProjectsInputSchema>;

const ProjectSuggestionSchema = z.object({
  title: z.string().describe('A concise and catchy title for the project idea.'),
  description: z.string().describe('A brief explanation of the project, its goals, and potential impact.'),
  suggestedTechnologies: z.array(z.string()).describe('A list of relevant technologies or tools that could be used for the project.'),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).describe("Estimated difficulty level of the project.")
});
export type ProjectSuggestion = z.infer<typeof ProjectSuggestionSchema>;


const SuggestProjectsOutputSchema = z.object({
  projectSuggestions: z.array(ProjectSuggestionSchema)
    .describe('A list of tailored project suggestions.'),
});
export type SuggestProjectsOutput = z.infer<typeof SuggestProjectsOutputSchema>;

export async function suggestProjects(input: SuggestProjectsInput): Promise<SuggestProjectsOutput> {
  return suggestProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectsPrompt',
  input: {schema: SuggestProjectsInputSchema},
  output: {schema: SuggestProjectsOutputSchema},
  prompt: `You are a creative and experienced tech mentor who excels at brainstorming project ideas.
Based on the provided resume/skills summary and optional interests, generate {{{projectCount}}} innovative and practical project ideas.
For each project, provide a title, a short description (2-3 sentences), a list of 3-5 suggested technologies, and an estimated difficulty level (Beginner, Intermediate, Advanced).

Resume/Skills:
\`\`\`
{{{resumeText}}}
\`\`\`

{{#if interests}}
User Interests: {{{interests}}}
{{/if}}

Focus on projects that are:
- Relevant to the user's apparent skillset and experience level.
- Potentially impactful or demonstrate valuable skills.
- Feasible to complete for an individual or small team.

Ensure your output strictly adheres to the JSON schema provided.
`,
});

const suggestProjectsFlow = ai.defineFlow(
  {
    name: 'suggestProjectsFlow',
    inputSchema: SuggestProjectsInputSchema,
    outputSchema: SuggestProjectsOutputSchema,
  },
  async input => {
    // Ensure projectCount has a default if not provided by the Zod schema default (older Zod versions might not auto-apply)
    const flowInput = {
      ...input,
      projectCount: input.projectCount ?? 3,
    };
    const {output} = await prompt(flowInput);
     if (!output) {
      throw new Error("AI failed to generate project suggestions. The model might be overloaded or the input was problematic.");
    }
    return output;
  }
);
