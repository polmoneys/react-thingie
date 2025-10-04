export const getFormDataFromEvent = (
    event: React.FormEvent<HTMLFormElement>,
): { [k: string]: FormDataEntryValue } => {
    const formData = new FormData(event.target as HTMLFormElement);
    return Object.fromEntries(formData);
};
