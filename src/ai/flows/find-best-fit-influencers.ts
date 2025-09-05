'use server';
/**
 * @fileOverview An AI matchmaker flow to find the best-fit influencers for a brand.
 *
 * - findBestFitInfluencers - A function that handles the influencer matching process.
 * - FindBestFitInfluencersInput - The input type for the findBestFitInfluencers function.
 * - FindBestFitInfluencersOutput - The return type for the findBestFitInfluencers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindBestFitInfluencersInputSchema = z.object({
  niche: z.string().describe('The niche of the brand or product.'),
  audienceSize: z.string().describe('The desired audience size of the influencer.'),
  budget: z.string().describe('The budget for the influencer collaboration.'),
  goals: z.string().describe('The goals of the influencer campaign.'),
});
export type FindBestFitInfluencersInput = z.infer<typeof FindBestFitInfluencersInputSchema>;

const FindBestFitInfluencersOutputSchema = z.object({
  influencers: z.array(
    z.object({
      name: z.string().describe('The name of the influencer.'),
      profileUrl: z.string().describe('The URL of the influencer profile.'),
      matchScore: z.number().describe('A score indicating how well the influencer matches the brand, from 0 to 1.'),
      reason: z.string().describe('Why this influencer is a good fit')
    })
  ).describe('A list of influencers that are a good fit for the brand.'),
});
export type FindBestFitInfluencersOutput = z.infer<typeof FindBestFitInfluencersOutputSchema>;

export async function findBestFitInfluencers(input: FindBestFitInfluencersInput): Promise<FindBestFitInfluencersOutput> {
  return findBestFitInfluencersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findBestFitInfluencersPrompt',
  input: {schema: FindBestFitInfluencersInputSchema},
  output: {schema: FindBestFitInfluencersOutputSchema},
  prompt: `You are an AI matchmaker that helps brands find the best-fit influencers.

  Given the following information about the brand and its campaign goals, suggest a list of influencers that would be a good fit.

  Niche: {{{niche}}}
  Audience Size: {{{audienceSize}}}
  Budget: {{{budget}}}
  Goals: {{{goals}}}

  Return a JSON array of influencers, including their name, profile URL, match score (0 to 1), and a short reason why they are a good fit.
  `,
});

const findBestFitInfluencersFlow = ai.defineFlow(
  {
    name: 'findBestFitInfluencersFlow',
    inputSchema: FindBestFitInfluencersInputSchema,
    outputSchema: FindBestFitInfluencersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
