/*
  const { getById, getByIds } = useIndexById(ARRAY);

  const id5option = getById(5);
  const optionsByIds = getByIds([1, 3, 5]);

*/
type Option = { id: number; name: string; featured: boolean };

type IndexByIdHook = {
    getById: (id: number) => Option | undefined;
    getByIds: (ids: number[]) => Option[];
};

export default function useIndexById(data: Option[]): IndexByIdHook {
    const indexById = data.reduce(
        (acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        },
        {} as Record<number, Option>,
    );

    const getById = (id: number): Option | undefined => indexById[id];

    const getByIds = (ids: number[]): Option[] =>
        ids.map((id) => getById(id)).filter(Boolean) as Option[];

    return {
        getById,
        getByIds,
    };
}
