
const IS_LOCAL = window.location.href.includes('localhost')
const LOCALHOST = 'http://127.0.0.1'
const GAME_SERVICE_PORT = IS_LOCAL ? ':8080/' : ''
const SCORE_SERVICE_PORT = IS_LOCAL ? ':8081/' : ''

const URL = IS_LOCAL ? LOCALHOST : window.location.href


export const newGame = async (range, maxGuesses, level) => {
    return await makeRequest(
        'POST', `${URL}${GAME_SERVICE_PORT}new_game`, {
            range: range,
            max_guesses: maxGuesses,
            level: level
        }
    )
}

export const submitGuess = async (guess, id) => {
    return await makeRequest('POST', `${URL}${GAME_SERVICE_PORT}submit_guess/${id}`, {guess})
}

export const getScores = async (level) => {
    return await makeRequest('GET', `${URL}${SCORE_SERVICE_PORT}get_scores/`, {chunk_size: 10, level: level})
}

export const verifyRange = (value, min_value) => {
    if (value >= min_value) return value
    else return min_value
}

const errorHandler = (error) => {
    console.log('Request failed!', error)
}

const parseParametersToQueryString = (parameters) => {
    const queryString = Object.keys(parameters).map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key])).join('&')
    return queryString
}

export const makeRequest = async (method, url, parameters={}) => {

    const requestUrl = parameters ? `${url}?${parseParametersToQueryString(parameters)}` : url
    const requestObject = { method: method, headers: {'accept': 'application/json'}}

    const response = await fetch(requestUrl, requestObject).catch(() => {})

    if (!response || !(response.status === 200 && response.ok)) {
        errorHandler(response)
        return
    }

    return await response.json().catch(() => {})
}
