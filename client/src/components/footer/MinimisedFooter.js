import React from 'react'
import { Link } from 'react-router-dom'

function MinimisedFooter() {

    return (
        <div className='minimised-footer-container'>
            <div className='minimised-footer-content'>
            <img src='/icons/spayce-logo.svg' alt='spayce'></img>
            <Link to={{ pathname: 'https://twitter.com/spayce_io' }} target="_blank">
                <div className='social-chip'>
                    <img src='/icons/twitter-purple.svg' alt='twitter'></img>
                    <p className='fs-15 semi-bold ml-12'>Twitter</p>
                </div>
            </Link>
            <Link to={{ pathname: 'https://www.instagram.com/spayce.io' }} target="_blank">
                <div className='social-chip'>
                    <img src='/icons/insta-purple.svg' alt='twitter'></img>
                    <p className='fs-15 semi-bold ml-12'>Instagram</p>
                </div>
            </Link>
            <Link to={{ pathname: 'https://discord.com/invite/spayce' }} target="_blank">
                <div className='social-chip'>
                    <img src='/icons/discord-purple.svg' alt='twitter'></img>
                    <p className='fs-15 semi-bold ml-12'>Discord</p>
                </div>
            </Link>
            <div className='right'>
                <p className='medium'>The Spayce for your NFTs</p>
                <p className='fs-12 cadet-blue'>Copyright © 2021 UI8 LLC. All rights reserved</p>
            </div>
            </div>
        </div>
    );
}

export default MinimisedFooter