import {useState, useRef} from 'react'

import { verifyRange, sendGuessRequest } from './helpers'
import { MIN_GUESS_VALUE } from './constants'


export const Game = ({ game, setGame }) => {

    const [guess, setGuess] = useState(1)
    const [guessesLeft, setGuessesLeft] = useState(game.guessesLeft)
    const [answer, setAnswer] = useState('')
    const [correctNumber, setCorrectNumber] = useState(null)

    const gameSummary = useRef({})

    const setGuessHandler = (event) => {
        setGuess(Number(event.target.value))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await sendGuessRequest(guess, game.id)
        console.log('response', response)

        setAnswer(response.answer)
        setGuessesLeft(response.guesses_left)
        setCorrectNumber(response.correct_number)

        if (response.answer === 'correct') {
            gameSummary.current = {
                guessesUsed: response.max_guesses - response.guesses_left,
                secondsUsed: response.total_time,
                score: response.total_score
            }
        }
    }

    return (
        <div>
            <div>
                <div>I'm thinking of a number between 1 and {game.range}.</div>
                <div>Can you guess which?</div>
            </div>
            {answer !== 'correct' && guessesLeft > 0 &&
                <form onSubmit={handleSubmit} className="input-buttons">
                    <input type="text" value={guess} onChange={setGuessHandler} />
                    <button type="button" value={verifyRange(guess-1, MIN_GUESS_VALUE)} onClick={setGuessHandler}>
                        -
                    </button>
                    <button type="button" value={guess+1} onClick={setGuessHandler}>
                        +
                    </button>
                    <button type="submit">
                        {'>'}
                    </button>
                </form>
            }
            {answer &&
                <Result
                    answer={answer}
                    guessesLeft={guessesLeft}
                    guess={guess}
                    correctNumber={correctNumber}
                    setGame={setGame}
                    gameSummary={gameSummary}
                />
            }
        </div>
    )
}

const Result = ({ answer, guessesLeft, guess, correctNumber, setGame, gameSummary }) => {

    const correctAnswer = answer === 'correct' && guessesLeft > 0
    const wrongAnswer = answer !== 'correct' && guessesLeft > 0
    const gameOver = guessesLeft === 0

    return (
        <div  className="result">
            {correctAnswer && <RightAnswer guess={guess} setGame={setGame} gameSummary={gameSummary} />}
            {wrongAnswer && <WrongAnswer answer={answer} guessesLeft={guessesLeft} />}
            {gameOver && <GameOver correctNumber={correctNumber} setGame={setGame} />}
        </div>
    )
}

const WrongAnswer = ({ answer, guessesLeft }) => {
    return(
        <div>
            Sorry! You guessed <div className="highlight">wrong.</div><br/>
            The number I'm thinking of is <div className="highlight">{answer}.</div><br/>
            You have <div className="highlight">{guessesLeft}</div> guesses left.
        </div>)
    }

const RightAnswer = ({ guess, setGame, gameSummary }) => {
    return (
        <div className="correct-guess">
            <div>
                CONGRATULATIONS!
            </div>
            <div>
                {guess} WAS THE CORRECT NUMBER!
            </div>
            <GameSummary gameSummary={gameSummary.current} />
            <PlayAgain setGame={setGame} />
        </div>
    )
}

const GameOver = ({ correctNumber, setGame }) => {
    return (
        <div className="game-over">
            <div>
                SORRY! GAME OVER!
            </div>
            <div>
                The correct number was {correctNumber}
            </div>
            <PlayAgain setGame={setGame} />
        </div>
    )
}

const PlayAgain = ({ setGame }) => {
    return (
        <button className="play-again" type="button" onClick={() => setGame({id: null})}>
            PLAY AGAIN?
        </button>
    )
}

const GameSummary = ({ gameSummary }) => {
    return (
        <div className="game-summary">
            <div>
                {`Time used: ${gameSummary.secondsUsed} seconds`}
            </div>
            <div>
                {`Guesses used: ${gameSummary.guessesUsed}`}
            </div>
            <div className="score">
                {`Your score: ${gameSummary.score}`}
            </div>
        </div>
    )
}
