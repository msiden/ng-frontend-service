import { getScores } from "./helpers"


export const BestScores = async () => {

    const scores = await getScores(0)
    console.log('scores', scores)

    return (
        <div className="best-scores">
            Hall of fame
        </div>
    )
}
