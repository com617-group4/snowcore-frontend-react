import React from 'react'
import ReactDOM from 'react-dom'
import ResortSection from './ResortSection';


function accPhoto() {
  ReactDOM.render(
    <div className="flex flex-col h-4/5 ">

      <photoA></photoA>

      <div className='flex flex-col w-1/2 mt-5 self-center' >
            <h3><b>Add Photo</b></h3>

            <input type="file" id="file-input" name="ImageStyle"/>

            <button className="hover:bg-red-600 hover:cursor-pointer border-2 border-blue-50 text-white bg-blue-400 w-20 p-1" value="Submit">Upload Photo</button>
        </div>


    </div>
    , document.getElementById("response"));
}



function userSection(props) {

  return (
    <div className="flex flex-col h-4/5 ">
      <div className=" self-center rounded-full mt-1 bg-blue-100 w-20 h-20 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="70px" height="70px" fill="currentColor" viewBox="0 0 14 14">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      </div>
      <div className="self-center mt-7 flex flex-col bg-gray-300 w-1/3">
        <a className="hover:underline cursor-pointer self-center" onClick={accPhoto}> Account Photo</a>
        <a className="hover:underline cursor-pointer self-center">Log Out</a>
        <a className="hover:underline cursor-pointer self-center">Delete Account</a>
      </div>
    </div>
  );

}
export default userSection;