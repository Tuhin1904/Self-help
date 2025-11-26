import React from 'react'

const HeroSection = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* ----------------- HERO SECTION ----------------- */}
            <section className="w-full bg-white py-24">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                            Organize Work Effortlessly
                            <span className="text-blue-600"> with Kanban</span>
                        </h1>

                        <p className="text-gray-600 text-lg md:text-xl mb-8">
                            Visualize tasks, track progress and collaborate smoothly with our modern Kanban board.
                        </p>

                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition">
                                Get Started
                            </button>
                            <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl text-lg hover:bg-gray-300 transition">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* RIGHT IMAGE (PLACEHOLDER) */}
                    <div className="w-full h-72 md:h-96 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                        Image Placeholder
                    </div>
                </div>
            </section>

            {/* ----------------- INFO SECTION ----------------- */}
            <section className="w-full py-20 bg-gray-100">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
                        Why Use Our Kanban?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Card 1 */}
                        <div className="bg-white shadow-lg rounded-2xl p-8">
                            <div className="w-full h-32 bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500">
                                Icon Placeholder
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Drag & Drop</h3>
                            <p className="text-gray-600">
                                Move tasks between columns easily with a smooth drag-and-drop system.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white shadow-lg rounded-2xl p-8">
                            <div className="w-full h-32 bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500">
                                Icon Placeholder
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
                            <p className="text-gray-600">
                                Keep your team aligned with live syncing and instant updates.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white shadow-lg rounded-2xl p-8">
                            <div className="w-full h-32 bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500">
                                Icon Placeholder
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Customizable Boards</h3>
                            <p className="text-gray-600">
                                Create boards, lists and workflows that fit your project style.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HeroSection