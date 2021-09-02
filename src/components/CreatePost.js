import React, { useState } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { postReview } from "../utils"


const CreatePost = () => {
    const [redirectId, setRedirectId] = useState();
    const [reviewObj, setReviewObj] = useState(
        {
            owner: '',
            title: '',
            review_body: '',
            designer: '',
            category: '',
            review_img_url: ''
        }
    )
    const [selectValue, setSelectValue] = useState("SelectCategory");

    const updateReviewObj = (event, key) => {
        setReviewObj((currObj) => {
            const newObj = { ...currObj };
            newObj[key] = event.target.value;
            return newObj;
        });
    };

    const submitReview = (reviewObj) => {
        return postReview(reviewObj).then(result => setRedirectId(result.data.addedReview.review_id)).catch(err => console.log(err))
    };
    if (redirectId) return <Redirect to={`/reviews/${redirectId}`} />

    return (
        <form className="review_form"
            onSubmit={(event) => {
                event.preventDefault();
                submitReview(reviewObj);
            }}>
            <input
                className="form"
                placeholder="Username:"
                required
                type="text"
                onChange={(event) => updateReviewObj(event, "owner")}
            ></input>
            <br></br><br></br>
            <input
                className="form"
                placeholder="Title:"
                required
                type="text"
                onChange={(event) => updateReviewObj(event, "title")}
            ></input>
            <br></br><br></br>
            <textarea
                className="mytext"
                placeholder="Text:"
                required
                type="text"
                onChange={(event) => updateReviewObj(event, "review_body")}
            ></textarea>
            <br></br><br></br>
            <input

                className="form"
                placeholder="Designer:"
                required
                type="text"
                onChange={(event) => updateReviewObj(event, "designer")}
            ></input>
            <br></br><br></br>
            <input
                className="form"
                placeholder="Image Url:"
                type="text"
                onChange={(event) => updateReviewObj(event, "review_img_url")}
            ></input>
            <br></br><br></br>
            <label htmlFor="category_name">
                Category:
                <select
                    required
                    value={selectValue}
                    name="category_name"
                    id="category_name"
                    onChange={(event) => {
                        const eventCopy = event;
                        updateReviewObj(eventCopy, "category")
                        setSelectValue(event.target.value);
                    }}
                >
                    <option value="SelectCategory" disabled>
                        Select Category
                    </option>
                    <option
                        value="strategy"
                    >
                        Strategy
                    </option>
                    <option
                        value="hidden-roles"
                    >
                        Hidden-roles
                    </option>
                    <option
                        value="dexterity"
                    >
                        Dexterity
                    </option>
                    <option
                        value="push-your-luck"
                    >
                        Push-your-luck
                    </option>
                    <option
                        value="roll-and-write"
                    >
                        Roll-and-write
                    </option>
                    <option
                        value="deck-building"
                    >
                        Deck-building
                    </option>
                    <option
                        value="engine-building"
                    >
                        Engine-building
                    </option>
                </select>
            </label>
            <br></br> <br></br>
            <button>Submit</button>
        </form>
    );
};

export default CreatePost;

