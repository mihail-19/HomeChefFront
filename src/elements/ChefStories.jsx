import { useState } from "react"
import SearchButtonLeft from '../assets/SearchButtonLeft.png'
import SearchButtonRight from '../assets/SearchButtonRight.png'
import chefStabImg1 from '../assets/stabs/chefStabImg1.png'
import chefStabImg2 from '../assets/stabs/chefStabImg2.png'
import chefStabImg3 from '../assets/stabs/chefStabImg3.png'

const ChefStories = () =>{
    const defaultStories = [
        {
            chefId: 1,
            chefImgUrl: chefStabImg1,
            chefName: "Наталія",
            chefCity: "м. Харків",
            chefKitchens: ["українська", "європейська"],
            storyName: "Моя історія",
            storyText: "Lorem ipsum dolor sit amet consectetur. Vestibulum nulla purus est orci ut purus scelerisque. Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim. Vestibulum nulla purus est orci ut purus scelerisque. Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim."
        },
        {
            chefId: 2,
            chefImgUrl: chefStabImg2,
            chefName: "Світлана",
            chefCity: "м. Київ",
            chefKitchens: ["українська", "азіатська"],
            storyName: "Моя історія",
            storyText: "Vestibulum nulla purus est orci ut purus scelerisque.  Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim. Vestibulum nulla purus est orci ut purus scelerisque. Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim."
            
        },
        {
            chefId: 3,
            chefImgUrl: chefStabImg3,
            chefName: "Антон",
            chefCity: "м. Ужгород",
            chefKitchens: ["українська", "мексиканська"],
            storyName: "Моя історія",
            storyText: "Lorem ipsum dolor sit amet consectetur. Vestibulum nulla purus est orci ut purus scelerisque. Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim. Vestibulum nulla purus est orci ut purus scelerisque. Magna orci augue imperdiet sed amet quam. Sit vulputate pellentesque ut faucibus sed enim."
            
        }
    ]
    const [stories, setStories] = useState(defaultStories); 
    const [storyIndexes, setStoryIndexes] = useState({start:0, end:2})

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
                <h1>Історії наших Шефів</h1>
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
                            <img src={story.chefImgUrl}></img>
                        </div>
                        <div className="chef-story-item__header-info">
                            <div className="chef-story-item__chef-info">
                                <b>{story.chefName}</b>, {story.chefCity}
                            </div>
                            <div className="chef-story-item__kitchen">
                                <b>Кухня</b>: {story.chefKitchens[0]}, {story.chefKitchens[1]}
                            </div>
                        </div>
                    </div>
                        <h3>{story.storyName}</h3>
                        <div className="chef-story-item__story">
                            {story.storyText}
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