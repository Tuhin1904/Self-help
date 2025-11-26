import React from 'react'
import Footer from '../appLayout/Footer'
import Header from '../appLayout/Header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>)
}