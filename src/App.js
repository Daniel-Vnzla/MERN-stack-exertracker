import React from 'react';
import { BrowserRouter as Router ,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import ExerciseList from './components/exercises-list';
import EditList from './components/edit-list';
import CreateList from './components/create-exercise';
import CreateUser from './components/create-user';


function App() {
  return (
  	<Router>
	  	<div className="container">	
	  		<Navbar />
		    <Route path="/" exact component={ExerciseList}/>
		    <Route path="/edit/:id" component={EditList} />
		    <Route path="/create" component={CreateList} />
		    <Route path="/user" component={CreateUser} />
	  	</div>
    </Router>
  );
}

export default App;
