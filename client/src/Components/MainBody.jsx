import React , {useState} from 'react'
import './mainBody.css'
import card1 from '../assets/doctor.jpg'

const MainBody = () => {
  const [pin,setPin] = useState('');
  const [med,setMed] = useState('');
  const handleSubmit = (e)=>{
    e.preventDefault();
    localStorage.setItem('PIN',pin)
    alert('Your Pin has been updated');
  }
  const handleCitySearch = (e)=>{
    e.preventDefault(); 
  }
  return (
    <>
    <div style={{
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:'70px',
        margin:'30px 0px'
    }}>
        <div className='mainbody-main'>
            <section>
                Find Medicine From Different Websites and Your Local Seller at One Place. 
            </section>

        </div>
        <div style={{
            fontFamily:'Poppins'
        }}>
            <div className="popup">
              <form onSubmit={handleSubmit} className="form">
                <div className="icon">
                  
                  <svg fill="#115dfc" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="140px" height="140px" viewBox="0 0 395.71 395.71" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path> </g> </g></svg>
                </div>
                <div className="note">
                  <label className="title">Enter Your Pin Code</label>
                  <span className="subtitle">Get Medicine from your local chemist</span>
                </div>
                <input required placeholder="PIN Code" pattern='^\d{6}$' value={pin} onChange={(e)=>{setPin(e.target.value)}} type="text" className="input_field"/>
                <button type='submit' className="submit">Submit</button>
              </form>
            </div>
        </div>
    </div>
    <div style={{
      width : '90%',
      display : 'flex',
      alignItems : 'center',
      justifyContent : 'center'
    }}>

      <div style={{
        width : '60%',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        gap : '20px'
      }}>
          <div style={{
            width : '30%'
          }}>
            <img style={{
              width : '100%',
              borderRadius : '0px 20px 0px 20px'
            }} src={card1} alt="" />
          </div>
          <div style={{
            display : 'flex',
            // alignItems:'center',
            justifyContent : 'center',
            width : '50%',
            flexDirection : 'column'
          }}>
            <h1 style={{
              fontFamily : 'Poppins'
            }}>Upload prescription or Search directly.</h1>
            <h2 style={{
              fontFamily : 'Poppins',
              color : '#5F5D6B'
            }}>Save money on your medicines</h2>
          </div>
      </div>
      <form className="form2" onSubmit={handleCitySearch}>
        <span className="title">Search in your city</span>
        <p className="description"> Make sure you entered the pin correctly</p>
        <div>
          <input placeholder="Medicine name" value={med} onChange={(e)=>{setMed(e.target.value)}} id="email-address"/>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default MainBody