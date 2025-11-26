import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-between flex-col md:flex-row gap-4 items-center  bg-[#FEFCF8] h-20 px-6 md:px-16 border-t border-[#EBE7E7]'>
            <span>© 2025 Self-Support. All rights reserved.</span>
            <p className='flex gap-4'>
                <span>Terms of Service</span> |
                <span>Privacy Policy</span> |
                <span>Cookie Settings</span>
            </p>
        </div>
    )
}

export default Footer