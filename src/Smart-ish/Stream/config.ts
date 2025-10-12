import OpenAI from 'openai';

export const openai = new OpenAI({
    baseURL: 'http://127.0.0.1:1234/v1',
    apiKey: 'lm-studio',
    dangerouslyAllowBrowser: true,
    // instructions: 'You are a coding assistant',
});
