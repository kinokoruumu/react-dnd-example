import {MOVE_KNIGHT} from "../../actions/actionTypes/knight";

const initialState = {
	position: [1, 7],
}

export const knight = (state = initialState, action) => {
	switch (action.type) {
		case MOVE_KNIGHT:
			return Object.assign({}, state, {
				position: action.position,
			})
		default:
			return state
	}
}