import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './RangeSlider.css'
import { useState } from 'react';

const RangeSlider = ({rangeMax, values, setValues, onChangeCommited}) => {
    const max = 1000
    const min = 0
   console.log(rangeMax)
   if(!values){
    return <></>
   }
    const handleChange = (event, newValues) => {
        setValues(newValues);
      }
      function valuetext(value) {
        return `${value}°C`;
      }
    return (
        <div className="slider-container">
            <div className="slider__border-values">
                <div className="slider__border-value">
                    {rangeMax.low}
                </div>
                <div className="slider__border-value">
                    {rangeMax.high}
                </div>
            </div>
            <div className="slider__slider">
                <Slider  
                getAriaLabel={() => 'Temperature range'}
                getAriaValueText={valuetext}
                    value={values} 
                    min={rangeMax.low} 
                    max={rangeMax.high} 
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    onChangeCommitted={(event, value) => onChangeCommited(value)}
                    step={1}
                />
                </div>
            </div>
    )
}

export default RangeSlider