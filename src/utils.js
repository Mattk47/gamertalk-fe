import axios from 'axios'

export const patchVote = (review_id, vote) => {
    return axios.patch(`https://nc-games-project.herokuapp.com/api/reviews/${review_id}`, { inc_votes: vote })
}

