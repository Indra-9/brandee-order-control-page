import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const contentPrompts = {
  blog: `Create a detailed blog post with the following structure:
- Engaging title
- Meta description (150-160 characters)
- Introduction paragraph
- Main content with 3-4 sections with subheadings
- Conclusion with call-to-action
- SEO keywords (5-8 keywords)
Format as JSON with: { title, metaDescription, content, keywords }`,

  case_study: `Create a comprehensive case study with the following structure:
- Project title
- Client/company name
- Challenge description
- Solution approach
- Implementation details
- Results and metrics
- Key takeaways
- Technologies used
Format as JSON with: { title, client, challenge, solution, implementation, results, takeaways, technologies }`,

  integration: `Create an integration guide with the following structure:
- Integration name
- Short description
- Category (e.g., Payment, CRM, Analytics)
- Setup difficulty (Beginner/Intermediate/Advanced)
- Features list
- Setup steps
- Code examples
- Benefits
Format as JSON with: { name, description, category, difficulty, features, setupSteps, codeExample, benefits }`,

  documentation: `Create technical documentation with the following structure:
- Document title
- Category
- Overview/introduction
- Prerequisites
- Step-by-step instructions
- Code examples
- Troubleshooting section
- Related topics
Format as JSON with: { title, category, overview, prerequisites, instructions, codeExamples, troubleshooting, relatedTopics }`
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contentType, topic, additionalInstructions } = await req.json();

    if (!contentType || !topic) {
      return new Response(
        JSON.stringify({ error: 'Content type and topic are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const basePrompt = contentPrompts[contentType as keyof typeof contentPrompts];
    if (!basePrompt) {
      return new Response(
        JSON.stringify({ error: 'Invalid content type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const fullPrompt = `Topic: "${topic}"

${basePrompt}

${additionalInstructions ? `Additional Instructions: ${additionalInstructions}` : ''}

Important: 
- Ensure all content is professional and high-quality
- Make it relevant to a multi-vendor e-commerce platform with booking capabilities
- Include specific examples and practical information
- Return ONLY valid JSON without any markdown formatting or code blocks`;

    console.log('Sending request to OpenAI for content type:', contentType);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional content writer specializing in e-commerce and technology content. Always respond with valid JSON format as requested. Do not use markdown code blocks or backticks in your response.'
          },
          {
            role: 'user',
            content: fullPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to generate content' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Generated content:', generatedContent);

    // Clean and parse the JSON response from OpenAI
    let cleanedContent = generatedContent.trim();
    
    // Remove markdown code blocks if present
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    console.log('Cleaned content before parsing:', cleanedContent);
    
    let parsedContent;
    try {
      parsedContent = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw content that failed to parse:', generatedContent);
      return new Response(
        JSON.stringify({ 
          error: 'Generated content was not in valid JSON format',
          rawContent: generatedContent,
          parseError: parseError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        content: parsedContent,
        contentType,
        topic 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-ai-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});