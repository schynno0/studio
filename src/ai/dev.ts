
import { config } from 'dotenv';
config();

import '@/ai/flows/explain-code.ts';
import '@/ai/flows/summarize-complex-topics.ts';
import '@/ai/flows/grade-resume-flow.ts';
import '@/ai/flows/suggest-projects-flow.ts';
import '@/ai/flows/generate-code-flow.ts'; // Added import
