import React, {useState, useCallback} from 'react'
import ReactDOM from 'react-dom'
import ResortSection from './ResortSection';
import Map from './map.js'
import UserSection from './userSection';
import axios from 'axios';
//CHANGE ASAP
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0c2hrQGFidi5iZyIsImlhdCI6MTY0OTA2NzQ1MSwiZXhwIjoxNjQ5MDk2MjUxfQ.JJQ4--jlR53sUILx2HDiQeFZdm3JJ07PZ1Si7mYk4qg";
const apiurl="http://localhost:8070";
/* BAD PRACTICE.
axios.interceptors.request.use(
  config=>{
    config.headers.authorization=`Bearer ${token}`;
    return config;
  },
  error=>{
    return Promise.reject(error);
  }
)*/
const authAxios=axios.create({
  baseURL:apiurl,
  headers:{
    Authorization:`Bearer ${token}`
  }
})


function openMap(){
    ReactDOM.render(
        <Map
        lat="45.4841"
        lon="6.5256"
        />
    , document.getElementById("response"))
}
  
  function openUser(){
    ReactDOM.render(
      <div className="flex flex-col h-4/5 ">

     <UserSection></UserSection>
     
       <ResortSection
        resortName="Resort 1"
        temperature="15"
        snow="0"
        recommendations="100"
        workingHrs="10-5"
        />
     </div>
      , document.getElementById("response"));
  }

  function openHome(resortsResponse){
    var rendered="";

    resortsResponse.then((resorts) => {
      resorts.data.map(async (resort) => 
      {
       console.log(resort);
       rendered+=`<div className="flex flex-col h-4/5 ">       <h2 className="self-center">Resorts in the Three Valleys area:</h2>       <ResortSectionresortName=${resort.properties.name}temperature="15"  snow="0"      recommendations="100"      workingHrs="10-5"       />       </div>`

      });
      return rendered
    }).then((rendered) => {
    console.log(rendered);
     ReactDOM.render(
      rendered
      , document.getElementById("response")
    );
     })
  }
function Header(){
  const [resorts,setResorts]=useState([]);
  const [requestError,setRequestError]=useState();

  const fetchResorts=useCallback(async()=>{


    try{
        const res=await authAxios.get(`/resort`);
         // console.log(resorts.data);
          return res;
          
          // expected output: "Success!"
        
        
    }
    catch(e){
      setRequestError(e.message);
    }
    
  });

  
    return(
    <div id="wrapper">
  <div className=" px-4 pb-1 w-full flex justify-between bg-blue-300 h-16 text-3xl">
        <div className="mt-2"><h1 >SNOWCORE</h1></div>
        <button onClick={openMap} className="rounded-full flex justify-center  bg-white h-14 w-14 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-2" width="35px" height="35px"  viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
          </svg>
        </button>
        <button onClick={function(){  openHome(fetchResorts())}} className= "rounded-full bg-white   mt-1 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-2" width="35px" height="35px"  viewBox="0 0 16 16">
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
          </svg>
        </button>
       
        <button onClick={openUser} className="rounded-full mt-1 bg-white ">
            <svg xmlns="http://www.w3.org/2000/svg" width="55px" height="55px" fill="currentColor"  viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          </button>
      
    </div>
    <div id="response" className='bg-fixed bg-cover bg-center' style={{ 
      backgroundImage: `url("../src/img/resort_bckg.jpg")` }} >
      
      <div className="flex flex-col">
        <div className="w-3/4   self-center">
          <h1  className=" text-center">Welcome to SNOWCORE!</h1>
          <p className="text-left mb-7">In this app you can see details regarding winter sport resorts in the world-famous Three-Valleys area.
          Please Login or Register below:</p>

        <div className='flex flex-col w-1/2 mt-5' >
          <h3><b>LOGIN</b></h3>
          <input className="border-b-4 border-blue-400 mb-4 mt-2 focus:border-red-600 focus:outline-none" type="text" id="fname" name="fname" placeholder="Username"/>
          <input className="border-b-4 border-blue-400 mb-4 focus:border-red-600 focus:outline-none" type="password" id="lname" name="lname" placeholder="Password"/>
          <button className="hover:bg-red-600 hover:cursor-pointer border-2 border-blue-50 text-white bg-blue-400 w-20 p-1" value="Submit">Login</button>
        </div>

        <div className='flex flex-col w-1/2 mt-5' >
          <h3><b>No Account? Register here.</b></h3>
          <input className="border-b-4 border-blue-400 mb-4 mt-2 focus:border-red-600 focus:outline-none" type="text" id="fname" name="fname" placeholder="Username"/>
          <input className="border-b-4 border-blue-400 mb-4 focus:border-red-600 focus:outline-none" type="password" id="lname" name="lname" placeholder="Password"/>
          <input className="border-b-4 border-blue-400 mb-4 focus:border-red-600 focus:outline-none" type="password" id="lname" name="lname" placeholder="Confirm Password"/>

          <button className="hover:bg-red-600 hover:cursor-pointer border-2 border-blue-50 text-white bg-blue-400 w-20 p-1" value="Submit">Register</button>
        </div>
        </div>
      </div>
    </div>
  </div>
    );
}
export default Header;
