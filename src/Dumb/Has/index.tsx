import { createElement, type CSSProperties, useMemo } from 'react';

import { toKebabCase } from '../../utilities/string';

import type { CSSValue, HasProps } from './interfaces';

/*

        <Has
          baseVars={{
            primaryColor: "var(--primary)",
            lightColor: "var(--light)",
            darkColor: "var(--dark)",
            spacing: '16px'
          }}
          conditions={[
            {
              has: 'img',
              styles: {
                border: '3px solid var(--primary)',
                borderRadius: '8px',
                padding: 'var(--spacing)'
              },
              vars: {
                containerShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }
            },
            {
              has: 'footer',
              styles: {
                backgroundColor: 'var(--light)'
              },
              vars: {
                spacing: '24px'
              }
            },
            {
              has: 'button',
              styles: {
                boxShadow: 'var(--container-shadow, 0 4px 6px rgba(0,0,0,0.1))'
              }
            }
          ]}
        >
          {...}
        </Has>

*/

export default function Has({
    conditions,
    children,
    className = '',
    component: Component = 'div',
    baseVars = {},
}: HasProps) {
    const { styleTag, containerClass, inlineVars } = useMemo(() => {
        const uniqueId = `cs-${Math.random().toString(36).substr(2, 9)}`;
        const containerClass = `conditional-${uniqueId}`;

        const cssRules: string[] = [];
        const inlineVars: Record<string, CSSValue> = {};

        Object.entries(baseVars).forEach(([key, value]) => {
            const varName = key.startsWith('--')
                ? key
                : `--${toKebabCase(key)}`;
            inlineVars[varName] = value;
        });

        conditions.forEach((condition) => {
            const rules: string[] = [];

            if (condition.styles) {
                Object.entries(condition.styles).forEach(([key, value]) => {
                    const cssKey = toKebabCase(key);
                    rules.push(`  ${cssKey}: ${value};`);
                });
            }

            if (condition.vars) {
                Object.entries(condition.vars).forEach(([key, value]) => {
                    const varName = key.startsWith('--')
                        ? key
                        : `--${toKebabCase(key)}`;
                    rules.push(`  ${varName}: ${value};`);
                });
            }

            if (rules.length > 0) {
                cssRules.push(
                    `.${containerClass}:has(${condition.has}) {\n${rules.join('\n')}\n}`,
                );
            }
        });

        const styleTag =
            cssRules.length > 0 ? <style>{cssRules.join('\n\n')}</style> : null;

        return { styleTag, containerClass, inlineVars };
    }, [conditions, baseVars]);

    const styleWithVars =
        Object.keys(inlineVars).length > 0
            ? (inlineVars as CSSProperties)
            : undefined;

    return (
        <>
            {styleTag}
            {createElement(
                Component,
                {
                    className: `${containerClass} ${className}`,
                    style: styleWithVars,
                },
                children,
            )}
        </>
    );
}
