import React,{useEffect, useState} from 'react'
import './style.css'
import Clear from '../assets/clear.png'
import axios from 'axios'
// import Main from './Main'
import {Link} from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
import { URl } from './AxiosUtil'
import Loader from './Loader'

const GetPrescription = ({text,loader,setLoder}) => {
  // console.log(text);
    const token = JSON.parse(localStorage.getItem('id'));
    const [history,setHistory] = useState([]);
    const [present,setPresent] = useState(false);

    useEffect(()=>{
      if(token.length){
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
    if(t.length) arr.push(t)
    let k=0;
    const [d,setD] = useState("");
    const handleChange = (id,value)=>{
      text[id] = value;
    }

    const handleSubmit =  async (e)=>{
      e.preventDefault();
      // console.log(text);
      setData([]);
      setLoder(true);
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
          const url=`${URl}/?name=${e}`
          
          try {
             axios({
              method : 'GET',
              url,
              header : {"content-type" : 'application/json'}
            }).then((res)=>{
              console.log(res);
              setAns(res.data);
            }).catch((err)=>{

            })
          } catch (error) {
            
          }


        }
      })
      
    }
    useEffect(()=>{
      if(tempAns.length){
        let ans = data
        tempAns.forEach((e)=>{
          ans.push(e);
        })
        setData(ans);
        setAns([]);
        setLoder(false)
        console.log(data);
        console.log(ans);
      }
    },[tempAns])
  return (
    <>
      <h2 className='extract-instruction' >*Please remove the medicines you don't want and check the spellings and remove all the unwanted special characters (including " , ' etc.)</h2>
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
         {loader ?
            <div className='loader'>
                {/* <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="#3485E9"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                    
                /> */}
                <Loader/>
            </div>
         
         : 
         data.length===0 ? <></> :
          <table className='data'>
          <tr className='data-row table-header'>
            <td style={{borderRadius:'5px 0px 0px 0px'}}>Supplier</td>
            <td>Name</td>
            <td style={{borderRadius:'0px 5px 0px 0px'}}>Cost</td>
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
        </table>
         
         }
    </>
  )
}

export default GetPrescription