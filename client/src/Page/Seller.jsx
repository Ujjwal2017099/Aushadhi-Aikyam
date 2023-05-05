import React, { useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import './seller.css'
import {Link} from 'react-router-dom'
import {URl} from '../Components/AxiosUtil'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Gst({gst,setGst}) {
  const style = {
    // border : '1px solid #000',
    padding : '15px 10px',
    borderRadius : '5px',
    margin : '30px 0px 0px 0px',
    // background: 'rgb(251 174 60)'
  }
  
  return (
    <form style={style}>
      <input type="text" onChange={(e)=>{setGst(e.target.value)}} pattern='^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$' value={gst} required placeholder='GST no.'/>
    </form>
  )
}

function SellerDetails({name,setName,number,setNumber,pin,setPin,add,setAdd}) {
  return (
    <form style={{paddingTop : '10px'}}>
      <input style={{display:'block'}} type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='seller-name' required/>
      <input style={{display:'block',margin:'10px 0px'}} type="tel" value={number}  onChange={(e)=>{setNumber(e.target.value)}} placeholder='mobile-number' required/>
      {/* <input style={{display:'block'}} type="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='emailId' required/> */}
      <input style={{display:'block',margin:'10px 0px'}} type='text' pattern='^\d{6}$' value={pin} onChange={(e)=>{setPin(e.target.value)}} required placeholder='PIN Code' />
      <input style={{display:'block'}}type='text' value={add} onChange={(e)=>{setAdd(e.target.value)}} required placeholder='address' />
    </form>
  );
}

function Confirmation() {
  return (
    <div>
      <form style={{
        padding : '0px 10px'
      }}>
        <p
          style={{
            fontFamily : 'Poppins'
          }}
        >By proceeding, you agree to our <Link
          style={{
            fontFamily : 'roboto',
            fontWeight : '700'
          }}
        to="/terms"> Terms &
                        Conditions and Privacy Policy.</Link> Thank You</p>
      </form>
    </div>
  );
}

const Seller = () => {
  const navigate = useNavigate()
  const [ activeStep, setActiveStep ] = useState(0);
  const token = JSON.parse(localStorage.getItem('id'));
  const steps = [
    { title: 'Enter GST Number' },
    { title: 'Seller Details' },
    { title: 'Verification' },
  ];

  function getSectionComponent(gst,setGst,number,setNumber,name,setName,pin,setPin,add,setAdd) {
    switch(activeStep) {
      case 0: return <Gst setGst={setGst} gst={gst} />;
      case 1: return <SellerDetails number={number} setNumber={setNumber} name={name} setName={setName} pin={pin} setPin={setPin} add={add} setAdd={setAdd} />;
      case 2: return <Confirmation/>;
      default: return null;
    }
  }

  const [gst , setGst] = useState("");
  const [number,setNumber] = useState("");
  const [name,setName] = useState("");
  const [pin,setPin] = useState("");
  const [add,setAdd] = useState("");
  const handleSubmit = ()=>{
    const rPin = /^\d{6}$/ , rGst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$/;
    const rNumber = /^(?:\+91|91)?[6-9]\d{9}$/;

    if(!rPin.test(pin)) {alert('Entered Pin is not vaild')}
    else if(!rNumber.test(number)) {alert('Entered Mobile no. is not vaild')}
    else if(!rGst.test(gst)) {alert('Entered Mobile no. is not vaild')}
    else{
      const url = `${URl}/upgradeToSeller?token=${token}`;
      const data = JSON.stringify({
        gst,number,name,pin,address:add
      })
      const options = {
        method : 'POST',
        headers : {'content-type':'application/json'},
        url,
        data
      }
      axios(options)
      .then(()=>{
        navigate('/profile');
      })
      .catch(()=>{
        navigate('/404')
      })
    }
  }
  return (
    
    <div className='step-par' >
      <Stepper
        steps={steps}
        activeStep={activeStep}
        />

        <div style={{
          width : '100%',
          height: '100%',
          display : 'flex',
          alignItems : 'center',
          justifyContent : 'center'
        }}>


          <div class="card">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="card-inner">

              { getSectionComponent(gst,setGst,number,setNumber,name,setName,pin,setPin,add,setAdd)  }
                {
                  activeStep === steps.length - 1
                  && 
                  <button onClick={handleSubmit} className='btn2'>
                      <span class="circle1"></span>
                      <span class="circle2"></span>
                      <span class="circle3"></span>
                      <span class="circle4"></span>
                      <span class="circle5"></span>
                      <span  class="text">Submit</span>
                  </button>
                }
              <span style={{display:'flex',width:'100%'}}>

                { activeStep !== 0 
                    && <button className='btn' style={{margin:'7px 0px 0px 10px'}} onClick={ () => setActiveStep(activeStep - 1) }>Previous</button>
                  }
                { activeStep !== steps.length - 1
                  && <button className='btn' style={{margin:'7px 0px 0px 10px'}} onClick={ () => setActiveStep(activeStep + 1) }>Next</button>
                }
              </span>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Seller