import React from 'react'

const TextField = (props) => {

    const handleInputChange = (e) => {
        props.set(e.target.value)
    }

    const inputStyle = {
        height: props.height,
        marginTop: '1vh'
    }

    return (
        <div style={{position: 'relative', display: 'flex', flexDirection: 'column'}}>
            <label className='fs-15 semi-bold' htmlFor={props.label}>{props.label}<span className='purple'>*</span></label>
            <input
                className='fs-15 enter-input-text cadet-blue'
                onChange={handleInputChange}
                placeholder={props.placeholder}
                style={inputStyle}
                value={props.value}
            />
        </div>
    );
}

export default TextField