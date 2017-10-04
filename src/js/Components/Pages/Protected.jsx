
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import {logout} from './../../helpers.jsx';
import {verifyUser} from './../../helpers.jsx';
import Login from './Login.jsx';
import Images from './Images.jsx';
import Users from './Users.jsx';

class Protected extends React.Component {
	
    constructor () {
        super(); 
				this.state = {  
					isAuthenticated:false  
    		    } 	    
    		    this.authenticate = this.authenticate.bind(this);
    		    this.verify();
    }
    
    logout() {
    	logout()
    	.then(()=>{
    		this.setState({isAuthenticated: false});
    	})
     	
    }
  
    authenticate() {
           this.setState({isAuthenticated: true});
    }
    
    verify(){
        if(verifyUser()){
            this.state.isAuthenticated = true;
        }else{
            this.state.isAuthenticated = false;
        }
    }
    
	render() {
		return (<section>
		<h2>Protected Page</h2>
		
		{
          this.state.isAuthenticated===true ? 
          <div>
    	      <p>Welcome</p>
    	      
    	      <Router>
    		    <div>
    		      <ul className="list-group">
    		        <li className="list-group-item"><Link to="/protected/images">Images</Link></li>
    		        <li className="list-group-item"><Link to="/protected/users" >Users</Link></li>
    		      </ul>
    		      <Route path="/protected/images"  component={() => (<Images isProtected="true" />)}/>
    		      <Route path="/protected/users" component={Users}/>
    		      
    		    </div>
    		  </Router>
    		  
    		  <p></p>
    		  <button className="btn btn-warning" onClick={()=>this.logout()}>Logout</button>
    	
          </div>
        : 
         <Login isAuthenticated={this.authenticate} /> 
         
		}
			
		</section>);
	}
}

export default Protected;

