export function getTypeByValue(value: any): string {
    const valueType = typeof value;
    switch (valueType) {
        case 'number':
            if (Number.isNaN(value)) {
                return 'NaN';
            }
            if (!Number.isFinite(value)) {
                return 'Infinity';
            }
            if (value !== Math.floor(value)) {
                return 'float';
            }

            return 'number';
        case 'object':
            if (value === null) {
                return 'null';
            }

            return value.constructor.name;
        default:
            return valueType;
    }
}
