import Alert from '../Dumb/Alert';
import Button from '../Dumb/Button';
import Font from '../Dumb/Font';
import Icon from '../Dumb/Icon';
import ToolBar from '../Dumb/Toolbar';
import GridTemplateColumns from '../Inspired/GridTemplateColumns';
import useLifeboats from '../Inspired/useLifeboat';

export default function DemoLifeboats() {
    const {
        // lifeboats,
        getLifeboat,
        create,
        update,
        remove,
        removeAll,
        isCreating,
    } = useLifeboats();

    const onCritical = async () => {
        await create('critical-data', 'Critical value', true);
    };
    const createDraft = async () => {
        await create(
            'draft-1',
            JSON.stringify({ title: 'My draft title', content: 'Some text' }),
        );
    };
    const updateDraft = async () => {
        await update(
            'draft-1',
            JSON.stringify({
                title: 'Updated draft title',
                content: 'New text',
            }),
        );
    };

    const complexLifeboat = getLifeboat('draft-1');

    const parsedValue = complexLifeboat
        ? JSON.parse(complexLifeboat.value as string)
        : null;

    const onClearAll = async () => {
        await removeAll();
    };

    const onRemoveDraft = async () => {
        await remove('draft-1');
    };

    const hasCriticalValue = getLifeboat('critical-data');

    // console.log({
    //     lifeboats,
    //     parsedValue,
    //     hasCriticalValue,
    // });

    return (
        <>
            <ToolBar
                label="Manage lifeboats"
                dangerous={{ gap: 'var(--gap-2)', flexWrap: 'wrap' }}
            >
                <Button.Positive onClick={createDraft}>
                    Create Draft
                </Button.Positive>
                <Button.Positive onClick={updateDraft}>
                    Update Draft
                </Button.Positive>
                <Button.Negative isIcon onClick={onRemoveDraft}>
                    Clear Draft
                </Button.Negative>
                <Button.Negative isIcon onClick={onClearAll}>
                    Clear All
                </Button.Negative>
                <Button.Positive
                    onClick={onCritical}
                    disabled={hasCriticalValue !== undefined}
                >
                    {hasCriticalValue === undefined ? (
                        'Set critical info'
                    ) : (
                        <Icon.Info size={28} />
                    )}
                </Button.Positive>
            </ToolBar>
            <br />

            <GridTemplateColumns
                gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
                gap={{ xs: 'var(--gap-4)' }}
            >
                {parsedValue != null && (
                    <>
                        <Alert mood="positive" fitContent>
                            <Font>{parsedValue.title}</Font>
                        </Alert>
                    </>
                )}

                {hasCriticalValue !== undefined && (
                    <>
                        <br />
                        <Alert fitContent>
                            <Font>
                                {typeof hasCriticalValue?.value === 'string'
                                    ? hasCriticalValue.value
                                    : ''}
                            </Font>
                        </Alert>
                    </>
                )}
            </GridTemplateColumns>

            {isCreating && (
                <>
                    <br />
                    <Icon.LoadingBar />
                </>
            )}
        </>
    );
}
