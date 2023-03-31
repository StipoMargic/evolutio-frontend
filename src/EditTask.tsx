import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Todo } from './ListTodo';

const initValue: Todo = {
  id: '',
  text: '',
  done: false,
  createdAt: '',
  updatedAt: undefined,
};

export default function EditTask() {
  const { id } = useParams();
  const [todo, setTodo] = useState<Todo>(initValue);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/todos/${id}`).then((res) => {
      setTodo(res.data);
    });
  }, [id]);

  const updateTask = (e: any) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/todos/${id}`, todo)
      .then((res) => {
        if (res.status === 200) {
          window.location.href = '/';
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(todo);
  return (
    <div className="h-screen w-screen">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Edit Task: {id}</h1>
        <form onSubmit={updateTask}>
          <label
            htmlFor="todo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            TODO Task
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="todo"
              id="todo"
              value={todo.text}
              onChange={(e) => setTodo({ ...todo, text: e.target.value })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter a task"
            />
          </div>
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="done"
                checked={todo.done}
                name="done"
                onChange={(e) => setTodo({ ...todo, done: e.target.checked })}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="done" className="font-medium text-gray-900">
                Done
              </label>
            </div>
          </div>
          <button
            onClick={updateTask}
            type="submit"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
