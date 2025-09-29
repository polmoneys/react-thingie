import Button from '../Button';
import Grid from '../Grid';

import Card from '.';

export default function CardsGrid() {
    return (
        <>
            <Grid width="25em" m="var(--gap-3) 0">
                <Card
                    component="div"
                    ratio="portrait"
                    gradient={`#fff 0, #fff 70px, var(--grey-4) 70px, var(--grey-4) calc(100% - 87px), var(--grey-3) calc(100% - 87px), var(--grey-3) 100%`}
                >
                    <Card.Title>Lorem ipsun dolor</Card.Title>
                    {/*<Card.Content>
                </Card.Content>*/}
                    <p>
                        Lorem ipsun dolor sit amet indisciplinctur gloria at
                        est.{' '}
                    </p>
                    <Card.Actions>
                        <Button>Add</Button>
                    </Card.Actions>
                </Card>

                <Card component="div" ratio="portrait">
                    <Card.Title>Lorem ipsun</Card.Title>
                    <Card.Media
                        ratio="portrait"
                        alt="Plant portrait"
                        src="https://images.unsplash.com/photo-1521206698660-5e077ff6f9c8?q=80&w=2786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                </Card>
                <Card component="div" ratio="portrait">
                    <Card.Player
                        ratio="portrait"
                        sources={{
                            mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
                        }}
                        controls
                    />
                </Card>

                {/*<Card as="div">
                    <Card.Video
                        // fitInParent
                        width="220px"
                        height="200px"
                        ratio="portrait"
                        sources={{
                            mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
                        }}
                    />
                </Card>*/}
            </Grid>
            <Grid width="17em" m="var(--gap-3) 0">
                <Card component="div" ratio="landscape">
                    <Card.Title>Lorem ipsun</Card.Title>
                    <Card.Media
                        alt="Plant landscape"
                        src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                </Card>

                <Card
                    component="div"
                    ratio="landscape"
                    dangerous={{
                        backgroundColor: 'var(--black)',
                        placeContent: 'center',
                    }}
                >
                    <Card.Player
                        ratio="landscape"
                        sources={{
                            mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
                        }}
                        controls
                    />
                </Card>

                <Card component="div" ratio="landscape">
                    <Card.Video
                        // fitInParent
                        width="220px"
                        height="200px"
                        ratio="landscape"
                        sources={{
                            mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
                        }}
                    />
                </Card>
            </Grid>
        </>
    );
}
