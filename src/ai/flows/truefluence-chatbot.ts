'use server';
/**
 * @fileOverview A conversational AI agent for the TrueFluence platform.
 *
 * - chat - A function that handles the conversational chat process.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z
    .string()
    .describe('The chatbot\'s response to the user\'s message.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'truefluenceChatbotPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are a friendly and helpful onboarding assistant for TrueFluence, an AI-powered influencer marketing platform.

Your goal is to welcome users, understand their needs, and guide them to the right features.

Start the conversation by introducing yourself and asking if the user is a "Brand" or an "Influencer".

If they are a brand, ask them about their campaign goals.
If they are an influencer, ask them about their niche and follower count.

Keep your responses concise, friendly, and helpful.

User message: {{{message}}}

Your response:
`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'truefluenceChatbotFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
