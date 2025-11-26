import Link from 'next/link'

const Header = () => {
    const token = {
        role: "associates"
    }
    return (
        <header
            className={`w-full sticky top-0 z-50 bg-white transition-shadow shadow-header font-semibold h-16`}
        >
            <div className="max-w-7xl mx-auto px-2 md:px-4 py-3 flex items-center justify-between h-15">
                <img src="/brand/header-logo.png" alt="brand_logo" className='w-16 border-2 border-primary-red rounded-xl cursor-pointer' />


                <Link className='px-5 py-2.5 bg-light-red/50 border-2 border-primary-red  rounded-2xl cursor-pointer' href="/sign-in">Sign In</Link>
            </div>


        </header >
    )
}

export default Header