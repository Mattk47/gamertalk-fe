import axios from 'axios'
export const getReviews = (sort_by, order, page, category, limit) => {
    return axios.get("https://nc-games-project.herokuapp.com/api/reviews", {
        params: {
            sort_by,
            order,
            page,
            category,
            limit
        },
    })
}

export const getCategories = () => {
    return axios.get("https://nc-games-project.herokuapp.com/api/categories")
}

export const getReviewById = (review_id) => {
    return axios.get(`https://nc-games-project.herokuapp.com/api/reviews/${review_id}`)
}

export const postReview = (reviewObj) => {
    return axios.post(`https://nc-games-project.herokuapp.com/api/reviews`, reviewObj)
}

export const patchVote = (review_id, vote) => {
    return axios.patch(`https://nc-games-project.herokuapp.com/api/reviews/${review_id}`, { inc_votes: vote })
}

export const deleteReview = (review_id) => {
    return axios.delete(`https://nc-games-project.herokuapp.com/api/reviews/${review_id}`)
}

export const getCommentByReview = (review_id) => {
    return axios.get(`https://nc-games-project.herokuapp.com/api/reviews/${review_id}/comments`)

}

export const getReviewsByUsername = (username) => {
    return axios.get(`https://nc-games-project.herokuapp.com/api/users/reviews/${username}`)
}

export const postComment = (review_id, username, comment,) => {
    return axios.post(`https://nc-games-project.herokuapp.com/api/reviews/${review_id}/comments`, { username, body: comment })
}
