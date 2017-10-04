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

class Images extends React.Component {

    constructor() {
        super();
        this.state = {
            images: [],
            file: '',
            isAuthenticated: true
        }
        this.getFileName = this.getFileName.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentDidMount() {
        const imagesRef = firebase.database().ref().child('images');
        imagesRef.on('value', (snapshot) => {
            let images = snapshot.val();
            let newState = [];
            for (let image in images) {
                newState.push({
                    id: image,
                    link: images[image].link,
                    name: images[image].name
                });
            }
            this.setState({
                images: newState
            });
        });
    }

    getFileName() {
        var name = document.getElementById('imagePicker');
        this.state.file = name.files.item(0);
        console.log(this.state.file);
    }

    uploadImage() {
        var fileName = this.state.file.name;
        var storageRef = firebase.storage().ref('/images/' + fileName);
        var uploadTask = storageRef.put(this.state.file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

        }, function(error) {
            // Handle unsuccessful uploads
            console.log(error);
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            var downloadURL = uploadTask.snapshot.downloadURL;
            const imagesRef = firebase.database().ref().child('images');
            const newImage = {
                link: downloadURL,
                name: fileName
            }
            imagesRef.push(newImage);
            this.state.file = '';
        });
    }

    deleteImage(image) {
        // Create a reference to the file to delete
        var storageRef = firebase.storage().ref('/images/' + image.name);
        
        // Delete the file
        storageRef.delete().then(function() {
          // File deleted successfully
          const imageRef = firebase.database().ref().child('images').child(image.id);
          imageRef.remove();
        }).catch(function(error) {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    }

    render() {
        return (<section>

		 {
          this.props.isProtected==="true" ? 
          <div className="panel panel-info">
            <div className="panel-heading">Images</div>
              <div className="panel-body">
            	<table className="table table-hover">
            		<thead>
            	        <tr><th>Picture</th><th>Delete</th></tr>
            		</thead>        		
            		<tbody>     
            		{this.state.images.map((image) => {
                        return (
                            <tr key={image.id}>
                		        <td><img src={image.link} height="100"/></td>
                		        <td><button className="btn btn-danger" onClick={() => this.deleteImage(image)}>Remove</button></td>
                		    </tr>
                        )
                      })}    
                  </tbody> 
		    </table>   
            	
              <form>
                  <input type="file" id="imagePicker" accept="image/*" onChange={this.getFileName}/>
                  <button type="button" onClick={this.uploadImage}>Upload</button>
              </form>
              </div>
          </div>
          :
			<div className="panel panel-info">
			    <div className="panel-heading">Images</div>
			        <div className="panel-body">
            			{this.state.images.map((image) => {
                            return (
                            	<img key={image.id} src={image.link} height="100"/>
                            )
                          })}
                    </div>
			</div>
          }
        
		</section>);
    }
}

export default Images;
