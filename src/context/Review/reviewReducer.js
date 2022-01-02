import {
    GET_REVIEWS,
    SET_REVIEW_FILTER,
    SET_CATEGORY_FILTER,
    GET_CATEGORIES,
    SET_PAGE,
    SET_LOADING,
    ADD_REVIEW,
    REMOVE_REVIEW,
    GET_USER_REVIEWS,
    SET_REVIEW,
    DELETE_REVIEW,
    SET_COMMENTS,
    ADD_COMMENT,
    TOGGLE_OPEN
} from "../types"

const reviewReducer = (state, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            return {
                ...state,
                reviewList: action.payload.reviews,
                loading: false,
                totalGames: action.payload.total_count,
                review: {}
            }
        case SET_REVIEW_FILTER:

            return {
                ...state,
                reviewFilter: action.payload,
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
                loading: false,
                review: {}

            }
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loading: false,
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload],
                loading: false,
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
        case ADD_REVIEW:
        case SET_REVIEW:
            return {
                ...state,
                userReviews: [...state.userReviews, action.payload],
                review: action.payload,
                loading: false,
            }

        case REMOVE_REVIEW:
            return {
                ...state,
                review: {},
                loading: false
            }
        case DELETE_REVIEW:
            return {
                ...state,
                userReviews: state.userReviews.filter(review => review.review_id !== action.payload),
                review: {},
                loading: false
            }
        case GET_USER_REVIEWS:
            return {
                ...state,
                userReviews: action.payload,
                loading: false,
                user: {}
            }
        case TOGGLE_OPEN:
            return {
                ...state,
                isOpen: !state.isOpen
            }
        default:
            return state
    }

}

export default reviewReducer;