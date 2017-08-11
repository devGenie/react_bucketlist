import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import DashBoard from './components/dashboard';

const App =()=>(
	  <Router>
	  	<div>
	  		<Switch>
		      <Route exact path="/dashboard" component={DashBoard}/>
		      <Route path="/" component={HomePage}/>
		    </Switch>
	    </div>
	  </Router>
  );

export default App; 