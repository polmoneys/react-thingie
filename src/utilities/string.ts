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

export const toKebabCase = (str: string): string =>
    str.replace(/([A-Z])/g, '-$1').toLowerCase();

export const a_Z = () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[~~(26 * Math.random())];

const customLog = console.log.bind(document);
export const OMG = (input: string) => customLog('======>', input, '<======');
