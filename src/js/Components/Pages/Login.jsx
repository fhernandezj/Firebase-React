
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import {login} from './../../helpers.jsx';


class Login extends React.Component {
	
	 
    constructor () {
        super();
        this.state = {  
          email: '',
          password: '',
          message:''
       }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    
    handleSubmit(e) {
      e.preventDefault();
      login(this.state.email,this.state.password)
      .then((user) => {
        console.log(user);
        this.props.isAuthenticated();
          
      })
      .catch((error) => {
        this.setState({message: error.message});
      })
    }
      
	render() {
	  
	  
		return (<article>
        
		   <h2>Login</h2>
              
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="control-label col-sm-2">Email:</label>
                  <div className="col-sm-10">
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={this.state.email}  onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">Password:</label>
                  <div className="col-sm-10">          
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange} />
                  </div>
                </div>
                
                <div className="form-group">        
                  <div className="col-sm-offset-2 col-sm-10">
                    <button className="btn btn-default">Login</button>
                  </div>
                </div>
              </form>
              
              <p>
              {
                this.state.message==='' ? '' : this.state.message
              }
              </p>
		</article>);
	}
}

export default Login;

