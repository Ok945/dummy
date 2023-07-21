import React from 'react'
import Avatar from '@mui/material/Avatar'
import "./header.css"
const Header = () => {
    return (
        <>
            <header>
                <nav><h1>Job Connect</h1>
                <div className="avtar">
                    <Avatar style={{background:"blue"}}>Om</Avatar>
                </div>
                </nav>
            </header>
        </>
    )
}

export default Header
