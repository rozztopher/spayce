import React, { useState, useEffect } from 'react'
import Slider from 'rc-slider'

const EditSlider = (props) => {

    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(Number(props.value))
    }, [props.value]);

    const handleChange = (v) => {
        setValue(v)
        props.set(v, props.src)
    }

    return (
        <div className={props.mt} style={{ width: '100%' }}>
            <div className='flex-edge'>
                <p className='fs-16-ep m0'>{props.title}</p>
                <p className='fs-16-ep m0'>{value}</p>
            </div>
            <Slider
                max={props.max}
                min={props.min}
                onAfterChange={props.onAfterChange}
                onChange={(v) => handleChange(v)}
                step={0.01}
                value={value}
            />
        </div>
    );
}

export default EditSlider