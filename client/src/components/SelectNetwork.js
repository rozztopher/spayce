import React, { useState } from 'react'

const SelectNetwork = (props) => {

    const [open, setOpen] = useState(false)

    const chevron = open ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'

    const InitialSelect = () => {
        return (
            <div className='select-field pointer' onClick={() => setOpen(!open)}>
                <p className='ml-10'>{props.value}</p>
                <img className='mr-10' src={chevron} alt='chevron' />
            </div>
        )
    }

    const SelectOpen = () => {
        return (
            <div className='select-field-open' onClick={() => setOpen(!open)}>
                <div className='select-field-open-active'>
                    <p className='ml-1'>{props.value}</p>
                    <img className='mr-1 pointer' src={chevron} alt='chevron' />
                </div>
                <div className='horizontal-divider mt-2'></div>
                <div className='select-field-options ml-1'>
                    {props.options.map((option) => {
                        return (
                            <div className='select-field-option'>
                                <p className='pointer' key={option} onClick={() => props.set(option)}>{option}</p>
                                <div>
                                    {option === props.value && <img className='mr-1' src='/icons/purple-tick.svg' alt='tick'/>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <>
            {open && <SelectOpen/>}
            {!open && <InitialSelect/>}
        </>
    );
}

export default SelectNetwork