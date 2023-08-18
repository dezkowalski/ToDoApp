import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Table from 'react-bootstrap/Table';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';

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
      <Table  striped border hover>
          <thead>
            <tr>
                <th>To Do</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Complete</th>
            </tr>
          </thead>
          <tbody>
              {data.todos.map((todo) => (
                <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td><FaEdit /></td>
                    <td><FaTrash /></td>
                    <td><MdDone /></td>
                </tr>
              ))}
          </tbody>
      </Table>
    );
}
