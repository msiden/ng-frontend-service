import {useState} from 'react'
import { RangeSelector } from './rangeSelector'
import { Game } from './game'
import './App.scss'


const App = () => {

	const [game, setGame] = useState({id: null})

	const gameStarted = game.id !== null

	return (
		<div className="main">
      		<div>
				Welcome to
			</div>
			<div className="title">
				Numbr Guessr
			</div>
			{gameStarted ?
				<Game game={game} /> :
				<RangeSelector setGame={setGame} />}
		</div>
  	)
}

export default App
