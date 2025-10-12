export type ChatMessage = { role: 'user' | 'assistant'; content: string };

export type ChatMessages = Array<ChatMessage>;
