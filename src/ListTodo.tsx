import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
}

export default function ListTodo() {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [isApiPlatform, setIsApiPlatform] = useState<boolean>(false);
  const [order, setOrder] = useState<string>('DESC');
  const navigate = useNavigate();

  useEffect(() => {
    if (isApiPlatform) {
      axios
        .get(`http://localhost:8000/api/todos?order[createdAt]=${order}`)
        .then((res) => {
          setTodos(res.data['hydra:member']);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get('http://localhost:8000/api/todos?order=' + order)
        .then((res) => {
          if (res.data['hydra:member']) {
            setTodos(res.data['hydra:member']);
            setIsApiPlatform(true);
          } else {
            setTodos(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [order, isApiPlatform]);

  if (todos.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <p>No tasks</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <label
        htmlFor="order"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Order
      </label>
      <select
        onChange={(e) => setOrder(e.target.value)}
        defaultValue={order}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value="DESC">DESC</option>
        <option value="ASC">ASC</option>
      </select>
      <ul className="divide-y divide-gray-200">
        {todos.map((todo: Todo) => (
          <li key={todo.id} className="py-4">
            <div
              onClick={() => navigate(`/task/${todo.id}`)}
              className="flex space-x-3 cursor-pointer"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3
                    className={`${
                      todo.done && 'line-through text-green-500'
                    } text-lg font-medium`}
                  >
                    {todo.text}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  Create at: {new Date(todo.createdAt).toLocaleDateString()}{' '}
                  {todo.updatedAt && (
                    <>
                      Update at: {new Date(todo.updatedAt).toLocaleDateString()}
                    </>
                  )}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
