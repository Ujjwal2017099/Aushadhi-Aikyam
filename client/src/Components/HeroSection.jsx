import React, {   useState ,useEffect} from 'react'
import icon from '../assets/icon.svg'
import {Link }from 'react-router-dom'
import search from '../assets/search.png'
import './style.css'
import axios from 'axios'
import Avatar from './Avatar'
import loginRightIcon from '../assets/loginRightIcon.png'
import { URl } from './AxiosUtil'

const HeroSection = ({setText,setLoder,setData}) => {
    const [head,sethead] = useState("");
    const [coordinate,setCoordinate] = useState([0,0]);
    
    
    setTimeout(()=>{
        const headContent = [
            "Welcome to Aushadhi Aikyam...",
            "Compare your prescription cost from different websites..."
        ]
        let i=coordinate[0],j=coordinate[1];
        let length = headContent[i].length;
        
        if(coordinate[1]===length) {
            setCoordinate([(coordinate[0]+1)%headContent.length,0]);
            j=0;
            i=coordinate[0];
            sethead("")
        }
        else {
            sethead(head+headContent[i][j]);
            setCoordinate([i,j+1])
        }
    },200)
     const token = JSON.parse(localStorage.getItem('id'));

  const [Name,setName] = useState("");

  useEffect(()=>{
    if(token && token.length){
        const url = `${URl}/profile?token=${token}`
        
        const options = {
            method: "GET",
            headers: { 'content-type': 'application/json' },
            url
        };
        axios(options)
        .then((res)=>{
            // console.log(res.data);
            if(res.data){
                setName(res.data.Name)
            }
        }).catch((err)=>{
          // console.log(err);
        })
    }
  },[token])
    const [file,setFile] = useState(null); 
    const logout = ()=>{
        localStorage.setItem('id',JSON.stringify(""));
        setName('');
    }
    const uploadPrescription = (e)=>{
        e.preventDefault();
        // console.log(file[0]);
        setLoder(true)
        // setData([])
        
        const form = new FormData();
        form.append('file',file[0]);
        // console.log(form);
        axios({
            method : 'POST',
            url : `${URl}/getFile`,
            headers: { 'content-type': "multipart/form-data" },
            data : form
        }).then((res)=>{
            // let r = "";
            // for(let i=1;i<res.data.length;i++){
            //     const arr = res.data[i].split(' ');
            //     arr.map((e)=>{
            //         r += e+"%20"
            //     })
            //     r+="^^"
            // }
            setLoder(false)
            setText(res.data);
            // console.log(res.data);
            // navigate(`/editPrescription/?${r}`)
            
        }).catch((err)=>{
            console.log(err);
        })
    }
    const style={
        width:'45px',
        borderRadius:'50%'
    }
  return (
    <div className='hero-main '>
        <span>
            <div style={{ marginLeft:'0px', display:'flex',alignItems:'center', gap:'10px', backgroundColor:'transparent',border:'0px'}}>
                <img style={style} src={loginRightIcon} alt="" />
                <h3 style={{color:'#fff'}} >Aushadhi Aikyam</h3>
            </div>
            <h1>{head+'|'}</h1>
            <form action="" onSubmit={uploadPrescription}>
                <button  type="submit"><img  src={search} alt="" /></button>
                <input className='file-input ' type="file" onChange={(e)=>{setFile(e.target.files)}} required/>
            </form>
            <span style={{display:'flex',flexDirection:'row',gap:'0px',marginTop:'50px'}}>
                {!Name&&<div className="login-btn">
                    <Link to='/Login'>
                        Login
                    </Link>
                    </div>}
                {!Name&&<div className="login-btn" style={{marginLeft:'5px'}} ><Link to='/Signup'>Signup</Link></div>}
            </span>
        </span>
        <div style={{width:'30%',display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
            <div style={{display:'flex',alignItems:'center',gap:'25px'}}>
                {Name&&<Link to='/profile' target='_blank'>
                    <Avatar Name={Name}/></Link>}
                    {Name&&<Link to='/cart'>
                        <div className="card-local-button cart-navbar" style={{width:'30px',height:'30px',border:'2px solid #000',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <svg className="svg-icon" viewBox="0 0 20 20">
                            <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                            <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                            <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                          </svg>
                        </div>    
                        
                    </Link>}
                {Name&&<div className="logout-btn"  onClick={logout}>Logout</div>}
            </div>
            <img src={icon} alt="" />
        </div>
    </div>
  )
}

export default HeroSection