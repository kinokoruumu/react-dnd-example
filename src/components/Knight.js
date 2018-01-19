import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import {ItemTypes} from "../constatnts/knight";

const knightSource = {
	beginDrag(props) {
		return {};
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class Knight extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { connectDragSource, isDragging } = this.props
		return connectDragSource(
			<div style={{
				opacity: isDragging ? 0.5 : 1,
				fontSize: 25,
				fontWeight: 'bold',
				cursor: 'move'
			}}>
				♘
			</div>
		)
	}
}

Knight.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight)