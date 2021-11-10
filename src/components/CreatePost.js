import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { postReview } from "../utils"
import { Grid, Paper, TextField, Button, TextareaAutosize, Select, FormControl, MenuItem, InputLabel, Box } from '@material-ui/core'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const paperStyle = { padding: '30px 20px', width: 400, margin: '20px auto' }
const avatarStyle = { backgroundColor: 'rgb(26, 33, 46)', color: 'gold' }
const buttonStyle = { 'margin-top': '20px', backgroundColor: '#1a212e' }

const CreatePost = () => {
    const [selectedValue, setSelectValue] = useState()
    const [redirectId, setRedirectId] = useState();
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


    const handleChange = (event) => {
        const eventCopy = event;
        updateReviewObj(eventCopy, "category")
        setSelectValue(event.target.value)
    };

    const updateReviewObj = (event, key) => {
        setReviewObj((currObj) => {
            const newObj = { ...currObj };
            newObj[key] = event.target.value;
            return newObj;
        });
    };
    const submitReview = (reviewObj) => {
        if (reviewObj.review_img_url === '') {
            setReviewObj((currObj) => {
                currObj.review_img_url = 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'
            })
        }
        return postReview(reviewObj).then(result => setRedirectId(result.data.addedReview.review_id)).catch(err => console.log(err))
    };
    if (redirectId) return <Redirect to={`/reviews/${redirectId}`} />

    return (

        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid>
                    <h1 style={{ 'marginBottom': '20px' }}>Create Post</h1>
                </Grid>
                <form className="review_form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        submitReview(reviewObj);
                    }}>
                    <TextField
                        fullWidth
                        label='Title'
                        required
                        onChange={(event) => updateReviewObj(event, "title")}
                    ></TextField>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        placeholder="Review"
                        style={{ width: 350, margin: '20px auto', 'margin-bottom': '10px' }}
                        onChange={(event) => updateReviewObj(event, "review_body")}
                    />
                    <TextField
                        fullWidth
                        placeholder="Designer"
                        required
                        style={{ margin: '10px auto' }}
                        onChange={(event) => updateReviewObj(event, "designer")}
                    ></TextField>
                    <TextField
                        fullWidth
                        placeholder="Image Url"
                        onChange={(event) => updateReviewObj(event, "review_img_url")}
                    ></TextField>
                    <Box sx={{ minWidth: 120 }}>
                    </Box>
                    <FormControl fullWidth>
                        <InputLabel required id="demo-simple-select-label">Game Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Game Category"
                            value={selectedValue}
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
                    <Button variant='outlined' color='primary' style={{ color: 'rgb(26, 33, 46)', borderColor: 'rgb(26, 33, 46)', 'margin-top': '20px' }}> Submit</Button>
                </form>
            </Paper>
        </Grid>
    );
};


export default CreatePost;
