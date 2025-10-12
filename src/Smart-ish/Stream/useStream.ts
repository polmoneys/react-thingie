import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    MODEL_OPENAI,
    QUERY_KEY_STREAM,
    QUERY_KEY_STREAM_CHAT,
    QUERY_KEY_STREAM_HISTORY,
} from '../../utilities/queryClient';

import { openai } from './config';
import type { ChatMessage } from './interfaces';

export default function useStream() {
    const qc = useQueryClient();

    const { data: streamedText = '' } = useQuery<string>({
        queryKey: [QUERY_KEY_STREAM_CHAT, QUERY_KEY_STREAM],
        queryFn: async () =>
            qc.getQueryData<string>([
                QUERY_KEY_STREAM_CHAT,
                QUERY_KEY_STREAM,
            ]) ?? '',
        initialData: '',
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const { data: history = [] } = useQuery<ChatMessage[]>({
        queryKey: [QUERY_KEY_STREAM_CHAT, QUERY_KEY_STREAM_HISTORY],
        queryFn: async () =>
            qc.getQueryData<ChatMessage[]>([
                QUERY_KEY_STREAM_CHAT,
                QUERY_KEY_STREAM_HISTORY,
            ]) ?? [],
        initialData: [],
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation<string, Error, { userMessage: string }>({
        mutationFn: async ({ userMessage }) => {
            // reset stream buffer
            qc.setQueryData<string>(
                [QUERY_KEY_STREAM_CHAT, QUERY_KEY_STREAM],
                '',
            );

            // store user's message immediately
            qc.setQueryData<ChatMessage[]>(
                [QUERY_KEY_STREAM_CHAT, QUERY_KEY_STREAM_HISTORY],
                (old = []) => [...old, { role: 'user', content: userMessage }],
            );

            const stream = await openai.chat.completions.create({
                model: MODEL_OPENAI,
                messages: [{ role: 'user', content: userMessage }],
                stream: true,
            });

            let final = '';

            // iterate the stream and append partial chunks to cache
            for await (const chunk of stream) {
                const content = chunk?.choices?.[0]?.delta?.content;
                if (content) {
                    final += content;
                    qc.setQueryData<string>(
                        [QUERY_KEY_STREAM_CHAT, QUERY_KEY_STREAM],
                        (old = '') => old + content,
                    );
                }
            }

            // append final assistant reply to history
            qc.setQueryData<ChatMessage[]>(
                [QUERY_KEY_STREAM_CHAT, QUERY_KEY_STREAM_HISTORY],
                (old = []) => [
                    ...old,
                    {
                        role: 'assistant',
                        content:
                            final.trim() === ''
                                ? 'Can not respond right now'
                                : final,
                    },
                ],
            );

            return final;
        },
        onSuccess: (
            data,
            // , { userMessage }
        ) => {
            if (data === '') throw new Error('Can not reach LLM');
        },
        onError: (error) => {
            throw new Error(`LLM says ${error.message}`);
        },
    });

    return { mutation, streamedText, history };
}
