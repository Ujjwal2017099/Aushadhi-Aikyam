import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import health from '../assets/donate.png'
import $ from "jquery";

const Main = () => {
  const data = [
    {
      name : "Dolo",
      price : 123,
      link : 'https://www.google.com',
      source : '1mg'
    },
    {
      name : "Dolo",
      price : 123,
      link : 'https://www.google.com',
      source : '1mg'
    },
    {
      name : "Dolo",
      price : 123,
      link : 'https://www.google.com',
      source : '1mg'
    },
    {
      name : "Dolo",
      price : 123,
      link : 'https://www.google.com',
      source : '1mg'
    },
    {
      name : "Dolo",
      price : 123,
      link : 'https://www.google.com',
      source : '1mg'
    }
  ]


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
        <form action="" onSubmit={(e)=>{e.preventDefault();functionAlert()}} >
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

        {data&&<table className='data'>
          <tr className='data-row table-header'>
            <td>Name</td>
            <td>Supplier</td>
            <td>Cost</td>
          </tr>
            {
              data.map((e)=>{
                return (
                <tr className='data-row'>
                  <td><Link to={e.link}>{e.name}</Link></td>
                  <td><Link to={e.link}>{e.source}</Link></td>
                  <td ><p className='price'>{e.price}/-</p></td>
                </tr>
                )
              })
            }
        </table>}
      </span>
    </div>
  )
}

export default Main