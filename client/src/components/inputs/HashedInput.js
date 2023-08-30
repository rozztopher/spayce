import React from 'react'

const HashedInput = (props) => {

    const handleInput = (e) => {
        props.set(e.target.value)
    }

    const inputStyle = {
        height: props.height,
        marginTop: '1vh'
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
                <div style={{
                    width: '1px',
                    height: (parseInt(props.height.split('px')[0]) * 0.55)+'px',
                    background: 'rgba(143, 135, 202, 0.2)',
                    position: 'absolute',
                    bottom: '15%',
                    right: '25%'
                }}></div>
                <div className='fs-14 dark-blue-grey' style={{
                    position: 'absolute',
                    top: '50%',
                    right: '7.5%',
                    transform: 'translate(0%, -25%)'
                }}>#{props.hash}</div>
            </div>
        </div>
    );
}

export default HashedInput