import React, {useState} from 'react'
import gsap from "gsap"

const Header = () => {

    const [activeItem, setActiveItem] = useState(0)

    const bannerItems = [
        {id: 0, cat: '', src: '/images/halloweenbanner.png'},
        {id: 1, cat: '', src: '/images/halloweenbanner.png'},
        {id: 2, cat: '', src: '/images/halloweenbanner.png'},
        {id: 3, cat: '', src: '/images/halloweenbanner.png'},
        {id: 4, cat: '', src: '/images/halloweenbanner.png'}
    ]

    const handleActiveItemChange = (e) => {
        setActiveItem(parseInt(e.target.id))
    }

    setTimeout(() => {
        const tl = gsap.timeline().addLabel('tl')
        tl.to('.shop-banner img', {delay: 0.6, duration: 1, autoAlpha: 0}, 'tl')
        setTimeout(() => {
            if(activeItem === bannerItems.length - 1) {
                setActiveItem(0)
            } else {
                setActiveItem(activeItem + 1)
            }
            tl.reverse()
        }, 2000)
    }, 5000)

    return (
        <div className='shop-header-container'>
            <h2>Spayce Shop</h2>
            <div className='shop-banner mt-40'>
                <img src={bannerItems[activeItem].src} alt='img'></img>
            </div>
            <div className='carousel-5 mt-31'>
                {bannerItems.map((item, i) => {
                    const className = item.id === activeItem ? 'carousel-chip-active' : 'carousel-chip'
                    return (
                        <div className={className} id={i} key={i} onClick={handleActiveItemChange}></div>
                    )
                })}
            </div>
        </div>
    );
}

export default Header