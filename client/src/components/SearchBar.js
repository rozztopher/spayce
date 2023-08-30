import React from 'react'

const SearchBar = (props) => {

    const handleSearchChange = (e) => {
        props.setSearchTerm(e.target.value)
    }

    const searchIconStyle = {
        position: 'absolute',
        left: '6.66%',
        top: '50%',
        transform: 'translate(0, -50%)'
    }

    const style = {
        height: props.height || '50px',
        width: props.width || '10rem'
    }

    return (
        <div style={{position: 'relative'}}>
            <input
                id='search-bar'
                className='nav-search fs-15'
                onChange={handleSearchChange}
                placeholder='Search spayce...'
                style={style}
            />
            <img src='/icons/search.svg' alt='search' style={searchIconStyle}></img>
        </div>
    );
}

export default SearchBar