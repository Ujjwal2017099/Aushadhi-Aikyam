import React, { useEffect, useState } from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import health from '../assets/donate.png'
import $ from "jquery";
import axios from 'axios'
import { Audio } from 'react-loader-spinner'
import { URl } from './AxiosUtil';
import Loader from './Loader';
import LocalSearchResult from '../Page/LocalSearchResult';

const Main = ({loader,setLoder,netmeds,setNetmeds,apollopharmacy,setApollopharmacy,oneMg,setOneMg,pharmeasy,setPharmeasy,data,setData}) => {
  const pin = JSON.parse(localStorage.getItem('PIN'))
  const [search , setSearch] = useState("");
  const [localResult , setLocalResult] = useState([]);
  const [finalLocalResult , setFinalLocalResult] = useState([]);
  
  useEffect(()=>{
    if(netmeds && apollopharmacy && pharmeasy && oneMg &&netmeds.length && apollopharmacy.length && pharmeasy.length && oneMg.length){
      setLoder(false)
    }
  },[netmeds,apollopharmacy,pharmeasy,oneMg])

  
  useEffect(()=>{
    const temp = finalLocalResult;
    // console.log(temp);
    localResult.forEach((e)=>{
      temp.push(e);
    })
    setFinalLocalResult(temp);
    console.log(finalLocalResult);
    // console.log(localResult);
    
  },[localResult])

  const getData = async ()=>{
    // console.log(server);
    setApollopharmacy([])
    setNetmeds([])
    setOneMg([])
    setPharmeasy([])
    setFinalLocalResult([])
    setLoder(true);
    axios({
      method : 'GET',
      headers : {'content-type' : 'application/json'},
      url : `${URl}/autoCorrect?name=${search}`
    }).then((res)=>{
      // setSearch(res.data);
      console.log(res.data);
      const medicineName = res.data;
      axios({
        method : 'GET',
        headers : {'content-type' : 'application/json'},
        url : `${URl}/findProducts?title=${medicineName}&pin=${pin}`
      }).then((res)=>{
        console.log(res.data);
        setLocalResult(res.data);
      }).catch((err)=>{
      
      })
    })
    .catch((err)=>{

    })
    const option1 = {
      method: "GET",
      headers: { 'content-type': 'application/json' },
      url: `${URl}/pharmeasy?name=${search}`,
    }
    const option2 = {
      method: "GET",
      headers: { 'content-type': 'application/json' },
      url: `${URl}/1mg?name=${search}`,
    }
    const option3 = {
      method: "GET",
      headers: { 'content-type': 'application/json' },
      url: `${URl}/apollopharmacy?name=${search}`,
    }
    const option4 = {
      method: "GET",
      headers: { 'content-type': 'application/json' },
      url: `${URl}/netmeds?name=${search}`,
    }
    try {
      axios(option1).then((res)=>{setPharmeasy(res.data)}).catch((err)=>{})
      axios(option2).then((res)=>{setOneMg(res.data)}).catch((err)=>{})
      axios(option3).then((res)=>{setApollopharmacy(res.data)}).catch((err)=>{})
      axios(option4).then((res)=>{setNetmeds(res.data)}).catch((err)=>{})

      // setNetmeds(data4)
      // setApollopharmacy(data3)
      // setOneMg(data2)
      // setPharmeasy(data1)
      // console.log(data1);
      // console.log(data2);
      // console.log(data3);
      // console.log(netmeds);
    } catch (error) {
      
    }
    axios({
      method : 'GET',
      headers : {'content-type' : 'application/json'},
      url : `${URl}/findProducts?title=${search}&pin=${pin}`
    }).then((res)=>{
      // console.log(res.data);
      setLocalResult(res.data);
    }).catch((err)=>{
    
    })
    
  }
  const [history,setHistory] = useState([]);
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('id'));
    if(search.length && token && token.length){
      axios({
        method: 'GET',
        headers: {'content-type' : 'application/json'},
        url: `${URl}/profile?token=${token}`
      })
      .then((res)=>{
        setHistory(res.data.History);
        history.push(search);
        axios({
          method:'POST',
          headers : {'content-type' : 'application/json'},
          url: `${URl}/userhistory`,
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
    <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
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
      <span style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        
        {netmeds.length===0 ? <></>:
        <table className='data'>
          <tr className='data-row table-header'>
          
            <td style={{borderRadius:'5px 0px 0px 0px'}}>Supplier</td>
            <td >Name</td>
            <td style={{borderRadius:'0px 5px 0px 0px'}}>Cost</td>
          </tr>
            {
              netmeds.map((el)=>{
                if(el.B_R!==404){
                  return (
                    <>
                    {
                      // e.map((el)=>{

                           <tr className='data-row'>
                            <td><Link to={el.link} target='_blank'>Netmeds</Link></td>
                            <td><Link to={el.link} target='_blank'>{el.name}</Link></td>
                            <td>{el.price}</td>
                          </tr>

                      // })
                    }
                    </>
                  )
                  }
              })
            }
        </table>}
        {pharmeasy.length===0 ? <></>:
        <table className='data'>
          <tr className='data-row table-header'>
          
            <td style={{borderRadius:'5px 0px 0px 0px'}}>Supplier</td>
            <td >Name</td>
            <td style={{borderRadius:'0px 5px 0px 0px'}}>Cost</td>
          </tr>
            {
              pharmeasy.map((el)=>{
                if(el.B_R!==404){
                  return (
                    <>
                    {
                      // e.map((el)=>{

                           <tr className='data-row'>
                            <td><Link to={el.link} target='_blank'>Pharmeasy</Link></td>
                            <td><Link to={el.link} target='_blank'>{el.name}</Link></td>
                            <td>{el.price}</td>
                          </tr>

                      // })
                    }
                    </>
                  )
                  }
              })
            }
        </table>}
        {oneMg.length===0 ? <></>:
        <table className='data'>
          <tr className='data-row table-header'>
          
            <td style={{borderRadius:'5px 0px 0px 0px'}}>Supplier</td>
            <td >Name</td>
            <td style={{borderRadius:'0px 5px 0px 0px'}}>Cost</td>
          </tr>
            {
              oneMg.map((el)=>{
                if(el.B_R!==404){
                  return (
                    <>
                    {
                      // e.map((el)=>{

                           <tr className='data-row'>
                            <td><Link to={el.link} target='_blank'>1mg</Link></td>
                            <td><Link to={el.link} target='_blank'>{el.name}</Link></td>
                            <td>{el.price}</td>
                          </tr>

                      // })
                    }
                    </>
                  )
                  }
              })
            }
        </table>}
        {apollopharmacy.length===0 ? <></>:
        <table className='data'>
          <tr className='data-row table-header'>
          
            <td style={{borderRadius:'5px 0px 0px 0px'}}>Supplier</td>
            <td >Name</td>
            <td style={{borderRadius:'0px 5px 0px 0px'}}>Cost</td>
          </tr>
            {
              apollopharmacy.map((el)=>{
                if(el.B_R!==404){
                  return (
                    <>
                    {
                      // e.map((el)=>{

                           <tr className='data-row'>
                            <td><Link to={el.link} target='_blank'>Apollopharmacy</Link></td>
                            <td><Link to={el.link} target='_blank'>{el.name}</Link></td>
                            <td>{el.price}</td>
                          </tr>

                      // })
                    }
                    </>
                  )
                  }
              })
            }
        </table>}

        {
          loader&&<div className='loader'>
                  <Loader/>
          </div>
        }
        
      </span>
    </div>
    {
      (finalLocalResult && finalLocalResult.length !==0) &&
      <div style={{width:'25%',height:"100%",borderLeft:'1px solid grey',display:'block',marginTop: '70px'}}>
          <h3 style={{width:'100%',display:'flex',justifyContent:'center',fontFamily:'Poppins'}}>Local Chemist</h3>
          <LocalSearchResult searchResult={finalLocalResult} />
      </div>
    }
    </div>
  )
}

export default Main