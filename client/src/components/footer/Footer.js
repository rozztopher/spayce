import React from 'react'
import { Link } from 'react-router-dom'
import EnterInput from '../inputs/EnterInput';

function Footer() {

    const Branding = () => {
        return (
            <div className='footer-subcontent'>
                <Link to='/'>
                    <img src='/icons/spayce-logo.svg' alt='spayce logo' id='nav-logo'></img>
                </Link>
                <p className='fs-17 medium'>The Spayce for your NFTs</p>
            </div>
        )
    }

    const FooterLinks = () => {
        return (
            <div className='footer-subcontent'>
                <p className='fs-17 semi-bold'>Spayce</p>
                <ul className='footer-links'>
                    <div className='nav-option'>
                        <Link to='/community'>
                            <li className='fs-15 cadet-blue medium'>Community</li>
                        </Link>
                    </div>
                    <div className='nav-option mt-10'>
                        <Link to='/shop'>
                            <li className='fs-15 cadet-blue medium'>Shop</li>
                        </Link>
                    </div>
                    <div className='nav-option mt-10'>
                        <Link to='/myspayce'>
                            <li className='fs-15 cadet-blue medium'>Demo Spayce</li>
                        </Link>
                    </div>
                </ul>
            </div>
        )
    }

    const SocialLinks = () => {
        return (
            <div className='footer-subcontent'>
                <p className='fs-17 semi-bold'>Socials</p>
                <ul className='footer-links'>
                    <div className='nav-option'>
                        <Link to={{ pathname: 'https://twitter.com/spayce_io' }} target="_blank">
                            <li className='fs-15 cadet-blue medium'>Twitter</li>
                        </Link>
                    </div>
                    <div className='nav-option mt-10'>
                        <Link to={{ pathname: 'https://www.instagram.com/spayce.io' }} target="_blank">
                            <li className='fs-15 cadet-blue medium'>Instagram</li>
                        </Link>
                    </div>
                    <div className='nav-option mt-10'>
                        <Link to={{ pathname: 'https://discord.com/invite/spayce' }} target="_blank">
                            <li className='fs-15 cadet-blue medium'>Discord</li>
                        </Link>
                    </div>
                </ul>
            </div>
        )
    }

    const Newsletter = () => {
        return (
            <div>
                <p className='fs-17 semi-bold'>Join Newsletter</p>
                <p className='fs-14 cadet-blue mt-16 mb-10'>Subscribe our newsletter to get more info about new spaces and artists</p>
                <EnterInput />
            </div>
        )
    }

    const Copyright = () => {
        return (
            <div className='footer-copyright mb-28 mt-27'>
                <div style={{ position: 'relative' }}>
                    <p className='cadet-blue-60 fs-12'>Copyright © 2021 UI8 LLC. All rights reserved</p>
                </div>
                <div className='footer-cookies'>
                    <p className='fs-12'>We use cookies for better service.</p>
                    <p className='fs-12 purple semi-bold ml-16'>Accept</p>
                </div>
            </div>
        )
    }

    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <Branding />
                {window.innerWidth <= 480 &&
                    <div className='mt-50' style={{position: 'relative', display: 'flex', justifyContent: 'space-between'}}>
                        <FooterLinks />
                        <SocialLinks />
                        <div style={{marginRight: '20px'}}/>
                    </div>
                }
                {window.innerWidth > 480 &&
                    <>
                        <FooterLinks />
                        <SocialLinks />
                    </>
                }
                {window.innerWidth <= 480 && <div className='mt-50'/>}
                <Newsletter />
            </div>
            <div className='horizontal-divider mt-44'></div>
            <div className='footer-gutter'>
                <Copyright />
            </div>
        </div>
    );
}

export default Footer