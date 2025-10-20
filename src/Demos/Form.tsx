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
                            label="email"
                            style={{ gap: 'var(--gap-2)' }}
                            errorToDisplay={errors.email}
                            gridTemplateColumns={
                                !errors.email ? '100px 1fr' : '1fr'
                            }
                        />

                        <TextInputUncontrolled
                            id="age"
                            name="age"
                            defaultValue=""
                            label="age"
                            errorToDisplay={errors.age}
                            style={{ gap: 'var(--gap-2)' }}
                            gridTemplateColumns={
                                !errors.age ? '100px 1fr' : '1fr'
                            }
                        />
                        <fieldset>
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
                                xs: !errors.agree ? '48px 1fr' : '1fr',
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
                                xs: !errors.dob ? '120px 1fr' : '1fr',
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
            <Group.Row gap="var(--gap-3)">
                <Button type="submit" onClick={() => formRef.current?.submit()}>
                    Submit from parent
                </Button>
                <Button
                    onClick={async () => {
                        const ok = await formRef.current?.validate();
                        console.log('valid?', ok);
                        console.log('values', formRef.current?.getValues());
                    }}
                >
                    Validate & Log All Values
                </Button>
            </Group.Row>
        </>
    );
}
