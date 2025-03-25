import { useState, useEffect } from 'react';
// import ExpenseTracker from './Expence';
// import ExpenseTracker from './Expence';

function App() {
  const [task, settask] = useState('');
  const [tasks, settasks] = useState(() => {
    // Get saved tasks from Local Storage or initialize with an empty array
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    return savedTasks || [];
  });

  const handleAddTask = () => {
    if (task.trim()) {
      settasks([...tasks, { text: task, checked: false }]); // Add new task with "checked" state
      settask(''); // Clear the input field
    }
  };

  useEffect(() => {
    // Save tasks to Local Storage whenever the tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const handleToggleCheck = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, checked: !task.checked } : task
    );
    settasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    settasks(updatedTasks);
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-[url('./src/assets/react.svg')">
        <div className="bg-cyan-200 h-[45rem] w-[35%] rounded-lg flex justify-center flex-col items-center">
          <h1 className="text-3xl font-bold m-3">TODO list</h1>
          <div className="h-[80%] w-full flex justify-center flex-col items-center gap-4">
            <div className="input flex w-[80%] gap-3">
              <input type="text"
                value={task}
                onChange={(e) => settask(e.target.value)}
                placeholder="Enter your task"
                className="text-black h-10 w-[90%] rounded-2xl pl-4 text-3xl"
              />
              <button onClick={handleAddTask} className="bg-blue-700 rounded-full w-24">
                Add task
              </button>
            </div>
            <div className="list  h-[80%] w-[80%] overflow-scroll text-3xl ">
              <ul className="mt-4">
                {tasks.map((task, index) => (
                  <li key={index} className="p-1 border-b border-gray-700 flex justify-between items-center m-3">
                    <span style={{ color: task.checked ? 'green' : 'blue' }}>
                      {task.text}
                    </span>
                    <div>
                    <input type="checkbox" onClick={() => handleToggleCheck(index)} className=' w-8 h-8 appearance-none bg-red-300 checked:bg-green-500 checked:border-transparent rounded-md border-2 cursor-pointer ' />
                    <button onClick={() => handleDeleteTask(index)}  className=''>
                      ❌
                    </button>
                    </div>
                  </li>
                  // <a href="<ExpenseTracker/>">ExpenseTracker</a>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default App;
