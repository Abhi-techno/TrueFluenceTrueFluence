'use server';
/**
 * @fileOverview An AI agent for providing influencers with growth insights.
 *
 * - getInfluencerGrowthInsights - A function that provides growth insights for influencers.
 * - GetInfluencerGrowthInsightsInput - The input type for the getInfluencerGrowthInsights function.
 * - GetInfluencerGrowthInsightsOutput - The return type for the getInfluencerGrowthInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetInfluencerGrowthInsightsInputSchema = z.object({
  platform: z
    .string()
    .describe('The social media platform (e.g., Instagram, YouTube, TikTok).'),
  username: z.string().describe('The username of the influencer.'),
});
export type GetInfluencerGrowthInsightsInput = z.infer<
  typeof GetInfluencerGrowthInsightsInputSchema
>;

const GetInfluencerGrowthInsightsOutputSchema = z.object({
  engagementRate: z
    .number()
    .describe('The average engagement rate of the influencer per post.'),
  authenticityScore: z
    .number()
    .describe(
      'A score indicating the authenticity of the influencer, with 1 being the most authentic.'
    ),
  contentPerformance: z
    .string()
    .describe('Insights into the performance of the influencers content.'),
});
export type GetInfluencerGrowthInsightsOutput = z.infer<
  typeof GetInfluencerGrowthInsightsOutputSchema
>;

export async function getInfluencerGrowthInsights(
  input: GetInfluencerGrowthInsightsInput
): Promise<GetInfluencerGrowthInsightsOutput> {
  return getInfluencerGrowthInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getInfluencerGrowthInsightsPrompt',
  input: {schema: GetInfluencerGrowthInsightsInputSchema},
  output: {schema: GetInfluencerGrowthInsightsOutputSchema},
  prompt: `You are an AI-powered social media analyst. You provide growth insights for influencers based on their social media platform and username.

  Analyze the following influencer:
  Platform: {{{platform}}}
  Username: {{{username}}}

  Provide the engagement rate, authenticity score, and content performance insights.

  Engagement Rate: (Calculate the average engagement rate based on likes, comments, and shares per post)
  Authenticity Score: (Assess the authenticity of the influencer based on follower quality and engagement patterns, with 1 being the most authentic)
  Content Performance: (Provide insights into the type of content that performs best for the influencer)
  `,
});

const getInfluencerGrowthInsightsFlow = ai.defineFlow(
  {
    name: 'getInfluencerGrowthInsightsFlow',
    inputSchema: GetInfluencerGrowthInsightsInputSchema,
    outputSchema: GetInfluencerGrowthInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
