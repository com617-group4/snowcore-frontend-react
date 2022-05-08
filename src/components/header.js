import React, {useState, useCallback} from 'react'
import ReactDOM from 'react-dom'
import ResortSection from './ResortSection';
import Map from './map.js'
import UserSection from './userSection';
import axios from 'axios';
import { render } from 'react-dom';
import reactDom from 'react-dom';
//CHANGE ASAP
var token="";
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
var authAxios=axios.create({
  baseURL:apiurl,
  headers:{
    Authorization:`Bearer ${token}`
  }
})
//var userToken=""

function openMap(resorts){
    ReactDOM.render(
        <Map
       resorts={resorts}
        />
    , document.getElementById("response"))
}
  

/*
  function openHome(resortsResponse){
    var res=Array();
    var toRender = "";
    resortsResponse.then((resorts) => {
      resorts.data.map(async (resort) => 
      {
        console.log(resort.name)
       ReactDOM.render(
          <ResortSection
          resortsParsed={resort}

          ></ResortSection>
         , document.getElementById("response"))
         
      });
    });
  
   }*/
  
function Header(){
  const [resorts,setResorts]=useState([]);
  const [favresorts,setFavResorts]=useState([]);

  const [requestError,setRequestError]=useState();
  const [loginstate,setLoginState]= useState();
  const [fname,setFName]=useState();
  const [lname,setLName]=useState();
  const [pass,setPass]=useState();
  const [cpass,setCPass]=useState();
  const [mail,setMail]=useState();
  const [loginmail,setLoginMail]=useState();
  const [loginpass,setLoginPass]=useState();
  const test=()=>{
    console.log(fname+" "+lname+" "+pass+" "+cpass+" "+mail)
  }
  

  const getFaved =useCallback(async()=>{
    if(token==""){
      alert("Please Log In or register to access this feature")
    }
    else{
  
    //console.log(favresorts)
    //setFavResorts([])
    //console.log(favresorts)

    axios.get('http://localhost:8070/auth/favourites', {
        headers: {
          Authorization:`Bearer ${token}`
        }
      })
      .then(function(response){
          console.log(response)
          //setFavResorts(response)
          ReactDOM.render( <div className="flex flex-col h-4/5 ">
          <UserSection></UserSection>

          {response.data.map(( i) => {  
            
            return (<ResortSection
            resort={i}
            user={token}
            ></ResortSection>);
          })
          }</div>,document.getElementById("response"))
      })
      .catch(function (error) {
        console.log( error)
        //console.log(error.message);
        alert(error)
      });
 
    }
  })





  /*const openUser= function(resort){
    if(token==""){
      alert("Please Log In or register to access this feature")
    }
    else{
      getFaved()
      ReactDOM.render( <div className="flex flex-col h-4/5 ">
            <UserSection></UserSection>

      {resort.map(( i) => {  
        
        return (<ResortSection
        resort={i}
        user={token}
        ></ResortSection>);
      })
    }</div>,document.getElementById("response"))
    }
  }*/
//d31d924747487f3c6f202c18c79daa288ac8ec2b86cf618e133d9d9c05862adb
  const login =useCallback(async()=>{

      axios.post('http://localhost:8070/auth/signin',{
        
        email: loginmail,
        password: loginpass
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      ).then(function (response) {
        console.log(response)
        console.log(token)
        setLoginState(response.data.accessToken)
        token=response.data.accessToken

        fetchResorts()
        ReactDOM.render(
          <p>Hello {response.data.name} {response.data.surname}</p>
         , document.getElementById("welcome_txt"))
         //getFaved()
       
      })
        .catch(function (error) {
          console.log( error.response.data.message)
          //console.log(error.message);
          alert(error.response.data.message)
        });
  })

  const signup=useCallback(async()=>{
    if(pass==cpass){
      console.log(fname+" "+lname+" "+pass+" "+cpass+" "+mail)
      try{
    
      axios.post('http://localhost:8070/auth/signup', {
          email: mail,
          name: fname,
          surname: lname,
          password: pass
        })
        .then(function (response) {

            setLoginState(response.data.activationToken)//not working???
            console.log(response)
            token=response.data.activationToken
            console.log(token)

            alert("Successfully Registered!")
            fetchResorts()
            ReactDOM.render(
              <p>Hello {fname} {lname}</p>
             , document.getElementById("welcome_txt"))
           
         
         
        })
        .catch(function (error) {
          console.log( error.response.data.message)
          //console.log(error.message);
          alert(error.response.data.message)
        });
      return loginstate;        
    }
    catch(e){
      setRequestError(e.message);
    }
    }
    else{
      alert("Passwords do not match!")
    }
});

  const fetchResorts=useCallback(async()=>{
       try{
      
        const res=await authAxios.get(`http://localhost:8070/resort/`).then((resortsret) => {
        
            setResorts(resortsret.data);         
            return resortsret.data

        }).then((resortsretdata)=>{
          ReactDOM.render(<div className=" p-2 mt-6 flex-col gap-4">
            {resortsretdata.map(( i) => {     
              return (
              
              <ResortSection
                key={i._id}
               resort={i}
               user={token}
              ></ResortSection>);
            })
          }</div>,document.getElementById("response"))
        })
        return res;        
    }
    catch(e){
      setRequestError(e.message);
    }
    
  });

  
    return(
    <div id="wrapper">
  <div className=" px-4 pb-1 w-full flex justify-between bg-blue-300 h-16 text-3xl">
        <div className="mt-2"><h1 >SNOWCORE</h1></div>
        <button onClick={function(){  openMap(resorts)}} className="rounded-full flex justify-center  bg-white h-14 w-14 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-2" width="35px" height="35px"  viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
          </svg>
        </button>
        <button onClick={function(){  fetchResorts()}} className= "rounded-full bg-white   mt-1 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-2" width="35px" height="35px"  viewBox="0 0 16 16">
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
          </svg>
        </button>
        <div >
        <button onClick={function(){  getFaved()}} className="rounded-full mt-1 bg-white ">
            <svg xmlns="http://www.w3.org/2000/svg" width="55px" height="55px" fill="currentColor"  viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          </button>
          <div id='welcome_txt'></div>
          </div>
    </div>
    
    <div id="response" className='flex flex-col bg-fixed bg-cover bg-center mt-12' style={{ 
      backgroundImage: `url("../src/img/resort_bckg.jpg")` }} >
      
      <div className="flex flex-col">
        <div className="w-3/4   self-center">
          <h1  className=" text-center">Welcome to SNOWCORE!</h1>
          <p className="text-left mb-7">In this app you can see details regarding winter sport resorts in the world-famous Three-Valleys area.
          Please Login or Register below:</p>

        <div className='flex flex-col w-1/2 mt-5' >
          <h3><b>LOGIN</b></h3>
          <input value={loginmail} onChange={(e)=>setLoginMail(e.target.value)} required className="border-b-4 border-blue-400 mb-4 mt-2 focus:border-red-600 focus:outline-none" type="email" placeholder="Email"/>
          <input value={loginpass} onChange={(e)=>setLoginPass(e.target.value)} required className="border-b-4 border-blue-400 mb-4 focus:border-red-600 focus:outline-none" type="password" id="lname" name="lname" placeholder="Password"/>
          <button  onClick={ function(){  login()}} className="hover:bg-red-600 hover:cursor-pointer border-2 border-blue-50 text-white bg-blue-400 w-20 p-1" value="Submit">Login</button>
        </div>

        <div className='flex flex-col w-1/2 mt-5' >
          <h3><b>No Account? Register here.</b></h3>
          <input value={fname} onChange={(e)=>setFName(e.target.value)} required className="border-b-4 border-blue-400 mb-4 mt-2 focus:border-red-600 focus:outline-none"  type="text" id="fname" name="fname" placeholder="First Name"/>
          <input value={lname} onChange={(e)=>setLName(e.target.value)} required className="border-b-4 border-blue-400 mb-4 mt-2 focus:border-red-600 focus:outline-none" type="text" id="lname" name="lname" placeholder="Last Name"/>
          <input value={mail} onChange={(e)=>setMail(e.target.value)} required className="border-b-4 border-blue-400 mb-4 focus:border-red-600 focus:outline-none" type="email" id="mail" name="mail" placeholder="E-Mail"/>
          <input value={pass} onChange={(e)=>setPass(e.target.value)} required className="border-b-4 border-blue-400 mb-4 focus:border-red-600 focus:outline-none" type="password" id="pass" name="pass" placeholder="Password"/>
          <input value={cpass} onChange={(e)=>setCPass(e.target.value)} required className="border-b-4 border-blue-400 mb-4 focus:border-red-600 focus:outline-none" type="password" id="cpass" name="cpass" placeholder="Confirm Password"/>

          <button  onClick={function(){  signup()}} className="hover:bg-red-600 hover:cursor-pointer border-2 border-blue-50 text-white bg-blue-400 w-20 p-1" value="Submit">Register</button>
        </div>
        </div>
      </div>
    </div>
  </div>
    );
}
export default Header;
