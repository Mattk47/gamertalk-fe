import { useState } from "react";
const Expandable = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((currOpen) => !currOpen);

    return (
        <div>
            <button className="commentButton" onClick={toggleOpen}>{isOpen ? 'Close' : 'Open'}</button>
            {isOpen && children}
        </div>
    );
};

export default Expandable;