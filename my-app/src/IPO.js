import React from 'react'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import finnhubClient from './finnhub';



export default function IPO() {

   const status = {
     'expected':'#828282',
     'priced':'rgb(145 229 133)',
     'filed':'yellow',
     'withdrawn':'#e85d65 '
   }
   const [ipo,setIpo] = useState([]);


    async function fetchDetails() {
        finnhubClient.ipoCalendar("2024-10-1", "2024-10-10", (error, data, response) => {
            if(error){
                console.error(error);
            }
            else{
                setIpo(data.ipoCalendar);
                console.log(ipo.length);
                console.log(data.ipoCalendar)
            }   
        });
        
    }

 useEffect(()=>{
   fetchDetails();
 },[])
  return (
    <div className='ipo-calender'>
         {Array.isArray(ipo) && ipo.length > 0 ?
                    (
                        ipo.map((element,index) => (
                            <div
                            className="card"
                            style={{
                              width: "18rem",
                              color: "black",
                              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                              margin: "10px",
                              borderRadius: "8px",
                              overflow: "hidden",
                              transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            key={index}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.05)";
                              e.currentTarget.style.boxShadow = "2px 2px 20px rgba(0, 0, 0, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.1)";
                            }}
                          >
                            <div
                              className="card-body"
                              style={{
                                border: "1px solid black",
                                borderRadius: "8px",
                                background: status[element.status],
                                padding: "16px",
                              }}
                            >
                              <h5 className="card-title" style={{ marginBottom: "8px" }}>
                                {element.name}
                              </h5>
                              <p
                                style={{
                                  fontSize: "24px",
                                  fontWeight: "bold",
                                  marginBottom: "12px",
                                }}
                              >
                                {element.symbol || element.name[0]}
                              </p>
                              <h6 className="card-subtitle mb-2 text-muted">
                                USD: {element.price || "0"}
                              </h6>
                              <p className="card-text">Exchange: {element.exchange || "Unknown"}</p>
                              <p className="card-text">Number Of Shares: {element.numberOfShares || "Unknown"}</p>
                              <p className="card-text">Total Share Value: {element.totalShareValue || "Unknown"}</p>
                            </div>
                          </div>
                          
                        ))
                    ) : "No ipo"
        }
    </div>
  )
}
