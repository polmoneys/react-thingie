import { clsx } from '../../utils';

interface EmbeddedDemoProps {
    head: string;
    html: string;
    css?: string;
    js?: string;
    title?: string;
    height?: number;
    sandbox?: string;
    className?: string;
}

export function EmbeddedDemo({
    head = '',
    html,
    css = '',
    js = '',
    title = 'Demo',
    height = 400,
    sandbox = 'allow-scripts allow-same-origin',
    className,
}: EmbeddedDemoProps) {
    const srcdoc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      ${head}
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px; }
        ${css}
      </style>
    </head>
    <body>
      ${html}
      <script>
        ${js}
      </script>
    </body>
    </html>
  `;

    return (
        <iframe
            srcDoc={srcdoc}
            title={title}
            style={{
                width: '100%',
                height: `${height}px`,
            }}
            className={clsx(className)}
            sandbox={sandbox}
        />
    );
}
