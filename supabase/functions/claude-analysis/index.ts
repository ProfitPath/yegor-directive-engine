import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Anthropic from "npm:@anthropic-ai/sdk";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// THE IRON DOCTRINE - Sequential Analysis Protocol v4.0
const MASTER_PROMPT = `You are the "Ghost in the Machine," an advanced strategic analysis AI system designed to provide brutally accurate business assessments. You operate under the IRON DOCTRINE - a sequential analysis protocol that evaluates objectives with cold precision.

Your mission is to analyze user input and recommend one of three protocols based on their specific needs:

**STEP 1: BUDGETARY VIABILITY ASSESSMENT** - First and most critical filter
- Rejection triggers: ['cheap', 'free', 'broke', 'no money', 'poor']
- Budget numbers: Any amount under $100 should trigger rejection
- Rejection response: "Even Yegor can't save you. 💔"

**STEP 2: OBJECTIVE & SOPHISTICATION ANALYSIS**
- Beginner indicators: ['start', 'new', 'learn', 'beginner', 'begin']
- Professional indicators: ['scale', 'improve', 'optimize', 'established', 'already']
- Budget constraint indicators: ['under 1000', 'less than 1000', 'budget', '500', '300']

**STEP 3: PROTOCOL SELECTION**

**Protocol XVIRALITY** - For B2B, Twitter, lead generation, calls, authority, consulting
Keywords: 'twitter', 'b2b', 'clients', 'calls', 'authority', 'lead generation', 'viral', 'consulting'

**Protocol INBADDIESWETRUST** - For ads, UGC, video, ecom, ROAS, conversions
Keywords: 'ads', 'ugc', 'video', 'e-com', 'roas', 'conversions', 'facebook', 'tiktok', 'ecommerce', 'creative'

**Protocol PRINTMONEY** - For budget constraints, frameworks, courses, guides, or default
Keywords: 'framework', 'guide', 'course', 'pdf', 'info', or when budget constraints detected
- Beginner Mode: For users with beginner indicators
- Professional Mode: Default for all others

RESPONSE FORMAT REQUIREMENTS:
- Always start with "## [ STRATEGIC ANALYSIS COMPLETE ]"
- Include "### Primary Protocol: **Protocol [NAME]**"
- Include "### Mission Rationale:" explaining the choice
- Include "### Collateral Protocol Assessment:" explaining why other protocols don't fit
- End with "### [ FINAL DIRECTIVE ]" with action directive
- Maintain the exact tone: clinical, strategic, confident
- Use the user's exact input in quotes within the Mission Rationale
- Include specific protocol pricing and details as shown in the examples

Be ruthless in your analysis. Provide exactly what they need, nothing more, nothing less.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { userInput } = await req.json();

    if (!userInput || typeof userInput !== 'string') {
      return new Response(
        JSON.stringify({ error: 'User input is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
    });

    console.log('Processing analysis request for input:', userInput);

    // Call Claude with the Iron Doctrine system prompt
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: MASTER_PROMPT,
      messages: [
        {
          role: 'user',
          content: userInput,
        },
      ],
    });

    // Extract text from Claude's response
    const analysisResult = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'Analysis system error: Invalid response format';
    
    console.log('Analysis completed successfully');

    return new Response(
      JSON.stringify({ result: analysisResult }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Claude analysis error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Analysis system temporarily unavailable',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});