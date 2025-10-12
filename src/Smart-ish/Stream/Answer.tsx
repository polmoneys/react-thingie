// import { renderToString } from 'react-dom/server';
import { MarkdownHooks } from 'react-markdown';
import rehypeMermaid from 'rehype-mermaid';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import Alert from '../../Dumb/Alert';
import Font from '../../Dumb/Font';
import Group from '../../Dumb/Group';
import { clsx } from '../../utils';

import styles from './index.module.css';

// const md = `
// \`\`\`mermaid
// graph LR
// A --> B
// \`\`\`
// `;

export default function StreamAnswer({
    lite = false,
    content,
}: {
    lite?: boolean;
    content: string;
}) {
    if (content.trim() === '')
        return (
            <>
                <br />
                <Alert mood="negative">
                    <Font.Bold>No active stream</Font.Bold>
                </Alert>
            </>
        );
    return (
        <Group
            flexDirection="column"
            className={clsx(styles.answer, lite && styles.lite)}
        >
            <MarkdownHooks
                children={content}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeMermaid]}
                components={{
                    br: ({ children }) => {
                        return children;
                    },
                    // svg: ({ node, ...props }) => {
                    //     // const svgString = renderToString(
                    //     //     <svg {...props}>{props.children}</svg>,
                    //     // );
                    //     console.log({ node });
                    //     return (
                    //         <Group
                    //             dangerous={{ cursor: 'pointer' }}
                    //             // onClick={() => onPreview(svgString)}
                    //         >
                    //             <svg {...props}>{props.children}</svg>
                    //         </Group>
                    //     );
                    // },
                    a: ({
                        //node,
                        ...props
                    }) => {
                        if (!props?.href?.startsWith('#cita'))
                            return (
                                <a
                                    href={props.href}
                                    rel="no-follower no-referer"
                                    target="_blank"
                                    {...props}
                                />
                            );
                        // const citation = citations[Number(props.children) - 1];
                        // const isFunds = citation?.source === 'funds';
                        // if (citation === undefined || isFunds) return '';
                        // return (
                        //     <CitationCard
                        //         commentId={citation?.id}
                        //         quote={citation?.quote}
                        //         source={citation?.source ?? '"managercomments"'}
                        //         id={props.children as string}
                        //         // {...(isFunds && {
                        //         //     affiliation: {
                        //         //         code: parseHierarchyRecord(citation?.quote).levelId,
                        //         //         level: parseHierarchyRecord(citation?.quote).levelLabel,
                        //         //     },
                        //         // })}
                        //     />
                        // );
                    },
                }}
            />
        </Group>
    );
}
