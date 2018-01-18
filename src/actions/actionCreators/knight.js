import {MOVE_KNIGHT} from "../actionTypes/knight";

export const move_knight = (toX, toY) => {
	return {
		type: MOVE_KNIGHT,
		position: [toX, toY]
	}
}