import Card from '../Dumb/Card';
import Font from '../Dumb/Font';
import Group from '../Dumb/Group';

import StreamAnswer from './Answer';
import useStream from './useStream';

export default function StreamHistory() {
    const { history } = useStream();

    return (
        <Group flexDirection="column" gap={'var(--gap-3)'}>
            {history.map((m, i: number) => (
                <Card
                    component="article"
                    key={i}
                    dangerous={{
                        alignSelf:
                            m.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: 'min(65%, 750px)',
                        padding: 'var(--gap-3)',
                        borderRadius: 'var(--border-radius)',
                        background:
                            m.role === 'user'
                                ? 'var(--neutral)'
                                : 'var(--negative)',
                    }}
                >
                    <Card.Title dangerous={{ padding: 0 }}>
                        <Font size="xs">{m.role}</Font>
                    </Card.Title>
                    <Card.Content dangerous={{ padding: 0 }}>
                        <StreamAnswer
                            content={`${m.content.slice(0, m.role === 'user' ? m.content.length : 130)}${m.role !== 'user' ? '...' : ''}`}
                            lite
                        />
                    </Card.Content>
                </Card>
            ))}
        </Group>
    );
}
