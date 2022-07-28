export const RECEIVE_HIGHLIGHT = 'RECEIVE_HIGHLIGHT'

export const receiveHighlight = (benchId) =>(
    {
        type: RECEIVE_HIGHLIGHT,
        benchId
    }
)