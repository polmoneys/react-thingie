Wrapper for `tanstack-query` mgmt

```ts

interface StarWarsCharacter {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  url: string;
  isFavorite?: boolean;
}

async function fetchCharacters(): Promise<StarWarsCharacter[]> {
  const res = await fetch('https://swapi.dev/api/people/');
  const data = await res.json();
  return data.results;
}

function StarWarsCharacters() {
  const { data: characters } = useQuery({
    queryKey: ['starwars', 'characters'],
    queryFn: fetchCharacters
  });

  const characterHelpers = useTanstackQuery({
    queryKey: ['starwars', 'characters']
  });

  const handleToggleFavorite = (name: string) => {
    // Optimistically update favorite status
    characterHelpers.updateDataItem<StarWarsCharacter[]>(
      (char) => char.name === name,
      (char) => ({ ...char, isFavorite: !char.isFavorite })
    );

    // Then sync with your backend
    // saveFavoriteToServer(name);
  };

  const handleAddCustomCharacter = () => {
    const customChar: StarWarsCharacter = {
      name: 'Baby Yoda',
      height: '66',
      mass: '18',
      birth_year: '41BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/999/',
      isFavorite: true
    };

    characterHelpers.prependData<StarWarsCharacter[]>(customChar);
  };

  const handleRemoveCharacter = (name: string) => {
    characterHelpers.removeDataItem<StarWarsCharacter[]>(
      (char) => char.name === name
    );
  };

  const handleRefresh = async () => {
    await characterHelpers.invalidate();
  };

  return (
    <>
      {characterHelpers.isFetching && <Font>Loading the galaxy...</Font>}

      <Button onClick={handleAddCustomCharacter}>Add Baby Yoda</Button>
      <Button onClick={handleRefresh}>Refresh</Button>

      <ul>
        {characters?.map(char => (
          <li key={char.name}>
            <Font.Bold>{char.name}</Font.Bold>
            {char.isFavorite && ' ⭐'}
            <Font> - Height: {char.height}cm, Born: {char.birth_year}</Font>
            <Button onClick={() => handleToggleFavorite(char.name)}>
              {char.isFavorite ? 'Unfavorite' : 'Favorite'}
            </Button>
            <Button onClick={() => handleRemoveCharacter(char.name)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}

```

Canonical TODO example

```ts


 function TodoList() {
   const todos = useQuery({
     queryKey: ['todos'],
     queryFn: fetchTodos
   });

const state = todoHelpers.getQueryState<Todo[], CustomError>();

   const todoHelpers = useQueryHelper({
     queryKey: ['todos']
   });

   const handleAddTodo = async (newTodo: Todo) => {
     // Optimistically add to cache
     todoHelpers.appendData(newTodo);

     try {
       await createTodo(newTodo);
       await todoHelpers.invalidate();
     } catch (error) {
       // Rollback on error
       todoHelpers.removeDataItem((todo) => todo.id === newTodo.id);
     }
   };

   const handleToggleTodo = (id: number) => {
     todoHelpers.updateDataItem(
       (todo) => todo.id === id,
       (todo) => ({ ...todo, completed: !todo.completed })
     );
   };

   return (
     <div>
       {todoHelpers.isFetching && <Spinner />}
       {todos.data?.map(todo => (
         <TodoItem
           key={todo.id}
           todo={todo}
           onToggle={() => handleToggleTodo(todo.id)}
         />
       ))}
     </div>
   );
 }

```
