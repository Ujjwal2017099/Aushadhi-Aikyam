import React, { useState } from 'react'
import Main from '../Components/Main'
import HeroSection from '../Components/HeroSection'
import GetPrescription from '../Components/GetPrescription'
import { motion } from "framer-motion"
import Loader from '../Components/Loader'
import MainBody from '../Components/MainBody'
import Footer from '../Components/Footer'

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
    <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
    <div style={style}>
      
      <HeroSection setText={setText} setData={setData} setLoder={setLoder}/>
      {
        text.length ?
        <GetPrescription text={text} data={data} setData={setData} loader={loader} setLoder={setLoder}/>
        : 
        <>
        <Main data={data} setData={setData} loader={loader} setLoder={setLoder} />
        {!loader && !data.length && <MainBody/>}
        <Footer/>
        </>
      }
      
    </div>
    </motion.div>
  )
}

export default Home