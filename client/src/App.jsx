import React from 'react';
import Signup from './component/Signup';
import Login from './component/Login';
import TaskForm from './component/TaskForm';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './component/TaskList';
import TaskDetails from './component/TaskDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/tasklist" element={<TaskList/>} />
        <Route path="/taskdetail/:id" element={<TaskDetails/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import TaskForm from './component/TaskForm';
// import TaskList from './component/TaskList';
// import TaskDetails from './component/TaskDetails';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <TaskForm fetchTasks={fetchTasks} />
//         <Switch>
//           <Route path="/" exact component={TaskList} />
//           <Route path="/tasks/:id" component={TaskDetails} />
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;
