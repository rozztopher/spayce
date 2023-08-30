import React from 'react'

const TextArea = (props) => {

    const handleInputChange = (e) => {
        props.set(e.target.value)
    }

    const inputStyle = {
        height: props.height,
        paddingTop: '1vh',
        marginTop: '1vh'
    }

    return (
        <div style={{position: 'relative', display: 'flex', flexDirection: 'column'}}>
            <label className='fs-15 medium' htmlFor={props.label}>{props.label}<span className='purple'>*</span></label>
            <textarea
                className='fs-15 enter-input-text cadet-blue'
                onChange={handleInputChange}
                placeholder={props.placeholder}
                style={inputStyle}
                value={props.value}
            />
        </div>
    );
}

export default TextArea