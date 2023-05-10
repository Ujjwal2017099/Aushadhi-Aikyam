import React from 'react'
import LocalSearchCard from '../Components/LocalSearchCard'


const LocalSearchResult = ({searchResult}) => {
    const style= {display:'inline-block',margin:'10px 15px'}
  return (
    <div style={{width:'100%' , minHeight:'580px', boxSizing:'border-box',padding:'20px 20px'}}>
        {
            searchResult.map((e)=>{
                return (<LocalSearchCard search={e} style={style} />)
            })
        }
    </div>
  )
}

export default LocalSearchResult