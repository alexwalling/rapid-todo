import React from 'react';
import Checkbox from './Checkbox';

export default class IndexPage extends React.Component {
	render(){
		return (
			<div className="home">
				<div className="check-boxes">
					<Checkbox code="done" isDone="true"/>
				</div>
			</div>
		);
	}
}