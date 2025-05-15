'use server';
/**
 * @fileOverview Summarizes a complex topic into a simplified explanation.
 *
 * - summarizeTopic - A function that takes a complex topic as input and returns a simplified summary.
 * - SummarizeTopicInput - The input type for the summarizeTopic function.
 * - SummarizeTopicOutput - The return type for the summarizeTopic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTopicInputSchema = z.object({
  topic: z.string().describe('The complex topic to be summarized.'),
  userPreferences: z.string().optional().describe('Optional user preferences for the summary, such as desired length or specific areas of focus.'),
});
export type SummarizeTopicInput = z.infer<typeof SummarizeTopicInputSchema>;

const SummarizeTopicOutputSchema = z.object({
  summary: z.string().describe('A simplified summary of the complex topic.'),
});
export type SummarizeTopicOutput = z.infer<typeof SummarizeTopicOutputSchema>;

export async function summarizeTopic(input: SummarizeTopicInput): Promise<SummarizeTopicOutput> {
  return summarizeTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTopicPrompt',
  input: {schema: SummarizeTopicInputSchema},
  output: {schema: SummarizeTopicOutputSchema},
  prompt: `You are an expert in simplifying complex topics. Your goal is to provide a clear and concise summary that is easy to understand.

  Topic: {{{topic}}}
  User Preferences: {{{userPreferences}}}
  
  Please provide a simplified summary of the topic, taking into account any user preferences.
  Summary:
  `,
});

const summarizeTopicFlow = ai.defineFlow(
  {
    name: 'summarizeTopicFlow',
    inputSchema: SummarizeTopicInputSchema,
    outputSchema: SummarizeTopicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
     if (!output) {
      throw new Error("AI failed to generate topic summary. The model might be overloaded or the input was problematic.");
    }
    return output;
  }
);
