import { useState } from 'react';

import Font from '../Font';
import Grid from '../Grid';
import Radio from '../Radio';
import Shape from '../Shape';

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
                                <div
                                    className="ratio portrait"
                                    style={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        placeContent: 'center',
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,.1)',
                                    }}
                                >
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font>Alpha</Font>
                                    )}
                                </div>
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
                                <div
                                    className="ratio portrait"
                                    style={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        placeContent: 'center',
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,.1)',
                                    }}
                                >
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font>Beta</Font>
                                    )}
                                </div>
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
                                <div
                                    className="ratio portrait"
                                    style={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        placeContent: 'center',
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,.1)',
                                    }}
                                >
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font>Delta</Font>
                                    )}
                                </div>
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
                                <div
                                    className="ratio portrait"
                                    style={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        placeContent: 'center',
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,.1)',
                                    }}
                                >
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font>Epsilon</Font>
                                    )}
                                </div>
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
                                <div
                                    className="ratio landscape"
                                    style={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        placeContent: 'center',
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,.1)',
                                    }}
                                >
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font>Alpha</Font>
                                    )}
                                </div>
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
                                <div
                                    className="ratio landscape"
                                    style={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        placeContent: 'center',
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,.1)',
                                    }}
                                >
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font>Beta</Font>
                                    )}
                                </div>
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
                                <div
                                    className="ratio landscape"
                                    style={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        placeContent: 'center',
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,.1)',
                                    }}
                                >
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font>Delta</Font>
                                    )}
                                </div>
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
                                <div
                                    className="ratio landscape"
                                    style={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        placeContent: 'center',
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,.1)',
                                    }}
                                >
                                    {checked ? (
                                        <Shape.Circle />
                                    ) : (
                                        <Font>Epsilon</Font>
                                    )}
                                </div>
                            );
                        }}
                    </Radio>
                </div>
            </Grid>
        </>
    );
}
