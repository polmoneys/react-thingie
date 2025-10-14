Edit an item in any shape with ease.

```tsx
type UserServer = {
    id: number;
    name: string;
    birthDate: string; // ISO string
    address: { city: string; zip: string };
};

type UserDraft = {
    id: number;
    name: string;
    birthDate: Date | null;
    city: string;
    zip: string;
};

const mapper = {
    toDraft: (s: UserServer): UserDraft => ({
        id: s.id,
        name: s.name,
        birthDate: s.birthDate ? new Date(s.birthDate) : null,
        city: s.address?.city ?? '',
        zip: s.address?.zip ?? '',
    }),
    fromDraft: (d: UserDraft): UserServer => ({
        id: d.id,
        name: d.name,
        birthDate: d.birthDate ? d.birthDate.toISOString() : '',
        address: { city: d.city, zip: d.zip },
    }),
};

const serverUser: UserServer = {
    id: 1,
    name: 'Alice',
    birthDate: '2022-05-11T12:00:00Z',
    address: { city: 'Paris', zip: '75000' },
};

const editor = useItem<UserServer, UserDraft>(serverUser, { mapper });

// gives you a UserServer payload you can send directly.
const payload = editor.commit();
```
