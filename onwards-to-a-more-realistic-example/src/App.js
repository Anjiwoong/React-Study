import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const transformTasks = taskObj => {
      const loadedTasks = [];

      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    sendRequest(
      {
        url: 'https://react-http-c498a-default-rtdb.firebaseio.com/tasks.json',
      },
      transformTasks
    );
  }, [sendRequest]);

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
};

export default App;
