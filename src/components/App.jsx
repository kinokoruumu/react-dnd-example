import React from "react"
import { Provider } from 'react-redux'
import { store } from '../store/configureStore'
import Board from "./Board"

const App = () => (
    <Provider store={store}>
			<Board />
    </Provider>
)

export default App
