import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_TODOS = gql`
    query getTodos {
        todos {
            id, title, completed,
        }
    }
`

export default function TodoList() {
    const { loading, error, data } = useQuery(GET_TODOS);

    if(loading) return <p>loading...</p>;
    if(error) return <p>something went wrong</p>;

    return (
      <div>
          {data.todos.map((todo) => (
            <li key={todo.id}>
                {todo.title}
            </li>
          ))}
      </div>
    );
}
