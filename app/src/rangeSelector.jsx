import {useState} from 'react'

import { verifyRange, sendNewGameRequest } from './helpers'
import { MIN_RANGE } from './constants'


export const RangeSelector = ({ setGame }) => {

    const [range, setRange] = useState(100)

    const setRangeHandler = (event) => {
		setRange(Number(event.target.value))
	}

    const startGame = async () => {
        const response = await sendNewGameRequest(range)
        setGame({
            id: response.id,
            range: range,
            guessesLeft: 10
        })
	}

    return (
        <div className="range">
            <div>Select range</div>
            <div className="input-field">
                <div className="description">1 to </div>
                <input type="text" value={range} onChange={setRangeHandler} />
            </div>
            <div className="input-buttons">
                <button onClick={() => setRange(verifyRange(range-1, MIN_RANGE))}>-</button>
                <button onClick={() => setRange(verifyRange(range+1, MIN_RANGE))}>+</button>
            </div>
            <div className="start-button" onClick={() => startGame()}>LET'S PLAY!</div>
        </div>
    )
}

