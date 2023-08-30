import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Link } from 'react-router-dom'

const SocialMedia = () => {

    return (
        <div className='social-media-container mt-100'>
            <div className='social-meida-header'>
                <h2>Join the community</h2>
                <div className='social-chips'>
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
                </div>
            </div>
            <div className='tweet-grid mt-40'>
                <TwitterTweetEmbed tweetId={'1479875772877873155'} />
                {window.innerWidth > 480 &&
                    <TwitterTweetEmbed tweetId={'1482051261302255619'} />
                }
            </div>
        </div>
    );
}

export default SocialMedia