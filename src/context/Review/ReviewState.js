import React, { useReducer } from 'react'
import reviewContext from './reviewContext'
import reviewReducer from './reviewReducer'
import axios from 'axios'
import {
    GET_REVIEWS,
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
} from '../types';

const ReviewState = props => {
    const initialState = {
        loading: false,
        review: {},
        reviewList: [],
        reviewFilter: null,
        categoryFilter: null,
        totalGames: 0,
        categories: [],
        page: 1,
        userReviews: [],
        comments: [],
        isOpen: false,
    }
    const [state, dispatch] = useReducer(reviewReducer, initialState)

    const getReviews = async (sort_by, order, page, category, limit) => {
        setLoading()
        const res = await axios.get("https://nc-games-project.herokuapp.com/api/reviews", {
            params: {
                sort_by,
                order,
                page,
                category,
                limit
            },
        })

        dispatch({ type: GET_REVIEWS, payload: res.data })
    }

    const setFilter = (filter, value) => {
        const type = `SET_${filter}_FILTER`

        dispatch({ type: type, payload: value })
    }

    const getCategories = async () => {
        setLoading()
        const res = await axios.get("https://nc-games-project.herokuapp.com/api/categories")

        dispatch({ type: GET_CATEGORIES, payload: res.data.categories })
    }

    const getUserReviews = async (username) => {
        setLoading()
        const res = await axios.get(`https://nc-games-project.herokuapp.com/api/users/reviews/${username}`)
        dispatch({ type: GET_USER_REVIEWS, payload: res.data.reviews })
    }


    const setPage = async (page) => {

        dispatch({ type: SET_PAGE, payload: page })
    }

    const setLoading = async () => {

        dispatch({ type: SET_LOADING })
    }

    const addReview = async (review) => {
        setLoading()
        try {
            const res = await axios.post(`https://nc-games-project.herokuapp.com/api/reviews`, review)
            dispatch({ type: ADD_REVIEW, payload: res.data.addedReview })

        } catch (error) {
            console.log(error)
        }

    }

    const removeReview = () => {
        dispatch({ type: REMOVE_REVIEW })
    }

    const deleteReview = async (id) => {
        setLoading()
        await axios.delete(`https://nc-games-project.herokuapp.com/api/reviews/${id}`)
        dispatch({ type: DELETE_REVIEW, payload: id })
    }

    const getReview = async (id) => {
        setLoading()
        const res = await axios.get(`https://nc-games-project.herokuapp.com/api/reviews/${id}`)
        dispatch({ type: SET_REVIEW, payload: res.data.review })

    }

    const getComments = async (review_id) => {
        setLoading()
        const res = await axios.get(`https://nc-games-project.herokuapp.com/api/reviews/${review_id}/comments`)
        dispatch({ type: SET_COMMENTS, payload: res.data.comments })

    }
    const addComment = async (review_id, username, comment) => {
        setLoading()
        const res = await axios.post(`https://nc-games-project.herokuapp.com/api/reviews/${review_id}/comments`, { username, body: comment })
        dispatch({ type: ADD_COMMENT, payload: res.data.comment })

    }

    const toggleOpen = () => dispatch({ type: TOGGLE_OPEN })

    return (
        <reviewContext.Provider
            value={{
                loading: state.loading,
                review: state.review,
                reviewList: state.reviewList,
                userReviews: state.userReviews,
                categories: state.categories,
                page: state.page,
                totalGames: state.totalGames,
                reviewFilter: state.reviewFilter,
                categoryFilter: state.categoryFilter,
                comments: state.comments,
                isOpen: state.isOpen,
                getReviews,
                setFilter,
                getCategories,
                setPage,
                setLoading,
                addReview,
                removeReview,
                getUserReviews,
                getReview,
                deleteReview,
                getComments,
                addComment,
                toggleOpen
            }
            }>
            {props.children}
        </ reviewContext.Provider >
    )

}

export default ReviewState;