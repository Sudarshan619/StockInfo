import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import finnhubClient from './finnhub';

export default function Quote() {
    const location = useLocation();
    const { company } = location.state || {};
    const [quote, setQuote] = useState([]);



    const fetchDetails = () => {
        finnhubClient.quote(company, (error, data, response) => {
            console.log(data)
            setQuote(data);
        });
        finnhubClient.companyProfile2({'symbol': company}, (error, data, response) => {
            console.log(data)
        });
    }
    useEffect(() => {
        fetchDetails();
    }, [company]);

    return (
        <div>
            <div class="card" style={{ width: '30%', margin: 'auto' }}>
                <div class="card-header">
                    Quote for: {company}
                </div>
                <div class="card-body" style={{display:'flex',justifyContent:'center'}}>
                    <div style={{width:'50%'}}>
                        <h5 class="card-title">Closing:</h5>
                        <p class="card-text">${quote.c}</p>
                        <h5 class="card-title" style={{ color: 'red' }}>Low:</h5>
                        <p class="card-text" style={{ color: 'red' }}>${quote.l}</p>
                        <h5 class="card-title">Previous close:</h5>
                        <p class="card-text">${quote.pc}</p>
                        
                    </div>
                    <div style={{width:'50%'}}>

                    <h5 class="card-title">Open:</h5>
                    <p class="card-text">${quote.o}</p>
                        
                        <h5 class="card-title" style={{ color: 'green' }}>High:</h5>
                        <p class="card-text" style={{ color: 'green' }}>${quote.h}</p>
                        <h5 class="card-title">Percentage change:</h5>
                        <p class="card-text" style={{ color: quote.d >= 0 ? 'green' : 'red' }}>
                            {quote.d >= 0 ? '\u2191' : '\u2193'}{quote.d}%
                        </p>
                    </div>


                </div>
            </div>
        </div>
    );
}
