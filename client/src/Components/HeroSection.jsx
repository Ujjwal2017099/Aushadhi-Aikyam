import React, {   useState ,useEffect} from 'react'
import icon from '../assets/icon.svg'
import {Link }from 'react-router-dom'
import search from '../assets/search.png'
import './style.css'
import axios from 'axios'
import Avatar from './Avatar'
import loginRightIcon from '../assets/loginRightIcon.png'
import { URl } from './AxiosUtil'

const HeroSection = ({setText,setLoder}) => {
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
                {!Name&&<div className="login-btn"><Link to='/Login'>Login</Link></div>}
                {!Name&&<div className="login-btn" style={{marginLeft:'5px'}} ><Link to='/Signup'>Signup</Link></div>}
            </span>
        </span>
        <div style={{width:'30%',display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
            <div style={{display:'flex',alignItems:'center',gap:'25px'}}>
                {Name&&<Link to='/profile' target='_blank'><Avatar Name={Name}/></Link>}
                {Name&&<div className="login-btn shadow" style={{backgroundColor:'#F7941D'}} onClick={logout}>Logout</div>}
            </div>
            <img src={icon} alt="" />
        </div>
    </div>
  )
}

export default HeroSection