import { GET_REVIEWS, SET_REVIEW_FILTER, SET_CATEGORY_FILTER, GET_CATEGORIES, SET_PAGE, SET_LOADING } from "../types"

export default (state, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            return {
                ...state,
                reviewList: action.payload.reviews,
                loading: false,
                totalGames: action.payload.total_count
            }
        case SET_REVIEW_FILTER:

            return {
                ...state,
                reviewFilter: action.payload
            }
        case SET_CATEGORY_FILTER:
            return {
                ...state,
                categoryFilter: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }

}