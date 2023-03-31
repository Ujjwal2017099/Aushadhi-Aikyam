import React, { useState } from 'react'
import './style.css'
// import {Link} from 'react-router-dom'
import health from '../assets/donate.png'
import $ from "jquery";
import axios from 'axios'

const Main = () => {
  const [data,setData] = useState([]);

  
  const getData = ()=>{
    axios({
      method: "GET",
      headers: { 'content-type': 'application/json' },
      url: `http://localhost:8000/?name=dolo`,
    }).then((res)=>{
      setData(res.data);
      // console.log(res.data);
    }).catch((err)=>{
      // console.log(err);
    })
  }

  function functionAlert(msg, myYes) {
     var confirmBox = $("#confirm");
     confirmBox.find(".message").text(msg);
     confirmBox.find(".yes").unbind().click(function() {
        confirmBox.hide();
     });
     confirmBox.find(".yes").click(myYes);
     confirmBox.show();
  }
  // const search = ["a","b","c","d","e"];
  return (
    <div className='main-main'>
        <form action="" onSubmit={(e)=>{e.preventDefault();functionAlert();getData()}} >
            <input type="text" placeholder='Enter medicine name' required/>
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

        {data.length===0 ? <></>:<table className='data'>
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
                      return <tr className='data-row'>
                        <td>{el.company}</td>
                        <td>{el.name}</td>
                        <td>{el.price}</td>

                      </tr>
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