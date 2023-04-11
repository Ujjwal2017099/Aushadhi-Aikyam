import React, { useState } from 'react'
import Main from '../Components/Main'
import HeroSection from '../Components/HeroSection'
import GetPrescription from '../Components/GetPrescription'

const Home = () => {
  const style = {
    display:'flex',
    flexDirection:'column',
    width:'100%',
    alignItems:'center'
  }
 
    const [text,setText] = useState([]);
    const [data,setData] = useState([]);
    const [loader,setLoder] = useState(false)
  return (
    <div style={style}>
      <HeroSection setText={setText} setLoder={setLoder}/>
      {
        text.length ?
        <GetPrescription text={text} data={data} setData={setData} loader={loader} setLoder={setLoder}/>
        : 
        <Main data={data} setData={setData} loader={loader} setLoder={setLoder} />
      }
    </div>
  )
}

export default Home