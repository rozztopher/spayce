import React from 'react'

const EnterInput = (props) => {

    const handleSearchChange = (e) => {
        props.setSearchTerm(e.target.value)
    }

    const ctaStyle = {
        position: 'relative',
        background: 'linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)',
        width: '40px',
        height: '40px',
        borderRadius: "100%",
        marginTop: '-45px',
        marginRight: '5px',
        display: 'flex',
        justifyContent: 'center'
    }

    return (
        <div style={{position: 'relative', display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
            <input
                className='fs-15 enter-input cadet-blue'
                onChange={handleSearchChange}
                placeholder='Enter email'
            />
            <div style={ctaStyle}>
                <img src='/icons/right-arrow.svg' alt='right-arrow' style={{justifyContent: 'center'}}></img>
            </div>
        </div>
    );
}

export default EnterInput