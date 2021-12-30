import React, { useReducer } from 'react'
import reviewContext from './reviewContext'
import { v4 } from 'uuid';
import reviewReducer from './reviewReducer'
import axios from 'axios'
import {
    GET_REVIEWS,
    SET_REVIEW_FILTER,
    SET_CATEGORY_FILTER,
    GET_CATEGORIES,
    SET_PAGE,
    SET_LOADING,
} from '../types';

const ReviewState = props => {
    const initialState = {
        loading: true,
        review: null,
        reviewList: [],
        reviewFilter: null,
        categoryFilter: null,
        totalGames: 0,
        categories: [],
        page: 1
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
        console.log(type)
        dispatch({ type: type, payload: value })
    }

    const getCategories = async () => {
        setLoading()
        const res = await axios.get("https://nc-games-project.herokuapp.com/api/categories")

        dispatch({ type: GET_CATEGORIES, payload: res.data.categories })
    }

    const setPage = async (page) => {

        dispatch({ type: SET_PAGE, payload: page })
    }

    const setLoading = async () => {

        dispatch({ type: SET_LOADING })
    }


    return (
        <reviewContext.Provider
            value={{
                loading: state.loading,
                review: state.review,
                reviewList: state.reviewList,
                categories: state.categories,
                page: state.page,
                totalGames: state.totalGames,
                reviewFilter: state.reviewFilter,
                categoryFilter: state.categoryFilter,
                getReviews,
                setFilter,
                getCategories,
                setPage,
                setLoading
            }
            }>
            {props.children}
        </ reviewContext.Provider >
    )

}

export default ReviewState;