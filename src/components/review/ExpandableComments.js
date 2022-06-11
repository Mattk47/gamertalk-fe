import { useState, useContext } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import { useAppContext } from "../../lib/contextLib";
import reviewContext from "../../context/Review/reviewContext.js";
import Spinner from "../layout/Spinner.js";

const Expandable = ({ children, reviewId }) => {
  const ReviewContext = useContext(reviewContext);
  const { getComments, addComment, isOpen, toggleOpen, loading } =
    ReviewContext;
  const [comment, setComment] = useState("");
  const { user } = useAppContext();

  const sendComment = () => {
    if (comment !== "") {
      addComment(reviewId, user, comment);
      setComment("");
    }
  };

  const onClick = () => {
    toggleOpen();
    getComments(reviewId);
  };
  if (loading) return <Spinner />;

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{
          color: "rgb(26, 33, 46)",
          borderColor: "rgb(26, 33, 46)",
          border: "2px solid",
          marginBottom: "20px",
        }}
        onClick={onClick}
      >
        {isOpen ? "Close" : "Open"}
      </Button>
      {isOpen && children}
      {isOpen && (
        <div>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={2}
            placeholder="Comment"
            style={{ width: 400, margin: "0px auto", marginBottom: "10px" }}
            onChange={(event) => setComment(event.target.value)}
            required
          />
          <br></br>
          <Button
            variant="outlined"
            type="submit"
            color="primary"
            style={{
              color: "rgb(26, 33, 46)",
              borderColor: "rgb(26, 33, 46)",
              border: "2px solid",
            }}
            onClick={sendComment}
          >
            Send
          </Button>
        </div>
      )}
    </div>
  );
};

export default Expandable;
