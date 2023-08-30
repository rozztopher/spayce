import React from 'react'

const IconTextField = (props) => {

    const handleInputChange = (e) => {
        props.set(e.target.value)
    }

    const iconStyle = {
        position: 'absolute',
        top: '50%',
        left: '0',
        transform: 'translate(100%, -50%)',
        width: '15px'
    }

    const inputStyle = {
        height: props.height,
        paddingLeft: '50px'
    }

    return (
        <div style={{position: 'relative', display: 'flex', flexDirection: 'column'}}>
            <input
                className='fs-15 enter-input-text cadet-blue'
                onChange={handleInputChange}
                placeholder={props.placeholder}
                style={inputStyle}
                value={props.value}
            />
            <img src={props.icon} alt={props.alt} style={iconStyle}></img>
        </div>
    );
}

export default IconTextField