import { useEffect, useState } from "react"
import './ChefStories.css'
import SearchButtonLeft from '../assets/SearchButtonLeft.png'
import SearchButtonRight from '../assets/SearchButtonRight.png'
import chefStabImg1 from '../assets/chefStoryOlena.png'
import chefStabImg2 from '../assets/chefStoryKaterina.png'
import chefStabImg3 from '../assets/chefStoryAndriy.png'
import { getStories } from "../services/ChefStoryService"
import imagesUrl from "../imagesUrl"

const ChefStories = () =>{
    const defaultStories = [
        {
            chefId: 1,
            imageURL: chefStabImg1,
            name: "Олена",
            city: "м. Харків",
            kitchenTypes: ["українська", "європейська"],
            title: "Моя історія",
            text: "Привіт! Я Олена, і під час цих складних часів в Україні я вирішила, що хочу реалізувати свою мрію — зайнятися кулінарією на платформі Home Chef. Готування завжди приносило мені радість, і тепер я можу ділитися своїми улюбленими рецептами з іншими. Ця платформа стала для мене не лише можливістю заробити, а й знайти підтримку та натхнення від людей, які цінують домашню кухню. Давайте разом створювати атмосферу дружби та творчості, де кожен може показати свої кулінарні таланти!"
        },
        {
            chefId: 2,
            imageURL: chefStabImg2,
            name: "Катерина",
            city: "м. Чернівці",
            kitchenTypes: ["українська", "європейська"],
            title: "Моя історія",
            text: "Привіт усім! Я Катерина, і в останні місяці я зрозуміла, як важливо зберігати сімейні традиції через кулінарію. Тому я вирішила почати працювати на платформі Home Chef, щоб ділитися своїми улюбленими рецептами та підтримувати інших у цей непростий час. Ця платформа допомогла мені не тільки відкрити свій бізнес, а й об’єднати людей навколо смачних страв. Приєднуйтесь до мене, щоб разом створювати чудові кулінарні моменти та підтримувати одне одного!"
            
        },
        {
            chefId: 3,
            imageURL: chefStabImg3,
            name: "Андрій",
            city: "м. Київ",
            kitchenTypes: ["українська", "європейська"],
            title: "Моя історія",
            text: "Привіт! Я Андрій, і в умовах нинішньої ситуації в Україні я зрозумів, що кулінарія може стати справжнім джерелом радості і підтримки. Я обрав платформу Home Chef, щоб реалізувати свою пристрасть до готування та ділитися своїми улюбленими стравами з іншими. Тут я знайшов спільноту однодумців, які цінують домашню кухню. Давайте разом створювати смачні історії, адже кулінарія — це не лише їжа, а й емоції, які ми можемо дарувати одне одному!"
            
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
                            <img style={{borderRadius:"50%"}} src={story.imageURL}></img>
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