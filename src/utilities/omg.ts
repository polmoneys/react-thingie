const customLog = console.log.bind(document);
export const OMG = (input: string) => customLog('======>', input, '<======');
