import React from 'react';
import firebase from 'firebase';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
}
from 'react-router-dom';

import {auth} from './../../helpers.jsx';

class Users extends React.Component {
	
	constructor () {
        super();
        this.state = {  
        	users: [],
        	userForm: 'none',
        	oper: '',
        	name: '',
        	email: '',
        	pwd: '',
        	id: ''
        }
        this.openCreateForm = this.openCreateForm.bind(this);
        this.openUpdateForm = this.openUpdateForm.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
	
	componentDidMount() {
        const usersRef = firebase.database().ref().child('users');
        usersRef.on('value', (snapshot) => {
            let users = snapshot.val();
            let newState = [];
            for (let user in users) {
                newState.push({
                    id: user,
                    email: users[user].email,
                    name: users[user].name,
                    pass: users[user].password
                });
            }
            this.setState({
                users: newState
            });
        });
    }
    
    openCreateForm(){
        this.setState({
            userForm: 'initial',
            oper: 'create',
             email: '',
            name: '',
            pwd:'',
            id: ''
        });
        document.getElementById("formSubmit").innerHTML = 'Create';
        document.getElementById("email").disabled = false
        document.getElementById("pwd").disabled = false
    }
    
    openUpdateForm(user){
        this.setState({
            userForm: 'initial',
            oper: 'update',
            email: user.email,
            name: user.name,
            pwd: user.pass,
            id: user
        });
        document.getElementById("formSubmit").innerHTML = 'Update';
        document.getElementById("email").disabled = true;
        document.getElementById("pwd").disabled = true;
    }
    
    removeUser(){
        console.log("remove");
    }
    
    updateUser(){
        firebase.database().ref().child('/users/' + this.state.id.id)
        .update({ name: this.state.name, email: this.state.email, password: this.state.pwd });
        this.closeForm();
    }
    
    handleSubmit(){
        if(this.state.oper == 'create'){
            this.createUser();
        }
        if(this.state.oper == 'update'){
            this.updateUser();
        }
    }
    
    createUser(){
        auth(this.state.email, this.state.pwd);
        const usersRef = firebase.database().ref().child('users');
        const newUser = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.pwd
        }
        usersRef.push(newUser);
        this.closeForm();
    }
    
    closeForm(){
        this.setState({
            userForm: 'none',
            oper: '',
            name: '',
            email:'',
            pwd:'',
            id: ''
        });
    }
	
	render() {
		return (<section>
		<div className="panel panel-info">
			    <div className="panel-heading">Users</div>
			        <div className="panel-body">
		
                		<button className="btn btn-success" onClick={()=>this.openCreateForm()}>Create</button>
                
                		    <form style={{display:this.state.userForm}}>
                		    <div className="form-group">
                                <label >Name:</label>
                                <input type="text" className="form-control" id="name" name="name" value={this.state.name}  onChange={this.handleChange}/>
                              </div>
                              <div className="form-group">
                                <label >Email address:</label>
                                <input type="email" className="form-control" id="email" name="email" value={this.state.email}  onChange={this.handleChange}/>
                              </div>
                              <div className="form-group">
                                <label >Password:</label>
                                <input type="password" className="form-control" id="pwd" name="pwd" value={this.state.pwd}  onChange={this.handleChange}/>
                              </div>
                              <button id="formSubmit" type="button" className="btn btn-default" onClick={()=>this.handleSubmit()}>Submit</button>
                              <button type="button" className="btn" onClick={()=>this.closeForm()}>Close</button>
                            </form>
                
                		<div>
                			<table className="table table-hover">
                            		<thead>
                            	        <tr><th>Name</th><th>Email</th><th>Password</th><th>Remove</th><th>Update</th></tr>
                            		</thead>        		
                            		<tbody>     
                               		    {this.state.users.map((user) => {
                                                    return (
                                            		    <tr key={user.id}>
                                                                <td>{user.name}</td>
                                                		        <td>{user.email}</td>
                                                		        <td>{user.pass}</td>
                                                		        <td><button className="btn btn-danger" onClick={() => this.removeUser()}>Remove</button></td>
                                                		        <td><button className="btn btn-info" onClick={()=>this.openUpdateForm(user)}>Update</button></td>
                                            		    </tr>
                                                    )
                                                  })}           		       
                            		</tbody> 
                    		    </table>     
                    		    
                		</div>
        		</div>
		</div>
		</section>);
	}
}

export default Users;

