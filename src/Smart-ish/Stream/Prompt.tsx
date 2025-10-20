import { useState } from 'react';

import Button from '../../Dumb/Button';
import TextInputLabel from '../../Dumb/InputText';
import Select from '../../Dumb/Select';

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
            <Select
                className="theme-inset"
                placeholder="Choose"
                onChange={() => ({})}
                // value={newType}
                // onChange={(e) => setNewType(e as NodeType)}
            >
                <option value="file">File</option>
                <option value="folder">Folder</option>
            </Select>

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
