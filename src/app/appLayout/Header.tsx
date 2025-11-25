import Link from 'next/link'

const Header = () => {
    const token = {
        role: "associates"
    }
    return (
        <header
            className={`w-full sticky top-0 z-50 bg-white transition-shadow shadow-header font-semibold`}
        >
            <div className="max-w-7xl mx-auto px-2 md:px-4 py-3 flex items-center justify-between">
                <img src="" alt="brand_logo" />
                {/* Dropdown */}
                {/* {token?.role !== 'student' &&
                    <div className="relative md:hidden group cursor-pointer ml-3" onClick={() => setOpen((prev) => !prev)}>
                        <div className={`flex text-sm items-center gap-1.5 transition ${(pathname === "/about-us" || pathname === "/faq" || pathname == "/contact-us") ? "text-primary-gold" : "hover:text-primary-gold"}`}>
                            All Pages
                            <Image src="/Header/chevron-down.png"
                                alt="Logo"
                                width={10}
                                height={5}
                                className={`object-contain transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                        </div>
                <div
                    className={`absolute py-3 left-0 top-full mt-3 w-33 bg-gray-100 rounded-xl shadow-md overflow-hidden transition-all duration-200 origin-top ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                        }`}
                >
                    <Link
                        href="/"
                        className="block px-5 py-3 hover:bg-primary-lite text-sm text-black"
                    >
                        Home
                    </Link>
                    <Link
                        href="/browse-talent"
                        className="block px-5 py-3 hover:bg-primary-lite text-sm text-black"
                    >
                        Browse Talent
                    </Link>
                    <Link
                        href="/membership-plans"
                        className="block px-5 py-3 hover:bg-primary-lite text-sm text-black"
                    >
                        Membership Plan
                    </Link>
                    <Link
                        href="/about-us"
                        className="block px-5 py-3 hover:bg-primary-lite text-sm text-black"
                    >
                        About Us
                    </Link>

                    <Link
                        href="/faq"
                        className="block px-5 py-3 hover:bg-primary-lite text-sm text-black"
                    >
                        FAQ
                    </Link>

                    <Link
                        href="/contact-us"
                        className="block px-5 py-3 hover:bg-primary-lite text-sm text-black"
                    >
                        Contact Us
                    </Link>
                </div>
                    </div>} */}

                {/* Middle Nav */}
                <nav className="hidden md:flex items-center gap-8 font-medium text-base">
                    <img src="" alt="brand_logo" />

                    {token?.role !== 'associates' &&
                        <>|
                            <Link href="/" className={`transition`}>Home</Link>
                            <Link href="/browse-talent" className={`transition`}>Browse Talent</Link>
                            <Link href="/membership-plans" className={`transition`}>Membership Plan</Link>


                            {/* Dropdown */}
                            <div className="relative group cursor-pointer">
                                <div className={`flex items-center gap-1.5 transition`}>
                                    All Pages
                                    {/* <Image src="/Header/chevron-down.png"
                                        alt="Logo"
                                        width={10}
                                        height={5}
                                        className={`object-contain transition-transform duration-200 ${open ? "rotate-180" : ""}`} /> */}
                                </div>

                            </div>
                        </>}
                </nav>

                {/* Right Icons */}
                <div className="flex items-center gap-3 md:gap-6 ml-6 md:ml-0">
                    {/* <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
                    <ShoppingBag className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" /> */}

                    {/* Profile Avatar */}
                    {token ? <div className="relative flex items-center gap-2">
                        <div className="w-16.5 h-10 rounded-full overflow-hidden border border-l-0 border-gray-300 cursor-pointer relative">
                            <img
                                src="/Header/profile_pic.jpg"
                                alt="Profile"
                                className="w-10 h-10 object-cover rounded-full border-2 border-gray-300 absolute left-0"
                            />

                        </div>

                        {/* <div
                            className={`absolute py-3 -left-15 top-full mt-1.5 w-42 bg-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-200 origin-top font-normal`} >
                            {token?.role !== 'associates' ?
                                <Link
                                    href="/my-profile"
                                    className="block px-5 py-3 hover:bg-primary-lite text-sm text-black"
                                >
                                    My Profile
                                </Link>
                                :
                                <Link
                                    href="/my-profile/edit-account"
                                >
                                    <div
                                        className="block px-5 py-3 hover:bg-primary-lite text-sm text-black"
                                    >
                                        Edit Account
                                    </div>
                                </Link>}

                            <Link
                                href="/sign-in"
                                className="px-5 py-3 hover:bg-primary-lite text-sm text-black flex items-center gap-1"
                            >
                                Logout
                            </Link>
                        </div> */}
                    </div>
                        : <>

                        </>
                    }

                    {/* Mobile Menu */}
                    <button className="md:hidden">
                        {/* <Menu className="w-6 h-6 text-gray-700" /> */}
                    </button>
                </div>
            </div>


        </header >
    )
}

export default Header