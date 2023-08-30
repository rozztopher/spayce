import React from 'react'

const URLInput = (props) => {

    const handleInput = (e) => {
        props.set(e.target.value)
    }

    const inputStyle = {
        height: props.height,
        marginTop: '1vh',
        paddingLeft: '6rem'
    }

    return (
        <div style={{position: 'relative', display: 'flex', flexDirection: 'column'}}>
            <label className='fs-15 medium' htmlFor={props.label}>{props.label}<span className='purple'>*</span></label>
            <div style={{position: 'relative'}}>
                <input
                    className='fs-14 enter-input-text ube-90'
                    placeholder={props.placeholder}
                    style={inputStyle}
                    id={props.label}
                    onChange={handleInput}
                    value={props.value}
                />
                <p className='fs-14' style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '48%',
                    transform: 'translate(0%, -27.5%)',
                    margin: 0
                }}>
                    spayce.io/
                </p>
            </div>
        </div>
    );
}

export default URLInput