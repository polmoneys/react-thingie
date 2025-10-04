/*
const pluralizePost = pluralize('post')
console.log(pluralizePost(1)) // 'post'
console.log(pluralizePost(2)) // 'posts'
const pluralizeMouse = pluralize('mouse', 'mice')
*/

export const pluralize =
    (singular: string, plural = `${singular}s`) =>
    (quantity: number) =>
        Math.abs(quantity) === 1 ? singular : plural;
