import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Paper, TextField, Button, TextareaAutosize, Select, FormControl, MenuItem, InputLabel, Box } from '@material-ui/core'
import reviewContext from '../../context/Review/reviewContext';
import isImageURL from 'image-url-validator';
const paperStyle = { padding: '30px 20px', width: 400, margin: '20px auto' }

const CreatePost = () => {
    const [validImage, setValidImage] = useState(null);
    let navigate = useNavigate();
    const [reviewObj, setReviewObj] = useState(
        {
            owner: 'grumpy19',
            title: '',
            review_body: '',
            designer: '',
            category: '',
            review_img_url: ''
        }
    )


    const ReviewContext = useContext(reviewContext)

    const { addReview, review, removeReview } = ReviewContext;
    const { title, review_body, designer, category, review_img_url } = reviewObj

    useEffect(() => {
        removeReview()
        // eslint-disable-next-line 
    }, [])



    const handleChange = e => {
        setReviewObj({ ...reviewObj, [e.target.name]: e.target.value })

    };


    const submitReview = async e => {
        // setValidImage(valid)
        if (validImage) {
            e.preventDefault()
            addReview(reviewObj)
        }
    };

    if (review.review_id) {
        navigate(`/reviews/${review.review_id}`)
    }

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid>
                    <h1 style={{ 'marginBottom': '20px' }}>Create Post</h1>
                </Grid>
                <form className="review_form"
                    onSubmit={submitReview}>
                    <TextField
                        fullWidth
                        label='Title'
                        name='title'
                        required
                        value={title}
                        onChange={handleChange}
                    ></TextField>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        placeholder="Write your review here..."
                        name='review_body'
                        style={{ width: 350, margin: '20px auto', 'marginBottom': '10px' }}
                        onChange={handleChange}
                        value={review_body}
                    />
                    <TextField
                        fullWidth
                        placeholder="Designer"
                        required
                        name='designer'
                        style={{ margin: '10px auto' }}
                        onChange={handleChange}
                        value={designer}
                    ></TextField>
                    <TextField
                        required
                        fullWidth
                        placeholder="Image Url"
                        onChange={handleChange}
                        error={validImage}
                        name='review_img_url'
                        value={review_img_url}
                    ></TextField>
                    <Box sx={{ minWidth: 120 }}>
                    </Box>
                    <FormControl fullWidth>
                        <InputLabel required id="category-dropdown">Game Category</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="category-dropdown"
                            label="Game Category"
                            name='category'
                            value={category}
                            onChange={handleChange}
                        >
                            <MenuItem value={'strategy'}>Strategy</MenuItem>
                            <MenuItem value={'hidden-roles'}>Hidden-roles</MenuItem>
                            <MenuItem value={'dexterity'}>Dexterity</MenuItem>
                            <MenuItem value={'push-your-luck'}>Push-your-luck</MenuItem>
                            <MenuItem value={'roll-and-write'}>Roll-and-write</MenuItem>
                            <MenuItem value={'deck-building'}>Deck-building</MenuItem>
                            <MenuItem value={'engine-building'}>Engine-building</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type='submit' variant='outlined' color='primary' style={{ color: 'rgb(26, 33, 46)', borderColor: 'rgb(26, 33, 46)', 'marginTop': '20px' }}> Submit</Button>
                </form>
            </Paper>
        </Grid>
    );
};


export default CreatePost;
