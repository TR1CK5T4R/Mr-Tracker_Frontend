import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";

function Home() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Header />
            <Body />
            <Footer />
        </div>
    );
}

export default Home;