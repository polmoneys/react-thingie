## Mua

A `Mua` will adapt to it's parent width, stacking itself if needed.

```tsx

<Mua>
    <Shape.Circle size={36} />
    <p>AAAAAA</p>
</Mua>

<Mua>
    <p>AAAAAA</p>
    <Shape.Circle size={36} />
</Mua>

<Mua>
    <Shape.Circle size={36} />
    <p
        className='clamp'
        style={{ '--clamp-lines': 1 } as CSSProperties}
    >
        BBBBBBBBBBBBBBBBBB
    </p>
</Mua>

<Mua>
    <p
      className='clamp'
        style={{ '--clamp-lines': 1 } as CSSProperties}
    >
        BBBBBBBBBBBBBBBBBB
    </p>
    <Shape.Circle size={36} />
</Mua>

```

## Credits

[Ahmad Shadeed was who showed me the magic](https://ishadeed.com/)
