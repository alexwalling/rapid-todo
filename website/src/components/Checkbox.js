import React from 'react';

const data = {
	'done': {
		'img':'done.png'
	},
	'notDone': {
		'img': 'notDone.png'
	}
}

export default class Checkbox extends React.Component {
	render() {
		const isDone = data[this.props.code].isDone;
		return (
			<span className="checkbox">
				<img className="img" title={isDone} srx={'/img/${img}'}/>
			</span>
		);
	}
}
