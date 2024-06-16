import RangeSlider from "../elements/utility/RangeSlider"

const TestEntity = ({maxPriceRange, testVal, setTestVal}) => {
    
    return(
        <div>
            <RangeSlider rangeMax={maxPriceRange} values={testVal} setValues={setTestVal}/>
        </div>
    )
}

export default TestEntity