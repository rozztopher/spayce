import React from 'react'
import FAB from './FAB'
import { Link } from 'react-router-dom'

const Social = () => {

    return (
        <div className='social-container'>
            <Link to={{ pathname: 'https://twitter.com/spayce_io' }} target="_blank">
                <FAB
                    height='3.75rem'
                    width='3.75rem'
                    background='#6700EB'
                    src='/icons/twitter.svg'
                    alt='right arrow'
                />
            </Link>
            <Link className='mt-14' to={{ pathname: 'https://www.instagram.com/spayce.io' }} target="_blank">
                <FAB
                    height='3.75rem'
                    width='3.75rem'
                    background='#6700EB'
                    src='/icons/insta.svg'
                    alt='right arrow'
                />
            </Link>
            <Link className='mt-14' to={{ pathname: 'https://discord.com/invite/spayce' }} target="_blank">
                <FAB
                    height='3.75rem'
                    width='3.75rem'
                    background='#6700EB'
                    src='/icons/discord.svg'
                    alt='right arrow'
                />
            </Link>
        </div>
    );
}

export default Social