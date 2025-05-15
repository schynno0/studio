// src/ai/flows/explain-code.ts
'use server';
/**
 * @fileOverview An AI agent to explain code snippets.
 *
 * - explainCode - A function that explains the code.
 * - ExplainCodeInput - The input type for the explainCode function.
 * - ExplainCodeOutput - The return type for the explainCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCodeInputSchema = z.object({
  codeSnippet: z
    .string()
    .describe('The code snippet to be explained.'),
  programmingLanguage: z.string().describe('The programming language of the code snippet.'),
  userLevel: z.string().describe('The experience level of the user.'),
});
export type ExplainCodeInput = z.infer<typeof ExplainCodeInputSchema>;

const ExplainCodeOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the code snippet.'),
});
export type ExplainCodeOutput = z.infer<typeof ExplainCodeOutputSchema>;

export async function explainCode(input: ExplainCodeInput): Promise<ExplainCodeOutput> {
  return explainCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCodePrompt',
  input: {schema: ExplainCodeInputSchema},
  output: {schema: ExplainCodeOutputSchema},
  prompt: `You are an expert code explainer, skilled at breaking down complex code into simple, understandable terms for students and professionals.

  Given the following code snippet and the user's experience level, provide a clear and concise explanation of the code's functionality.
  Consider using external resources or documentation if necessary to provide a comprehensive explanation. Focus on clarity and simplicity to help the user understand the code effectively.

  Programming Language: {{{programmingLanguage}}}
  User Experience Level: {{{userLevel}}}
  Code Snippet:
  \`\`\`{{{programmingLanguage}}}
  {{{codeSnippet}}}
  \`\`\`
  `,
});

const explainCodeFlow = ai.defineFlow(
  {
    name: 'explainCodeFlow',
    inputSchema: ExplainCodeInputSchema,
    outputSchema: ExplainCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate code explanation. The model might be overloaded or the input was problematic.");
    }
    return output;
  }
);