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
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/todos')
      .then((res) => {
        if (res.data['hydra:member']) {
          setTodos(res.data['hydra:member']);
        }else{
          setTodos(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (todos.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <p>No tasks</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ul role="list" className="divide-y divide-gray-200">
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
