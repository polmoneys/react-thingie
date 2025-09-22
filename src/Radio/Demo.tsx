import { type ReactNode, useState } from 'react';

import Font from '../Font';
import Grid from '../Grid';
import Radio from '../Radio';
import Shape from '../Shape';
import { clsx } from '../utils';

const RadioCard = ({
    children,
    ratio = 'portrait',
}: {
    children: ReactNode;
    ratio?: 'portrait' | 'landscape';
}) => (
    <div
        className={clsx('ratio', ratio)}
        style={{
            display: 'grid',
            placeItems: 'center',
            placeContent: 'center',
            width: '100%',
            backgroundColor: 'var(--accent)',
            border: 'var(--border)',
            borderRadius: 'var(--border-radius)',
        }}
    >
        {children}
    </div>
);
export default function DemoRadio() {
    const [selectedRadio, setRadio] = useState<Record<string, string> | null>(
        null,
    );

    return (
        <>
            <Grid>
                <div
                    style={{
                        width: '100%',
                        // border: 'var(--border)',
                        display: 'grid',
                        gap: 'var(--gap-1)',
                        gridTemplateColumns: 'repeat(2,1fr)',
                        gridTemplateRows: 'repeat(2,1fr)',
                    }}
                >
                    <Radio
                        id="rating-1"
                        value="alpha"
                        name="rating"
                        checked={selectedRadio?.rating === 'alpha'}
                        onChangeAsString={(value) => {
                            setRadio({ rating: value });
                        }}
                    >
                        {({ checked }) => {
                            return (
                                <RadioCard>
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font.Bold>Alpha</Font.Bold>
                                    )}
                                </RadioCard>
                            );
                        }}
                    </Radio>

                    <Radio
                        id="rating-2"
                        value="beta"
                        name="rating"
                        checked={selectedRadio?.rating === 'beta'}
                        onChangeAsString={(value) => {
                            setRadio({ rating: value });
                        }}
                    >
                        {({ checked }) => {
                            return (
                                <RadioCard>
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font.Bold>Beta</Font.Bold>
                                    )}
                                </RadioCard>
                            );
                        }}
                    </Radio>

                    <Radio
                        id="rating-3"
                        value="delta"
                        name="rating"
                        checked={selectedRadio?.rating === 'delta'}
                        onChangeAsString={(value) => {
                            setRadio({ rating: value });
                        }}
                    >
                        {({ checked }) => {
                            return (
                                <RadioCard>
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font.Bold>Delta</Font.Bold>
                                    )}
                                </RadioCard>
                            );
                        }}
                    </Radio>

                    <Radio
                        id="rating-4"
                        value="epsilon"
                        name="rating"
                        checked={selectedRadio?.rating === 'epsilon'}
                        onChangeAsString={(value) => {
                            setRadio({ rating: value });
                        }}
                    >
                        {({ checked }) => {
                            return (
                                <RadioCard>
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font.Bold>Epsilon</Font.Bold>
                                    )}
                                </RadioCard>
                            );
                        }}
                    </Radio>
                </div>

                <div
                    style={{
                        width: '100%',
                        // border: 'var(--border)',
                        display: 'grid',
                        gap: 'var(--gap-1)',
                        gridTemplateColumns: 'repeat(2,1fr)',
                        gridTemplateRows: 'repeat(2,1fr)',
                    }}
                >
                    <Radio
                        id="rating-1"
                        value="alpha"
                        name="rating"
                        checked={selectedRadio?.rating === 'alpha'}
                        onChangeAsString={(value) => {
                            setRadio({ rating: value });
                        }}
                    >
                        {({ checked }) => {
                            return (
                                <RadioCard ratio={'landscape'}>
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font.Bold>Alpha</Font.Bold>
                                    )}
                                </RadioCard>
                            );
                        }}
                    </Radio>

                    <Radio
                        id="rating-2"
                        value="beta"
                        name="rating"
                        checked={selectedRadio?.rating === 'beta'}
                        onChangeAsString={(value) => {
                            setRadio({ rating: value });
                        }}
                    >
                        {({ checked }) => {
                            return (
                                <RadioCard ratio={'landscape'}>
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font.Bold>Beta</Font.Bold>
                                    )}
                                </RadioCard>
                            );
                        }}
                    </Radio>

                    <Radio
                        id="rating-3"
                        value="delta"
                        name="rating"
                        checked={selectedRadio?.rating === 'delta'}
                        onChangeAsString={(value) => {
                            setRadio({ rating: value });
                        }}
                    >
                        {({ checked }) => {
                            return (
                                <RadioCard ratio={'landscape'}>
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font.Bold>Delta</Font.Bold>
                                    )}
                                </RadioCard>
                            );
                        }}
                    </Radio>

                    <Radio
                        id="rating-4"
                        value="epsilon"
                        name="rating"
                        checked={selectedRadio?.rating === 'epsilon'}
                        onChangeAsString={(value) => {
                            setRadio({ rating: value });
                        }}
                    >
                        {({ checked }) => {
                            return (
                                <RadioCard ratio={'landscape'}>
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font.Bold>Epsilon</Font.Bold>
                                    )}
                                </RadioCard>
                            );
                        }}
                    </Radio>
                </div>
            </Grid>
        </>
    );
}
