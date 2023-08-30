import React from 'react'

const ProductRarity = () => {

    const cards = [
        {
            category: 'Cosmic',
            color: '#58BF70',
            spayce: '80% of number of User',
            views: '(On drop date 00:00) = Number of items'
        },
        {
            category: 'Astronomic',
            color: '#3772FF',
            spayce: '35% of number of User',
            views: '(On drop date 00:00) = Number of items'
        },
        {
            category: 'Galactic',
            color: '#EF466F',
            spayce: '10% of number of User',
            views: '(On drop date 00:00) = Number of items'
        },
        {
            category: 'Void',
            color: '#FFBC27',
            spayce: '1-5 pcs',
            views: 'Decision on drop date 00:00'
        },
    ]

    return (
        <div className='productRarity-container mt-100'>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 className='fs-35'>Products Rarity</h2>
            </div>
            <div className='productRarity-grid mt-30'>
                {cards.map((spayce, i) => {
                    return (
                        <div className='productRarity-card glass' key={spayce.category}>
                            <div>
                                <div className='productRarity-chip' style={{ background: spayce.color }}>
                                    <p className='fs-14 semi-bold uppercase ls-1o6 ml-o5'>{spayce.category}</p>
                                </div>
                                <p className='lotion center mt-30'>{spayce.spayce}</p>
                            </div>
                            <div className='productRarity-stats mt-8'>
                                <p className='ceil lh-33'>{spayce.views}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}


export default ProductRarity