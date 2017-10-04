import React from 'react';
import Images from './Images.jsx';

class Public extends React.Component {
	
	constructor () {
        super();
        this.state = {  
        	images: []
        }
	}
	
	render() {
		return (<section>
		<h2>Public page</h2>
		<Images isProtected="false" /> 
		</section>);
	}
}

export default Public;

