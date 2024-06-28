


import { Link } from 'react-router-dom'
import './Pages.css'

const Pages = ({currentPage, totalPages, buildLinkToPage}) => {
    if(!totalPages || totalPages === 0){
            
        return <></>
    }
   
    function buildPages(){
        const pages = []
        
        for(let i = 1; i < totalPages+1; i++){
            if(i === currentPage){
                pages.push({
                    pageNumber: i,
                    isCurrent: true
                })
            } else {
                pages.push({
                    pageNumber: i,
                    isCurrent: false
                })
            }
            
        }
        return pages
    }

    return (
    <div className="pages">
                {currentPage > 1 &&
                    <Link to={buildLinkToPage(currentPage - 1)} className="pages__page">{'<'}</Link>
                }
                {currentPage < 2 && 
                    <div className="pages__page pages__page_disabled">{'<'}</div>
                }
                <div className="pages__page-blocks">
                    {buildPages().map(p => {
                        return p.isCurrent ? <div className="pages__page pages__page_current">{p.pageNumber}</div> : <Link to={buildLinkToPage(p.pageNumber)} className='pages__page'>{p.pageNumber}</Link>
                    })}
                </div>
                {currentPage < totalPages &&
                    <Link to={buildLinkToPage(currentPage + 1)} className="pages__page">{'>'}</Link>
                }
                {currentPage  >= totalPages && 
                    <div className="pages__page pages__page_disabled">{'>'}</div>
                }
        </div>
    )
}

export default Pages