import React ,{useState ,useEffect } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import axios from 'axios'
import { URl } from './AxiosUtil'

const Navbar = () => {
  const token = JSON.parse(localStorage.getItem('id'));
  const navigate = useNavigate()
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
          navigate('/login')
        })
    }
  },[token])
  const logout = ()=>{
        localStorage.setItem('id',JSON.stringify(""));
        setName('');
        navigate('/login')
    }
  return (
    <div style={{width:'100%',display:'flex'}}>
      <div style={{width:'88%',height:'1em'}}></div>
      <div style={{display:'flex',alignItems:'center',gap:'25px'}}>
          {Name&&<Link to='/profile'>
              <Avatar Name={Name}/></Link>}
          {Name&&<div className="logout-btn"  onClick={logout}>Logout</div>}
      </div>
    </div>
  )
}

export default Navbar