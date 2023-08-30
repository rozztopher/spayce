import React from 'react';

function BG() {

    const bg = window.innerWidth < 768 ? '/bg/bgmobile.png' : window.innerWidth < 1024 ? '/bg/bgtablet.png' : '/bg/bg.png'

    return (
        <div className='bg-elements'>
            <img src={bg} alt='background' style={{width: '100vw' }} />
            <img src={bg} alt='background' style={{width: '100vw', transform: 'rotate(180deg)' }} />
        </div>
    );
}

export default BG