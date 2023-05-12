import React,{useEffect, useState} from 'react'
import './style.css'
import Clear from '../assets/clear.png'
import axios from 'axios'
// import Main from './Main'
import {Link} from 'react-router-dom'
// import { Audio } from 'react-loader-spinner'
import { URl } from './AxiosUtil'
import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocalSearchResult from '../Page/LocalSearchResult'

const GetPrescription = ({text,loader,setLoder,setSearchResult,searchResult}) => {
  // console.log(text);
    const token = JSON.parse(localStorage.getItem('id'));
    const [history,setHistory] = useState([]);
    const [present,setPresent] = useState(false);
    const [pharmeasy,setPharmeasy] = useState([]);
    const [oneMg,setOneMg] = useState([]);
    const [netmeds,setNetmeds] = useState([]);
    const [apollopharmacy,setApollopharmacy] = useState([]);
    const [pharmeasyF,setPharmeasyF] = useState([]);
    const [oneMgF,setOneMgF] = useState([]);
    const [netmedsF,setNetmedsF] = useState([]);
    const [apollopharmacyF,setApollopharmacyF] = useState([]);
    const [oneMgCnt,setOneMgCnt] = useState(0);
    const [onePharmeasyCnt,setPharmeasyCnt] = useState(0);
    const [oneNetmedsCnt,setNetmedsCnt] = useState(0);
    const [oneApollopharmacy,setApollopharmacyCnt] = useState(0);

    useEffect(()=>{
      if(token && token.length){
        axios({
          method: 'GET',
          headers: {'content-type' : 'application/json'},
          url: `${URl}/profile?token=${token}`
        })
        .then((res)=>{
          setHistory(res.data.History);
          setPresent(true);
        })
        .catch((err)=>{
        
        })
      }
    },[])

    const [data,setData] = useState([]);
    // const [loader,setLoder] = useState(false)
    const [tempAns,setAns] = useState([]);
    let arr=[],t=[];
    for(let i=0;i<text.length;i++){
      if((i+1)%4===0){
        arr.push(t);
        t=[]
      }
      t.push(text[i])
    }
    if(t && t.length) arr.push(t)
    let k=0;
    const [d,setD] = useState("");
    const handleChange = (id,value)=>{
      text[id] = value;
    }
    const PIN = JSON.parse(localStorage.getItem('PIN'));
    const handleSubmit =  async (e)=>{
      e.preventDefault();
      // console.log(text);
      setOneMgF([]);
      setApollopharmacyF([]);
      setPharmeasyF([]);
      setNetmedsF([]);
      setLoder(true);
      setOneMgCnt(text.length)
      setApollopharmacyCnt(text.length)
      setPharmeasyCnt(text.length)
      setNetmedsCnt(text.length)
      
      

      await text.forEach(async (e)=>{
        if(e.length){
          if(present){
            history.push(e);
            axios({
              method:'POST',
              headers : {'content-type' : 'application/json'},
              url: `${URl}/userhistory`,
              data  : JSON.stringify({token,history})
            }).then((res)=>{

            }).catch((err)=>{

            })
          }
          const url1=`${URl}/pharmeasy?name=${e}`
          const url2=`${URl}/apollopharmacy?name=${e}`
          const url3=`${URl}/1mg?name=${e}`
          const url4=`${URl}/netmeds?name=${e}`
          
          
             axios({
              method : 'GET',
              header : {"content-type" : 'application/json'},
              url : url1,
            }).then((res)=>{
              // console.log(res);
              // setAns(res.data);
              setPharmeasy(res.data);
            }).catch((err)=>{
              console.log(err);
            })
          
          
             axios({
              method : 'GET',
              header : {"content-type" : 'application/json'},
              url :url2,
            }).then((res)=>{
              // console.log(res.data);
              // setAns(res.data);
              setApollopharmacy(res.data);
            }).catch((err)=>{
              console.log(err);
            })
          
          
             axios({
              method : 'GET',
              header : {"content-type" : 'application/json'},
              url :url3,
            }).then((res)=>{
              // console.log(res);
              // setAns(res.data);
              setOneMg(res.data);
            }).catch((err)=>{
              console.log(err);
            })
          
          
             axios({
              method : 'GET',
              header : {"content-type" : 'application/json'},
              url :url4,
            }).then((res)=>{
              // console.log(res);
              // setAns(res.data);
              setNetmeds(res.data);
            }).catch((err)=>{
              console.log(err);
            })
          
            if(PIN && PIN.length !== 0){
              const url = `${URl}/findProducts?title=${e}&pin=${PIN}`
              const options = {
                method : 'GET',
                headers : {'content-type' : 'application/json'},
                url
              }
              axios(options)
              .then((res)=>{
                let temp = searchResult;
                res.data.forEach((element)=>{
                  temp.push(element)
                })
                setSearchResult(temp);
              }).catch((err)=>{
                toast('Something went wrong')
              })
            }else{
              toast('Enter valid PIN code')
            }

        }else{
          setOneMgCnt(oneMgCnt-1)
          setApollopharmacyCnt(oneApollopharmacy-1)
          setPharmeasyCnt(onePharmeasyCnt-1)
          setNetmedsCnt(oneNetmedsCnt-1);
        }
      })
      // setLoder(false)
    }
    useEffect(()=>{
      if(oneMgCnt===0 && oneApollopharmacy===0 && onePharmeasyCnt===0 && oneNetmedsCnt===0){
        setLoder(false);
      }
    },[oneMgCnt,oneApollopharmacy,onePharmeasyCnt,oneNetmedsCnt])
    useEffect(()=>{
      if(netmeds && netmeds.length){
        let ans = netmedsF
        netmeds.forEach((e)=>{
          ans.push(e);
        })
        // ans.push(netmeds)
        setNetmedsF(ans);
        setNetmeds([]);
        // console.log(netmedsF);
        setNetmedsCnt(oneNetmedsCnt-1);
      }
    },[netmeds])
    useEffect(()=>{
      if(oneMg && oneMg.length){
        let ans = oneMgF
        oneMg.forEach((e)=>{
          ans.push(e);
        })
        // ans.push(oneMg);
        // setData(ans);
        setOneMgF(ans);
        setOneMg([]);
        // console.log(oneMgF)
        setOneMgCnt(oneMgCnt-1)
      }
    },[oneMg])
    useEffect(()=>{
      if(apollopharmacy && apollopharmacy.length){
        let ans = apollopharmacyF
        apollopharmacy.forEach((e)=>{
          ans.push(e);
        })
        // ans.push(apollopharmacy)
        setApollopharmacyF(ans);
        setApollopharmacy([]);
        setApollopharmacyCnt(oneApollopharmacy-1)
        // console.log(apollopharmacyF)
      }
    },[apollopharmacy])
    useEffect(()=>{
      if(pharmeasy && pharmeasy.length){
        let ans = pharmeasyF
        pharmeasy.forEach((e)=>{
          ans.push(e);
        })
        // ans.push(pharmeasy);
        setPharmeasyF(ans);
        setPharmeasy([]);
        setPharmeasyCnt(onePharmeasyCnt-1)
        // console.log(pharmeasyF)
      }
    },[pharmeasy])


  return (
    <>
      <h2 className='extract-instruction' >*Remove the medicines that you don't want and check the spellings </h2>
        <form className='extract-form shadow' onSubmit={handleSubmit} >
            <table className='extract-data-table' >
              {
                arr.map((e)=>{
                  
                  return (
                    <tr>
                      {
                        e.map((med)=>{
                          return (
                            <td className='extract-data-item'>
                              <input type="text" id={k++} value={med} onChange={(e)=>{
                                e.preventDefault()
                                setD(e.target.value);
                                // console.log(e.target.value);
                                handleChange(e.target.id , e.target.value);}} 
                              />
                              <img src={Clear} alt="" className="clear" id={`get-${k-1}`} 
                                onClick={(e)=>{
                                  e.preventDefault()
                                  let id = (e.target.id).split('-')[1]
                                  // setD("")
                                  // console.log(id);
                                  document.getElementById(id).value=""
                                  handleChange(id,"")
                                }}
                              />
                            </td>
                          )
                          
                        })
                      }
                    </tr>
                  )
                })
              }
            </table>

            <button type="submit">Submit</button>
        </form>
            <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
              <ToastContainer/>
              <div>

              
              <span style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
                 {(netmedsF && netmedsF.length===0) ? <></> :
                  <table className='data'>
                  <tr className='data-row table-header'>
                    <td style={{borderRadius:'5px 0px 0px 0px'}}>Supplier</td>
                    <td>Name</td>
                    <td style={{borderRadius:'0px 5px 0px 0px'}}>Cost</td>
                  </tr>
                    {
                      netmedsF.map((el)=>{

                        if(el.B_R!==404){
                          return (
                            <>
                                <tr className='data-row'>
                                  <td><Link to={el.link} target='_blank'>Netmeds</Link></td>
                                  <td><Link to={el.link} target='_blank'>{el.name}</Link></td>
                                  <td>{el.price}</td>
                                </tr>
                          
                            </>
                          )
                        }
                      })
                    }
                </table>}
                 {(pharmeasyF && pharmeasyF.length===0) ? <></> :
                  <table className='data'>
                  <tr className='data-row table-header'>
                    <td style={{borderRadius:'5px 0px 0px 0px'}}>Supplier</td>
                    <td>Name</td>
                    <td style={{borderRadius:'0px 5px 0px 0px'}}>Cost</td>
                  </tr>
                    {
                      pharmeasyF.map((el)=>{

                        if(el.B_R!==404){
                          return (
                            <>
                                <tr className='data-row'>
                                  <td><Link to={el.link} target='_blank'>Pharmeasy</Link></td>
                                  <td><Link to={el.link} target='_blank'>{el.name}</Link></td>
                                  <td>{el.price}</td>
                                </tr>
                          
                            </>
                          )
                        }
                      })
                    }
                </table>}
                 {(apollopharmacyF && apollopharmacyF.length===0) ? <></> :
                  <table className='data'>
                  <tr className='data-row table-header'>
                    <td style={{borderRadius:'5px 0px 0px 0px'}}>Supplier</td>
                    <td>Name</td>
                    <td style={{borderRadius:'0px 5px 0px 0px'}}>Cost</td>
                  </tr>
                    {
                      apollopharmacyF.map((el)=>{

                        if(el.B_R!==404){
                          return (
                            <>
                                <tr className='data-row'>
                                  <td><Link to={el.link} target='_blank'>Apollopharmacy</Link></td>
                                  <td><Link to={el.link} target='_blank'>{el.name}</Link></td>
                                  <td>{el.price}</td>
                                </tr>
                          
                            </>
                          )
                        }
                      })
                    }
                </table>}
                 {(oneMgF && oneMgF.length===0) ? <></> :
                  <table className='data'>
                  <tr className='data-row table-header'>
                    <td style={{borderRadius:'5px 0px 0px 0px'}}>Supplier</td>
                    <td>Name</td>
                    <td style={{borderRadius:'0px 5px 0px 0px'}}>Cost</td>
                  </tr>
                    {
                      oneMgF.map((el)=>{

                        if(el.B_R!==404){
                          return (
                            <>
                                <tr className='data-row'>
                                  <td><Link to={el.link} target='_blank'>1mg</Link></td>
                                  <td><Link to={el.link} target='_blank'>{el.name}</Link></td>
                                  <td>{el.price}</td>
                                </tr>
                          
                            </>
                          )
                        }
                      })
                    }
                </table>}
              </span>
              </div>

         {loader ?
            <div className='loader'>
                <Loader/>
            </div>
         
         : <></>
         }

          {
            (searchResult && searchResult.length !==0) &&
            <div style={{width:'25%',height:"100%",borderLeft:'1px solid grey',display:'block',marginTop: '70px'}}>
                <h3 style={{width:'100%',display:'flex',justifyContent:'center',fontFamily:'Poppins'}}>Local Chemist</h3>
                <LocalSearchResult searchResult={searchResult} />
            </div>
          }
      </div>
      </>
  )
}

export default GetPrescription