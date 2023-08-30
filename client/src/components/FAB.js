import React from 'react'

const FAB = (props) => {

    const fabStyle = {
        height: props.height,
        background: props.background ? props.background : 'initial',
        border: props.outline ? '1px solid rgba(176, 170, 221, 0.2)' : 'initial',
        width: props.width,
    }

    return (
        <div className='fab pointer' style={fabStyle}>
            <img src={props.src} alt={props.alt}></img>
        </div>
    );
}

export default FAB