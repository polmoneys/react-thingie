import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const QUERY_KEY_STREAM = 'stream';
export const QUERY_KEY_STREAM_CHAT = 'chat';
export const QUERY_KEY_STREAM_HISTORY = 'history';

export const MODEL_OPENAI = 'openai/gpt-oss-20b';
