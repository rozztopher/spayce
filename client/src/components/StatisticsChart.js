import React from 'react'
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';

const StatisticsChart = (props) => {

    return (
        <div style={{ width: props.width, height: props.height }}>
            <CircularProgressbarWithChildren
                value={props.value}
                styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 1,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round',

                    // Text size
                    textSize: '32px',

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 1,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: props.color,
                    textColor: '#FFBC27',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                })}
            >
                <div style={{ fontSize: 16, marginTop: -10 }}>
                    <strong style={{ fontSize: '1vw' }}>{props.value}%</strong>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
}

export default StatisticsChart