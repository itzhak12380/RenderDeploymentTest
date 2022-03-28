import React,{useContext} from 'react'
import { globalState } from '../../features/globalState/GlobalState'
function LoadMore() {
    const state = useContext(globalState)
    const [page, setPage] = state!.productsAPI.page
    const [result, setResult] = state!.productsAPI.result
    return (
        <div className="load_more">
            {
                result < page * 9 ? "" :
                <button onClick={()=>setPage(page+1)}>Load more</button>
            }
        </div>
    )
}

export default LoadMore
