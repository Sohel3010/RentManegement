import React, { useState } from "react";
import "./DrawerClass.css";
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import Index from "./Index";
const DrawerClass = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <div className="container">
                <div style={{ width: isOpen ? "250px" : "53px" }} className="sidebar">
                    <div className="top_section">
                        <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">RENT APP</h1>
                        <div style={{ marginLeft: isOpen ? "50px" : "0" }} className="bars">
                            <HorizontalSplitIcon onClick={toggle} />
                        </div>
                    </div>
                    <Index></Index>
                </div>
                <main>{children}</main>
            </div>
        </>
    )
}

export default DrawerClass;