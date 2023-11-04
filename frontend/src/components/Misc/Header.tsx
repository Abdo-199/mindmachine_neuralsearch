import React, { useState } from 'react'
import '../../styles/Misc/Header.css'

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(true);

    return (
        <div id="header-container">
            <div>
                <p>Home</p>
            </div>
            
            <div>
                <p>Search Results</p>
            </div>

            {isAdmin == true && <div>
                <p>Admin-Panel</p>
            </div> }

            <div>
                <p>Logout</p>
            </div>
        </div>
    )
}

export default Header