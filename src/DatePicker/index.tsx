import type {
    DatePickerProps,
    DateValue,
    ValidationResult,
} from 'react-aria-components';
import {
    Button,
    Calendar,
    CalendarCell,
    CalendarGrid,
    DateInput,
    DatePicker,
    DateSegment,
    Dialog,
    FieldError,
    Group,
    Heading,
    Label,
    Popover,
    Text,
} from 'react-aria-components';

import Icon from '../Dumb/Icon';

interface MyDatePickerProps<T extends DateValue> extends DatePickerProps<T> {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
}

export default function DatePick<T extends DateValue>({
    label,
    description,
    errorMessage,
    firstDayOfWeek,
    ...props
}: MyDatePickerProps<T>) {
    return (
        <DatePicker {...props}>
            <Label>{label}</Label>
            <Group>
                <DateInput>
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <Button>
                    <Icon.ChevronDown size={20} />
                </Button>
            </Group>
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
            <Popover>
                <Dialog>
                    <Calendar firstDayOfWeek={firstDayOfWeek}>
                        <header
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <Button slot="previous" style={{ border: 'none' }}>
                                <Icon.Chevron rotate={180} size={20} />
                            </Button>
                            <Heading style={{ flexGrow: 1 }} />
                            <Button slot="next" style={{ border: 'none' }}>
                                <Icon.Chevron size={20} />
                            </Button>
                        </header>
                        <CalendarGrid style={{ width: '100%' }}>
                            {(date) => (
                                <CalendarCell
                                    date={date}
                                    style={({
                                        isSelected,
                                        isOutsideMonth,
                                    }) => ({
                                        display: isOutsideMonth ? 'none' : '',
                                        textAlign: 'center',
                                        cursor: 'default',
                                        background: isSelected
                                            ? 'var(--neutral)'
                                            : '',
                                    })}
                                />
                            )}
                        </CalendarGrid>
                    </Calendar>
                </Dialog>
            </Popover>
        </DatePicker>
    );
}
