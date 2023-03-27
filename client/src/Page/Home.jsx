import React from 'react'
import Main from '../Components/Main'
import HeroSection from '../Components/HeroSection'

const Home = () => {
  const style = {
    display:'flex',
    flexDirection:'column',
    width:'100%',
    alignItems:'center'
  }
  return (
    <div style={style}>
      <HeroSection/>
      <Main/>
    </div>
  )
}

export default Home