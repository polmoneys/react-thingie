import { useState } from 'react';

import Button from '../Dumb/Button';
import Font from '../Dumb/Font';
import Icon from '../Dumb/Icon';
import TextInputLabel from '../Dumb/InputText';
import PopoverLite from '../Dumb/Popover/Lite';

import useStream from './useStream';

import styles from './index.module.css';

export default function StreamPrompt() {
    const [input, setInput] = useState('');

    const { mutation } = useStream();

    const onSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        mutation.mutate({ userMessage: trimmed });
        setInput('');
    };

    return (
        <div className={styles.prompt}>
            <PopoverLite
                id="menu-test"
                label={
                    <>
                        <Font.Bold>Tools</Font.Bold>
                        <Icon.ChevronDown size={22} />
                    </>
                }
            >
                {() => (
                    <>
                        <Button onClick={() => console.log('a')}>File</Button>
                        <Button onClick={() => console.log('b')}>Speak</Button>
                        <Button onClick={() => console.log('c')}>Think</Button>
                    </>
                )}
            </PopoverLite>
            <TextInputLabel
                label=""
                id="prompt-input"
                onChange={() => ({})}
                placeholder="Type your message..."
                value={input}
                onChangeNative={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        onSend();
                    }
                }}
                disabled={mutation.isPending}
            />
            <Button.Positive
                dangerous={{
                    justifySelf: 'stretch',
                    alignSelf: 'stretch',
                    maxWidth: 'auto',
                    width: 'auto',
                }}
                onClick={onSend}
                disabled={mutation.isPending || !input.trim()}
            >
                Send
            </Button.Positive>
        </div>
    );
}
