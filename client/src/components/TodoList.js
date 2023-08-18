import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Table from 'react-bootstrap/Table';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';

const GET_TODOS = gql`
    query getTodos {
        todos {
            id, title, completed,
        }
    }
`;

const DELETE_TODO = gql`
    mutation deleteTodo ($id: ID!) {
        deleteTodo(id: $id) {
            id, title, completed
        }
    }
`;

export default function TodoList() {
    const { loading, error, data } = useQuery(GET_TODOS);
    const [deleteTodo] = useMutation(DELETE_TODO);

    const removeTodo = id => {
      deleteTodo({
        variables: {id: id},
        refetchQueries: [{ query: GET_TODOS }],
      })
  }

    if(loading) return <Spinner animation="border" />;
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
                    <td>
                      <Button variant="danger" onClick={() => removeTodo(todo.id)}>
                        <FaTrash />
                      </Button>
                    </td>
                    <td><MdDone /></td>
                </tr>
              ))}
          </tbody>
      </Table>
    );
}
