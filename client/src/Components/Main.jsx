import React, { useEffect, useState } from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import health from '../assets/donate.png'
import $ from "jquery";
import axios from 'axios'
import { Audio } from 'react-loader-spinner'

const Main = ({data,setData,loader,setLoder}) => {
  
  const [search , setSearch] = useState("");
  
  const getData = ()=>{
    axios({
      method: "GET",
      headers: { 'content-type': 'application/json' },
      url: `http://localhost:8000/?name=${search}`,
    }).then((res)=>{
      setData(res.data);
      setLoder(false);
      // console.log(res.data);
    }).catch((err)=>{
      // console.log(err);
    })
  }
  const [history,setHistory] = useState([]);
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('id'));
    if(search.length && token.length){
      axios({
        method: 'GET',
        headers: {'content-type' : 'application/json'},
        url: `http://localhost:8000/profile?token=${token}`
      })
      .then((res)=>{
        setHistory(res.data.History);
        history.push(search);
        axios({
          method:'POST',
          headers : {'content-type' : 'application/json'},
          url: 'http://localhost:8000/userhistory',
          data  : JSON.stringify({token,history})
        })
      })
      .catch((err)=>{
  
      })
    }
  },[data])
  function functionAlert(msg, myYes) {
     var confirmBox = $("#confirm");
     confirmBox.find(".message").text(msg);
     confirmBox.find(".yes").unbind().click(function() {
        confirmBox.hide();
     });
     confirmBox.find(".yes").click(myYes);
     confirmBox.show();
  }
  return (
    <div className='main-main'>
        <form action="" onSubmit={(e)=>{e.preventDefault(); setLoder(true);setData([]); functionAlert();getData()}} >
            <input type="text" placeholder='Enter medicine name' value={search} onChange={(e)=>{setSearch(e.target.value)}} required/>
            <button type="submit">Search</button>
        </form>
      <div id='confirm'>
        <span>
          <h1 className='message'>Wish You a good health</h1>
          <img src={health} alt="" />
          <button className="yes">Thank You</button>
        </span>
      </div>
      <span>
        {
          loader&&<div className='loader'>
            <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="#3485E9"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                    
                  />
          </div>
        }
        {data.length===0 ? <></>:
        <table className='data'>
          <tr className='data-row table-header'>
            <td>Supplier</td>
            <td>Name</td>
            <td>Cost</td>
          </tr>
            {
              data.map((e)=>{
                
                return (
                  <>
                  {
                    e.map((el)=>{
                      if(el.B_R!==404){
                        return <tr className='data-row'>
                          <td><Link to={el.link} target='_blank'>{el.company}</Link></td>
                          <td><Link to={el.link} target='_blank'>{el.name}</Link></td>
                          <td>{el.price}</td>
                        </tr>
                      }
                    })
                  }
                  </>
                )
              })
            }
        </table>}
      </span>
    </div>
  )
}

export default Main