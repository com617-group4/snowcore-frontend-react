import React, {useState, useReducer, useEffect} from "react";
import ReactMapGL, {Marker , Popup} from "react-map-gl";
import MapPopover from "./MapPopover";
import "mapbox-gl/dist/mapbox-gl.css";
import * as resortsData from "../data/resorts.json"
const MAPBOX_TOKEN = 'pk.eyJ1IjoidWNoaXRlbHEiLCJhIjoiY2wxYXA3d2dtMjA4ZzNicXppZmo2ZjdvcSJ9.LwHj-wur2oC67KQ4rXBpgQ'; // Set your mapbox token here

function Map(props){
   
    //USE REDUCER

   // useEffect(()=>{
       // console.log(props.resorts)
        const [lng, setLng] = useState(null);

        const [lat, setLat] = useState(null);
        
        const [zoom, setZoom] = useState(9);
    //},[]);
    const [viewState, setViewState] = React.useState({
        latitude: 45.4841,
        longitude: 6.5256,
        zoom: 8,
        height:'100vh',
        width:'100vw'
      });

      const [selected,setSelected]=useState(null);
    
    return( <div>
          

        <ReactMapGL
       
         
        {...viewState} mapboxApiAccessToken={'pk.eyJ1IjoidWNoaXRlbHEiLCJhIjoiY2wxY2g1c2RyMDNwdDNqbWZjYnR4d2VpMCJ9.5IvXd_WjtdjMvSiufNx7fA'} 
        onViewportChange={viewState=>{
            
            
            setViewState(viewState);
        }}
        >
                {props.resorts.map(resort=>(
                    
                    <Marker key={resort._id}
                    latitude={resort.lat}  
                    longitude={resort.lng}     
                    >
                        <button onClick={(e)=>{
                            e.preventDefault();
                            setSelected(resort);
                            //console.log(e.target.parent);
                            
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-signpost-split" viewBox="0 0 16 16">
                                <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7h5zm1 3V8H2l-.75 1L2 10h6zm0-5h6l.75-1L14 3H8v2z"/>
                            </svg>
                        </button>
                    </Marker>

                ))}
                {selected ? (
                    <Popup latitude={selected.lat} longitude={selected.lng} onClose={()=>{
                        setSelected(null);
                    }}>
                        <MapPopover resortName={selected.name} temperature={selected.weather.temp+"°C"} snow="0" workingHrs={selected.workingHours.start+" - "+selected.workingHours.end} recommendations={selected.favourites}></MapPopover>
                    </Popup>
                ):null}

        </ReactMapGL>

    </div>

    )
}

export default Map;
