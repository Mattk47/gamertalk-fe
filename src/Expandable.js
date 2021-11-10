import { useState } from "react";
import { postComment } from './utils'
import { Button, TextareaAutosize } from '@mui/material';
import { useAppContext } from "./lib/contextLib";

const Expandable = ({ children, reviewId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState()
    const toggleOpen = () => setIsOpen((currOpen) => !currOpen);
    const { user } = useAppContext();

    const sendComment = () => {
        postComment(reviewId, user, comment).then(() => setComment(''), window.location.reload(false))
    }

    return (
        <div>
            <Button variant='outlined' color='primary' style={{ color: 'rgb(26, 33, 46)', borderColor: 'rgb(26, 33, 46)', border: '2px solid', 'margin-bottom': '20px' }} onClick={toggleOpen}>{isOpen ? 'Close' : 'Open'}</Button>
            {isOpen && children}
            {isOpen && <div >
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={2}
                    placeholder="Comment"
                    style={{ width: 400, margin: '0px auto', 'margin-bottom': '10px' }}
                    onChange={(event) => setComment(event.target.value)}
                />
                <br></br>
                <Button variant='outlined' color='primary' style={{ color: 'rgb(26, 33, 46)', borderColor: 'rgb(26, 33, 46)', border: '2px solid' }} onClick={sendComment} >Send</Button>
            </div>}
        </div>
    );
};

export default Expandable;
