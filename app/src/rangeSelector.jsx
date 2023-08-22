import { sendNewGameRequest } from './helpers'

export const RangeSelector = ({ setGame }) => {

    return (
        <div className="range">
            <div>
                Select difficulty level
            </div>

            <div className="game-options">
                <GameType text={'Easy'} range={10} guesses={5} setGame={setGame} className="easy" />
                <GameType text={'Medium'} range={100} guesses={10} setGame={setGame} className="medium" />
                <GameType text={'Hard'} range={500} guesses={10} setGame={setGame} className="hard" />
            </div>

        </div>
    )
}

const GameType = ({ text, range, guesses, setGame, className }) => {

    const startGame = async (range, guesses) => {
        const response = await sendNewGameRequest(range)
        setGame({
            id: response.id,
            range: range,
            guessesLeft: guesses
        })
	}

    return (
        <button onClick={() => startGame(range, guesses)} className={className} >
            { text }
        </button>
    )
}
