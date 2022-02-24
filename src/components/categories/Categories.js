import React, { useEffect, useContext } from 'react';
import reviewContext from '../../context/Review/reviewContext.js';
import Spinner from '../layout/Spinner.js';
import Category from './Category.js';

const Categories = () => {
    const ReviewContext = useContext(reviewContext)
    const { getCategories, categories, loading } = ReviewContext;

    useEffect(() => {
        getCategories()
        // eslint-disable-next-line 
    }, [])

    if (loading) return <Spinner />;

    return (
        <section className="container">
            {categories.map(category => {
                return (
                    <Category key={category.slug} categorySlug={category.slug} />
                )
            })}
        </section>
    );
};

export default Categories;

