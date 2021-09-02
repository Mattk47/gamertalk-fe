import axios from 'axios'
export const getReviews = (sort_by, order, page, category) => {
    return axios.get("https://nc-games-project.herokuapp.com/api/reviews", {
        params: {
            sort_by,
            order,
            page,
            category,
            limit: 5
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