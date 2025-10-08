import { type ReactNode, useState } from 'react';

import Font from '../Dumb/Font';
import GridTemplateColumns from '../Dumb/Grid/GridTemplateColumns';
import Group from '../Dumb/Group';
import Radio from '../Dumb/Radio';
import Shape from '../Dumb/Shape';
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
            height: '100%',
            backgroundColor: 'var(--grey-80)',
            color: 'var(--white)',
            border: 'var(--border)',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow)',
        }}
    >
        {children}
    </div>
);

const RadioList = ({ children }: { children: ReactNode }) => (
    <Group.Row
        dangerous={{
            width: '100%',
            backgroundColor: 'var(--grey-80)',
            color: 'var(--white)',
            border: 'var(--border)',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow)',
            padding: 'var(--gap-1)',
            alignItems: 'center',
        }}
    >
        {children}
    </Group.Row>
);

export default function DemoRadio() {
    const [selectedRadio, setRadio] = useState<Record<string, string> | null>(
        null,
    );

    return (
        <>
            <Group.Col
                component={'form'}
                dangerous={{ maxWidth: 'min(300px,80vw)', margin: '0 auto' }}
            >
                <Radio
                    id="rating-1"
                    value="alpha"
                    name="rating-c"
                    checked={selectedRadio?.rating === 'alpha'}
                    onChangeAsString={(value) => {
                        setRadio({ rating: value });
                    }}
                >
                    {({ checked }) => {
                        return (
                            <RadioList>
                                <Shape.Circle
                                    size={42}
                                    fill={
                                        checked
                                            ? 'var(--negative)'
                                            : 'var(--white)'
                                    }
                                />
                                <Font.Bold>Option 1</Font.Bold>
                            </RadioList>
                        );
                    }}
                </Radio>

                <Radio
                    id="rating-2"
                    value="beta"
                    name="rating-c"
                    checked={selectedRadio?.rating === 'beta'}
                    onChangeAsString={(value) => {
                        setRadio({ rating: value });
                    }}
                >
                    {({ checked }) => {
                        return (
                            <RadioList>
                                <Shape.Circle
                                    size={42}
                                    fill={
                                        checked
                                            ? 'var(--negative)'
                                            : 'var(--white)'
                                    }
                                />
                                <Font.Bold>Option 2</Font.Bold>
                            </RadioList>
                        );
                    }}
                </Radio>

                <Radio
                    id="rating-3"
                    value="delta"
                    name="rating-c"
                    checked={selectedRadio?.rating === 'delta'}
                    onChangeAsString={(value) => {
                        setRadio({ rating: value });
                    }}
                >
                    {({ checked }) => {
                        return (
                            <RadioList>
                                <Shape.Circle
                                    size={42}
                                    fill={
                                        checked
                                            ? 'var(--negative)'
                                            : 'var(--white)'
                                    }
                                />
                                <Font.Bold>Option 3</Font.Bold>
                            </RadioList>
                        );
                    }}
                </Radio>

                <Radio
                    id="rating-4"
                    value="epsilon"
                    name="rating-c"
                    checked={selectedRadio?.rating === 'epsilon'}
                    onChangeAsString={(value) => {
                        setRadio({ rating: value });
                    }}
                >
                    {({ checked }) => {
                        return (
                            <RadioList>
                                <Shape.Circle
                                    size={42}
                                    fill={
                                        checked
                                            ? 'var(--negative)'
                                            : 'var(--white)'
                                    }
                                />
                                <Font.Bold>Option 4</Font.Bold>
                            </RadioList>
                        );
                    }}
                </Radio>
            </Group.Col>
            <br />
            <GridTemplateColumns
                gap={{ xs: 'var(--gap-1)' }}
                gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
                dangerous={{ maxWidth: 'min(400px, 80vw)', margin: '0 auto' }}
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
                                    <Shape.Square fill="var(--white)" />
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
                                    <Shape.Square fill="var(--white)" />
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
                                    <Shape.Square fill="var(--white)" />
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
                                    <Shape.Square fill="var(--white)" />
                                ) : (
                                    <Font.Bold>Epsilon</Font.Bold>
                                )}
                            </RadioCard>
                        );
                    }}
                </Radio>
            </GridTemplateColumns>

            <br />
            <GridTemplateColumns
                gap={{ xs: 'var(--gap-1)' }}
                gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
                dangerous={{ maxWidth: 'min(480px, 80vw)', margin: '0 auto' }}
            >
                <Radio
                    id="rating-1"
                    value="alpha"
                    name="rating-b"
                    checked={selectedRadio?.rating === 'alpha'}
                    onChangeAsString={(value) => {
                        setRadio({ rating: value });
                    }}
                >
                    {({ checked }) => {
                        return (
                            <RadioCard ratio={'landscape'}>
                                {checked ? (
                                    <Shape.Square fill="var(--white)" />
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
                    name="rating-b"
                    checked={selectedRadio?.rating === 'beta'}
                    onChangeAsString={(value) => {
                        setRadio({ rating: value });
                    }}
                >
                    {({ checked }) => {
                        return (
                            <RadioCard ratio={'landscape'}>
                                {checked ? (
                                    <Shape.Square fill="var(--white)" />
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
                    name="rating-b"
                    checked={selectedRadio?.rating === 'delta'}
                    onChangeAsString={(value) => {
                        setRadio({ rating: value });
                    }}
                >
                    {({ checked }) => {
                        return (
                            <RadioCard ratio={'landscape'}>
                                {checked ? (
                                    <Shape.Square fill="var(--white)" />
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
                    name="rating-b"
                    checked={selectedRadio?.rating === 'epsilon'}
                    onChangeAsString={(value) => {
                        setRadio({ rating: value });
                    }}
                >
                    {({ checked }) => {
                        return (
                            <RadioCard ratio={'landscape'}>
                                {checked ? (
                                    <Shape.Square fill="var(--white)" />
                                ) : (
                                    <Font.Bold>Epsilon</Font.Bold>
                                )}
                            </RadioCard>
                        );
                    }}
                </Radio>
            </GridTemplateColumns>
            <br />
        </>
    );
}
