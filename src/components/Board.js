import React, { Component } from 'react'
import Knight from './Knight'
import {move_knight} from "../actions/actionCreators/knight"
import {connect} from "react-redux"
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {compose} from "redux";
import BoardSquare from "./BoardSquare";

class Board extends Component {
	constructor(props) {
		super(props)
	}

	renderSquare(i) {
		const x = i % 8;
		const y = Math.floor(i / 8);
		return (
			<div key={i}
					 style={{ width: '12.5%', height: '12.5%' }}>
				<BoardSquare x={x}
										 y={y}>
					{this.renderPiece(x, y)}
				</BoardSquare>
			</div>
		);
	}

	renderPiece(x, y) {
		const [knightX, knightY] = this.props.knightPosition;
		if (x === knightX && y === knightY) {
			return <Knight />;
		}
	}

	canMoveKnight(toX, toY) {
		const [x, y] = this.props.knightPosition;
		const dx = toX - x;
		const dy = toY - y;

		return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2)
	}

	handleSquareClick(toX, toY) {
		if (this.canMoveKnight(toX, toY)) {
			this.props.move_knight(toX, toY)
		}
	}

	render() {
		const squares = []
		for (let i = 0; i < 64; i++) {
			squares.push(this.renderSquare(i))
		}

		return (
			<div style={{
				width: '600px',
				height: '600px',
				display: 'flex',
				flexWrap: 'wrap'
			}}>
				{squares}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		knightPosition: state.knight.position
	}
}

const mapDispatchToProps = dispatch => {
	return {
		move_knight: (toX, toY) => {
			dispatch(move_knight(toX, toY))
		}
	}
}

export default compose(
	DragDropContext(HTML5Backend),
	connect(mapStateToProps, mapDispatchToProps),
)(Board)
