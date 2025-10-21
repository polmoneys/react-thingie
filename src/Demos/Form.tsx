import { useRef } from 'react';

import { z } from 'zod';

import Alert from '../Dumb/Alert';
import Button from '../Dumb/Button';
import Checkbox from '../Dumb/Checkbox';
import Font from '../Dumb/Font';
import UncontrolledForm, { type UncontrolledFormHandle } from '../Dumb/Form';
import Group from '../Dumb/Group';
import TextInputUncontrolled from '../Dumb/InputText/Uncontrolled';
import GridTemplateColumns from '../Inspired/GridTemplateColumns';
import useResizeObserver from '../utilities/useResizeObserver';

const MyFormSchema = z.object({
    email: z.email({ message: 'Invalid email' }),
    age: z.coerce
        .number()
        .int()
        .positive()
        .refine((n) => Number.isFinite(n), { message: 'Age must be a number' }),
    contact: z.enum(['email', 'phone']),
    agree: z
        .boolean()
        .refine((v) => v === true, { message: 'You must agree to terms' }),
    dob: z.string().date('Date of birth is required'),
});

type MyFormShape = z.infer<typeof MyFormSchema>;

export default function FormDemos() {
    const handleSubmit = async (payload: MyFormShape) => {
        console.log('VALID SUBMIT', payload);
        await new Promise((r) => setTimeout(r, 400));
    };

    const formRef = useRef<UncontrolledFormHandle<MyFormShape> | null>(null);

    const valueTransform = (name: string, raw: any) => {
        if (typeof raw === 'string') {
            const trimmed = raw.trim();
            if (name === 'email') return trimmed.toLowerCase();
            return trimmed;
        }
        return raw;
    };

    const referenceRef = useRef<HTMLFieldSetElement | null>(null);
    const { width } = useResizeObserver(referenceRef);
    const isXS = width === undefined ? false : width < 500;

    return (
        <>
            <UncontrolledForm<MyFormShape>
                ref={formRef}
                validate={MyFormSchema}
                onSubmit={handleSubmit}
                valueTransform={valueTransform}
            >
                {({
                    errors,
                    // submitting, submit
                }) => (
                    <Group.Col gap="var(--gap-3)">
                        <TextInputUncontrolled
                            id="email"
                            name="email"
                            defaultValue=""
                            label="Email"
                            style={{ gap: 'var(--gap-2)' }}
                            errorToDisplay={errors.email}
                            gridTemplateColumns={
                                isXS || errors.email ? '1fr' : '80px 1fr'
                            }
                        />

                        <TextInputUncontrolled
                            id="age"
                            name="age"
                            defaultValue=""
                            label="Age"
                            errorToDisplay={errors.age}
                            style={{ gap: 'var(--gap-2)' }}
                            gridTemplateColumns={
                                isXS || errors.age ? '1fr' : '80px 1fr'
                            }
                        />
                        <fieldset ref={referenceRef}>
                            <legend>Preferred contact</legend>
                            <label>
                                <input
                                    type="radio"
                                    name="contact"
                                    value="email"
                                    defaultChecked
                                    aria-describedby={
                                        errors.contact
                                            ? 'contact-error'
                                            : undefined
                                    }
                                />
                                Email
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="contact"
                                    value="phone"
                                    aria-describedby={
                                        errors.contact
                                            ? 'contact-error'
                                            : undefined
                                    }
                                />
                                Phone
                            </label>
                            {errors.contact && (
                                <Alert id="contact-error">
                                    <Font> {errors.contact}</Font>
                                </Alert>
                            )}
                        </fieldset>

                        <GridTemplateColumns
                            dangerous={{
                                alignItems: 'center',
                                placeContent: 'center',
                            }}
                            gridTemplateColumns={{
                                xs: errors.agree || isXS ? '1fr' : '48px 1fr',
                            }}
                            gap={{ xs: 'var(--gap-2)' }}
                        >
                            <Checkbox
                                label="I agree to terms"
                                name="agree"
                                aria-describedby={
                                    errors.agree ? 'agree-error' : undefined
                                }
                            >
                                {errors.agree && (
                                    <Alert id="agree-error">
                                        <Font>{errors.agree}</Font>
                                    </Alert>
                                )}
                            </Checkbox>
                        </GridTemplateColumns>

                        <GridTemplateColumns
                            dangerous={{ alignItems: 'center' }}
                            gridTemplateColumns={{
                                xs: errors.dob || isXS ? '1fr' : '120px 1fr',
                            }}
                            gap={{ xs: 'var(--gap-2)' }}
                            breakEqualHeight
                        >
                            <label htmlFor="dob">Date of birth</label>
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                aria-describedby={
                                    errors.dob ? 'dob-error' : undefined
                                }
                                aria-invalid={!!errors.dob}
                            />
                            {errors.dob && (
                                <Alert id="dob-error">
                                    <Font> {errors.dob}</Font>
                                </Alert>
                            )}
                        </GridTemplateColumns>
                    </Group.Col>
                )}
            </UncontrolledForm>
            <br />
            <Group.Row gap="var(--gap-3)" flexWrap="wrap">
                <Button type="submit" onClick={() => formRef.current?.submit()}>
                    Submit
                </Button>
                <Button
                    onClick={async () => {
                        const ok = await formRef.current?.validate();
                        console.log('valid?', ok);
                        console.log('values', formRef.current?.getValues());
                    }}
                >
                    Validate
                </Button>
            </Group.Row>
        </>
    );
}
