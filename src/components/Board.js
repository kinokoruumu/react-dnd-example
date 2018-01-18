import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Square from './Square'
import Knight from './Knight'
import {move_knight} from "../actions/actionCreators/knight"
import {connect} from "react-redux"

class Board extends Component {
	constructor(props) {
		super(props)
	}

	renderSquare(i) {
		const x = i % 8
		const y = Math.floor(i / 8)
		const black = (x + y) % 2 === 1

		const [knightX, knightY] = this.props.knightPosition
		const piece = (x === knightX && y === knightY) ? <Knight /> : null

		return (
			<div key={i}
					 style={{ width: '12.5%', height: '12.5%' }}
					 onClick={() => this.handleSquareClick(x, y)}
			>
				<Square black={black}>
					{piece}
				</Square>
			</div>
		)
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

export default connect(mapStateToProps, mapDispatchToProps)(Board)