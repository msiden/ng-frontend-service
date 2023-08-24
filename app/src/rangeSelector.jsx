import { sendNewGameRequest } from './helpers'

export const RangeSelector = ({ setGame }) => {

    return (
        <div className="range">
            <div>
                Select difficulty level
            </div>

            <div className="game-options">
                <GameType text={'Easy'} range={10} maxGuesses={5} level={0} setGame={setGame} className="easy" />
                <GameType text={'Medium'} range={100} maxGuesses={10} level={1} setGame={setGame} className="medium" />
                <GameType text={'Hard'} range={500} maxGuesses={10} level={2} setGame={setGame} className="hard" />
            </div>

        </div>
    )
}

const GameType = ({ text, range, maxGuesses, level, setGame, className }) => {

    const startGame = async (range, maxGuesses, level) => {
        const response = await sendNewGameRequest(range, maxGuesses, level)
        console.log(response)
        setGame({
            id: response.id,
            range: range,
            guessesLeft: maxGuesses
        })
	}

    return (
        <button onClick={() => startGame(range, maxGuesses, level)} className={className} >
            { text }
        </button>
    )
}
