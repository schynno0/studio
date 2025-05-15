
'use server';
/**
 * @fileOverview An AI agent to generate code snippets.
 *
 * - generateCode - A function that generates code based on a prompt and language.
 * - GenerateCodeInput - The input type for the generateCode function.
 * - GenerateCodeOutput - The return type for the generateCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeInputSchema = z.object({
  prompt: z
    .string()
    .min(10, { message: "Prompt must be at least 10 characters." })
    .describe('The natural language prompt describing the code to be generated.'),
  language: z
    .string()
    .min(1, { message: "Programming language is required."})
    .describe('The target programming language for the code snippet (e.g., Python, JavaScript).'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

const GenerateCodeOutputSchema = z.object({
  generatedCode: z.string().describe('The generated code snippet, ideally formatted in a markdown code block.'),
});
export type GenerateCodeOutput = z.infer<typeof GenerateCodeOutputSchema>;

export async function generateCode(input: GenerateCodeInput): Promise<GenerateCodeOutput> {
  return generateCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodePrompt',
  input: {schema: GenerateCodeInputSchema},
  output: {schema: GenerateCodeOutputSchema},
  prompt: `You are an expert coding assistant. Generate a code snippet in the '{{{language}}}' programming language based on the following request.
Return *only* the raw code for the '{{{language}}}' programming language. Do not include any explanatory text before or after the code block. If the request is for a specific format like JSON or HTML, ensure the output is valid in that format.

Request:
"{{{prompt}}}"

Code:
`,
});

const generateCodeFlow = ai.defineFlow(
  {
    name: 'generateCodeFlow',
    inputSchema: GenerateCodeInputSchema,
    outputSchema: GenerateCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate code. The model might be overloaded or the input was problematic.");
    }
    // Clean potential markdown fences if the model still adds them
    let code = output.generatedCode.trim();
    const markdownRegex = new RegExp("```(?:" + input.language.toLowerCase() + ")?\\n([\\s\\S]*?)\\n```");
    const match = code.match(markdownRegex);
    if (match && match[1]) {
      code = match[1].trim();
    } else if (code.startsWith("```") && code.endsWith("```")) {
      // Generic fallback for fenced code blocks if language isn't matched
      code = code.substring(3, code.length - 3).trim();
       const firstNewline = code.indexOf('\n');
       if (firstNewline !== -1) {
           code = code.substring(firstNewline + 1).trim();
       }
    }
    return { generatedCode: code };
  }
);
