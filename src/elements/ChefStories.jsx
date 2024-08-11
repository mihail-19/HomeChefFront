import { useEffect, useState } from "react"
import './ChefStories.css'
import SearchButtonLeft from '../assets/SearchButtonLeft.png'
import SearchButtonRight from '../assets/SearchButtonRight.png'
import chefStabImg1 from '../assets/stabs/chefStabImg1.png'
import chefStabImg2 from '../assets/stabs/chefStabImg2.png'
import chefStabImg3 from '../assets/stabs/chefStabImg3.png'
import { getStories } from "../services/ChefStoryService"
import imagesUrl from "../imagesUrl"

const ChefStories = () =>{
    const defaultStories = [
        {
            chefId: 1,
            imageURL: chefStabImg1,
            name: "Наталія",
            city: "м. Харків",
            kitchenTypes: ["українська", "європейська"],
            title: "Моя історія",
            text: "Lorem ipsum dolor sit amet consectetur. Vestibulum nulla purus est orci ut purus scelerisque. Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim. Vestibulum nulla purus est orci ut purus scelerisque. Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim."
        },
        {
            chefId: 2,
            imageURL: chefStabImg2,
            name: "Світлана",
            city: "м. Київ",
            kitchenTypes: ["українська", "азіатська"],
            title: "Моя історія",
            text: "Vestibulum nulla purus est orci ut purus scelerisque.  Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim. Vestibulum nulla purus est orci ut purus scelerisque. Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim."
            
        },
        {
            chefId: 3,
            imageURL: chefStabImg3,
            name: "Антон",
            city: "м. Ужгород",
            kitchenTypes: ["українська", "мексиканська"],
            title: "Моя історія",
            text: "Lorem ipsum dolor sit amet consectetur. Vestibulum nulla purus est orci ut purus scelerisque. Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim. Vestibulum nulla purus est orci ut purus scelerisque. Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim."
            
        }
    ]
    const [stories, setStories] = useState(defaultStories); 

    useEffect(() => {
        loadStories()
    }, [])

    async function loadStories(){
        const {data} = await getStories()
        if(data && data.length > 0)
        setStories(data)
    }

    let initElems = 1
    if (window.matchMedia("(min-width: 1000px)").matches){
        initElems = 2
    }
    const [elementsNumber, setElementsNumber] = useState(initElems)
    const [storyIndexes, setStoryIndexes] = useState({start:0, end:elementsNumber})
    function resizeHandler(){
        if(window.matchMedia("(min-width: 1000px)").matches){
            setStoryIndexes(2)
            setStoryIndexes({start: storyIndexes.start, end: storyIndexes.start+2})
        } else {
            setStoryIndexes(1)
            setStoryIndexes({start: storyIndexes.start, end: storyIndexes.start+1})
        }
        
    }
    window.matchMedia("(min-width: 1000px)").addEventListener('change', resizeHandler);
    function scrollRight(){
        if(storyIndexes.end<stories.length){
            setStoryIndexes({
                start: storyIndexes.start+1,
                end: storyIndexes.end+1
            })
        }
    }
    function scrollLeft(){
        console.log(storyIndexes)
        if(storyIndexes.start>0){
            setStoryIndexes({
                start: storyIndexes.start-1,
                end: storyIndexes.end-1
            })
        }
    }
    return (
        <div className='home__chef-stories'>
            <div className="home__chef-stories-header">
                <h2>Історії наших Шефів</h2>
          </div>
          <div className='home__chef-stories-slider'>
            <button className='home__chef-stories-button' onClick={() => scrollLeft()}>
                <img src={SearchButtonLeft}></img>
            </button>

            <div className='home__chef-stories-list'>
              {stories.slice(storyIndexes.start, storyIndexes.end).map(story=>
                <div className="chef-story-item">
                    <div className="chef-story-item__header">
                        <div className="chef-story-item__header-img">
                            <img style={{borderRadius:"50%"}} src={imagesUrl + story.imageURL}></img>
                        </div>
                        <div className="chef-story-item__header-info">
                            <div className="chef-story-item__chef-info">
                                <b>{story.name}</b>, {story.city}
                            </div>
                            <div className="chef-story-item__kitchen">
                                <b>Кухня</b>: {story.kitchenTypes[0]}, {story.kitchenTypes[1]}
                            </div>
                        </div>
                    </div>
                        <h3>{story.title}</h3>
                        <div className="chef-story-item__story">
                            {story.text}
                        </div>
                </div>
              )}
            </div>

            <button className='home__chef-stories-button' onClick={() => scrollRight()}>
                <img src={SearchButtonRight}></img>
            </button>

          </div>
        </div>
    )
}

export default ChefStories