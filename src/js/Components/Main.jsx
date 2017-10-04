
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';

import Public from './Pages/Public.jsx';
import Protected from './Pages/Protected.jsx';






class Main extends React.Component {
	constructor(){
	super();
        this.state = {  isAuthenticated: false  }
	}
	
	render() {
		return (<main>
		<Header />
		
		 <Router>
		    <div>
		      <ul className="list-group">
		        <li className="list-group-item"><Link to="/public">Public Page</Link></li>
		        <li className="list-group-item"><Link to="/protected" >Protected Page</Link></li>
		      </ul>
		      <Route path="/public" component={Public}/>
		      <Route path="/protected" component={Protected}/>
		      
		    </div>
		  </Router>
		
		<Footer />
		</main>);
	}
}

export default Main;
