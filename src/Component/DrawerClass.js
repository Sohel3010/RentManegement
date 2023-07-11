import React, { useState } from "react";
import "./DrawerClass.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CopyrightIcon from '@mui/icons-material/Copyright';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import { NavLink } from "react-router-dom";
const DrawerClass = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Owner",
            icon: <AccountCircleIcon />
        },
        {
            path: "/shop",
            name: "Shop",
            icon: <AddBusinessIcon />
        },
        {
            path: "/admin",
            name: "Admin",
            icon: <CopyrightIcon />
        },
        {
            path: "/rent",
            name: "Rent",
            icon: <CurrencyRupeeIcon />
        }
    ]
    return (
        <>
            <div className="container">
                <div style={{ width: isOpen ? "250px" : "53px" }} className="sidebar">
                    <div className="top_section">
                        <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
                        <div style={{ marginLeft: isOpen ? "50px" : "0" }} className="bars">
                            <HorizontalSplitIcon onClick={toggle} />
                        </div>
                    </div>
                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link" activeclassname="active">
                                <div className="icon">{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="link-text">{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>
                <main>{children}</main>
            </div>
        </>
    )
}

export default DrawerClass;