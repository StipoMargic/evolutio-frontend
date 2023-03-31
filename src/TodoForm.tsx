import axios from 'axios';
import { useState } from 'react';

export default function TodoForm() {
  const [formInputValue, setFormInputValue] = useState<string>('');

  const sendTodoTask = (e: any) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/todos', {
        text: formInputValue,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setFormInputValue('');
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={sendTodoTask}>
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
            value={formInputValue}
            onChange={(e) => setFormInputValue(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter a task"
          />
        </div>
        <button
          onClick={sendTodoTask}
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
