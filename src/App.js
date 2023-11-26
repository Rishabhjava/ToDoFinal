import React from 'react'; // Importing React
import Kanban from './page/Kanban'; // Importing Kanban component
import Signup from './page/Signup'; // Importing Signup component
import Login from './page/NewLogin'; // Importing Login component
import { BrowserRouter as Router} from 'react-router-dom'; // Importing BrowserRouter for routing
import { Routes, Route } from 'react-router-dom'; // Importing Routes and Route for defining navigation paths
 
function App() {
  // Main app component that sets up routing for the application
  return (
    <Router>
      {/* Router component wraps the entire application to enable routing */}
      <div>
        {/* Main container */}
        <section>
          {/* Section containing the application routes */}
          <Routes>
            {/* Routes component defines the mapping between paths and components */}
            <Route path="/" element={<Kanban/>}/> {/* Route for the Kanban board */}
            <Route path="/signup" element={<Signup/>}/> {/* Route for the Signup page */}
            <Route path="/login" element={<Login/>}/> {/* Route for the Login page */}
          </Routes>
        </section>
      </div>
    </Router>
  );
}
 
export default App; // Exporting the App component
