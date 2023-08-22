
const LOCALHOST = 'http://127.0.0.1:8080/'
const URL = window.location.href.includes('localhost') ? LOCALHOST : window.location.href


export const sendNewGameRequest = async (range) => {
    return await makeRequest('POST', `${URL}new_game`, {range: range})
}

export const sendGuessRequest = async (guess, id) => {
    return await makeRequest('POST', `${URL}submit_guess/${id}`, {guess})
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
