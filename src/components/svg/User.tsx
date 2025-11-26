import React from 'react'

const User = ({ width = "24px", height = "24px" }) => {
    return (
        <svg fill="#000000" width={width} height={height} viewBox="0 0 24 24" id="user" data-name="Flat Color" className="icon flat-color"><path id="primary" d="M21,20a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2,6,6,0,0,1,6-6h6A6,6,0,0,1,21,20Zm-9-8A5,5,0,1,0,7,7,5,5,0,0,0,12,12Z" style={{ fill: "rgb(0, 0, 0)" }}></path></svg>
    )
}

export default User