import React, {useState} from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Table from 'react-bootstrap/Table';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

const ADD_TODO = gql`
    mutation addTodo ($title: String!, $completed: Boolean!) {
        addTodo(title: $title, completed: $completed) {
            id, title, completed
        }
    }
`;

const UPDATE_TODO = gql`
    mutation updateTodo ($id: ID!, $title: String!) {
        updateTodo(id: $id, title: $title) {
            id, title, completed
        }
    }
`;

export default function TodoList() {
  const [title, setTitle] = useState("");
  const completed = false;
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode? "EDit" : "Add";

    const { loading, error, data } = useQuery(GET_TODOS);
    const [deleteTodo] = useMutation(DELETE_TODO);
    const [addTodo] = useMutation(ADD_TODO, {variables: { title, completed }, refetchQueries: [{ query: GET_TODOS }]});
    const [updateTodo] = useMutation(UPDATE_TODO);
    const modifyTodo = (id) => {
      updateTodo({
        variables: {id: id, title},
        refetchQueries: [{ query: GET_TODOS }]
      })
    }

    const removeTodo = id => {
      deleteTodo({
        variables: {id: id},
        refetchQueries: [{query: GET_TODOS}],
      })
    }

      const handleSubmit = (e) => {
        e.preventDefault();

        if(title === "") return alert("Please get gud");

        if(editMode) {
          modifyTodo(editTodo.id);
          setEditMode(false);
          setEditTodo(null);
        }
        else {
          addTodo();
        }

        setTitle("");
      }

    if(loading) return <Spinner animation="border" />;
    if(error) return <p>something went wrong</p>;

    return (
      <>
        <Form onSubmit={handleSubmit} >
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter To Do" onChange={e => setTitle(e.target.value)} value={title} />
          </Form.Group>
          <Button variant="primary" type="submit" >
            {buttonTitle}
          </Button>
        </Form>
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
                      <td>
                        <Button variant="warning" onClick={() => {
                          setTitle(todo.title);
                          setEditMode(true);
                          setEditTodo(todo);
                        }}>
                          <FaEdit />
                        </Button>
                      </td>
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
      </>
    );
}
