import React from 'react'
import Header from './components/Header'
import Trending from './components/Trending'
import SocialMedia from './components/SocialMedia'
import Leaderboard from './components/Leaderboard'

const Community = () => {

    document.getElementById('app-container').style.width = null

    return (
        <div className='community-container'>
            <Header />
            <Trending />
            <SocialMedia />
            <Leaderboard />
        </div>
    );
}

export default Community