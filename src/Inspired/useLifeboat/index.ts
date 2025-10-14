import { useCallback } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createLifeboat,
    deleteAllLifeboats,
    deleteLifeboat,
    getAllLifeboats,
    updateLifeboat,
} from './utils';

const QUERY_KEY = ['lifeboats'];

export default function useLifeboats() {
    const queryClient = useQueryClient();

    const {
        data: lifeboats = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: getAllLifeboats,
    });

    const getLifeboat = useCallback(
        (key: string) => {
            return lifeboats.find((lb) => lb.key === key);
        },
        [lifeboats],
    );

    const createMutation = useMutation({
        mutationFn: ({
            key,
            value,
            critical = false,
        }: {
            key: string;
            value: string | number | Array<unknown> | null;
            critical?: boolean;
        }) => createLifeboat(key, value, critical),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({
            key,
            value,
        }: {
            key: string;
            value: string | number | Array<unknown> | null;
        }) => updateLifeboat(key, value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (key: string) => deleteLifeboat(key),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
    });

    const deleteAllMutation = useMutation({
        mutationFn: deleteAllLifeboats,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
    });

    const create = useCallback(
        (
            key: string,
            value: string | number | Array<unknown> | null,
            critical = false,
        ) => {
            return createMutation.mutateAsync({ key, value, critical });
        },
        [createMutation],
    );

    const update = useCallback(
        (key: string, value: string | number | Array<unknown> | null) => {
            return updateMutation.mutateAsync({ key, value });
        },
        [updateMutation],
    );
    const remove = useCallback(
        (key: string) => {
            return deleteMutation.mutateAsync(key);
        },
        [deleteMutation],
    );

    const removeAll = useCallback(() => {
        return deleteAllMutation.mutateAsync();
    }, [deleteAllMutation]);

    return {
        lifeboats,
        isLoading,
        error,

        getLifeboat,

        create,
        update,
        remove,
        removeAll,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isDeletingAll: deleteAllMutation.isPending,
    };
}
