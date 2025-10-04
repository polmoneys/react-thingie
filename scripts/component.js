#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const rawArgs = process.argv.slice(2);
const cssFlag = rawArgs.includes('--css');
const forceFlag = rawArgs.includes('--force');
const args = rawArgs.filter((a) => !['--css', '--force'].includes(a));
const filePath = args[0];

if (!filePath) {
    console.error(
        'Usage: npm run component -- <path/to/Name.tsx> [--css] [--force]',
    );
    process.exit(1);
}

const resolved = path.resolve(filePath);

// base file name without extension
let base = path.basename(resolved).replace(/\.tsx?$/i, '');
const dir = path.dirname(resolved);

// if user passed an index file, use the parent folder name instead
if (base.toLowerCase() === 'index') {
    base = path.basename(path.dirname(resolved)) || base;
}

function toPascalCase(name) {
    const parts = name.split(/[^0-9a-zA-Z]+/).filter(Boolean);
    if (parts.length === 0) return 'Component';
    const pascal = parts
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join('');
    if (/^[0-9]/.test(pascal)) return '_' + pascal;
    if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(pascal)) {
        const cleaned = pascal.replace(/[^A-Za-z0-9_$]/g, '');
        return cleaned || 'Component';
    }
    return pascal;
}

const componentName = toPascalCase(base);

const content = `import {type ReactNode} from 'react'
${cssFlag ? `import styles from './index.module.css';\n\n` : ''};

interface ${componentName}Props {
  children: ReactNode;
}

export default function ${componentName}(props:${componentName}Props) {
  const {children} = props;

  return (
    <>
      {children}
    </>
  );
}
`;

const cssContent = `/* <3 CSS | ${componentName} */
.root {

}
`;

async function main() {
    await fs.mkdir(dir, { recursive: true });

    // write component file
    let componentCreated = false;
    try {
        if (forceFlag) {
            await fs.writeFile(resolved, content, { encoding: 'utf8' });
            console.log('Created/Overwritten', resolved);
            componentCreated = true;
        } else {
            await fs.writeFile(resolved, content, {
                encoding: 'utf8',
                flag: 'wx',
            });
            console.log('Created', resolved);
            componentCreated = true;
        }
    } catch (err) {
        if (err && err.code === 'EEXIST') {
            console.log('Component file already exists:', resolved);
        } else {
            console.error('Error writing component file:', err);
            process.exit(1);
        }
    }

    if (cssFlag) {
        const cssPath = path.join(dir, 'index.module.css');
        try {
            if (forceFlag) {
                await fs.writeFile(cssPath, cssContent, { encoding: 'utf8' });
                console.log('Created/Overwritten', cssPath);
            } else {
                await fs.writeFile(cssPath, cssContent, {
                    encoding: 'utf8',
                    flag: 'wx',
                });
                console.log('Created', cssPath);
            }
        } catch (err) {
            if (err && err.code === 'EEXIST') {
                console.log('CSS file already exists:', cssPath);
            } else {
                console.error('Error writing CSS file:', err);
                process.exit(1);
            }
        }

        // If the component already existed and we didn't overwrite it, ensure it imports the css
        if (!componentCreated && !forceFlag) {
            try {
                const existing = await fs.readFile(resolved, 'utf8');
                const importRe =
                    /import\s+styles\s+from\s+['"]\.\/index\.module\.css['"]/;
                if (!importRe.test(existing)) {
                    const updated = cssImportLine + existing;
                    await fs.writeFile(resolved, updated, { encoding: 'utf8' });
                    console.log(
                        'Updated component to import index.module.css:',
                        resolved,
                    );
                } else {
                    console.log('Component already imports index.module.css.');
                }
            } catch (err) {
                console.error(
                    'Error updating existing component file to add CSS import:',
                    err,
                );
                process.exit(1);
            }
        }
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
