import React, { useEffect, useState, useRef } from 'react';
import BarChart from './Barchart';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import finnhubClient from './finnhub';

export default function CompanyFinancials() {
  const [company, setCompany] = useState("AAPL");
  const [annual, setAnnual] = useState([]);
  const [seriesType, setSeriesType] = useState("annual");
  const inputRef = useRef(null);


  const fetchDetails = (selectedSeries = "annual") => {
    finnhubClient.companyBasicFinancials(company, "series", (error, data) => {
      if (data && data.series && data.series[selectedSeries]) {
        console.log(data.series[selectedSeries]);

        const financialData = data.series[selectedSeries];
        setAnnual(financialData);
      } else {
        console.error('Failed to fetch data:', error);
      }
    });
    finnhubClient.quote(company, (error, data, response) => {
      console.log(data)
  });
  };

  useEffect(() => {
    fetchDetails(seriesType); 
  }, [seriesType, company]);

  const handleChange = (e) => {
    clearTimeout(inputRef.current);
    inputRef.current = setTimeout(() => {
      setCompany(e.target.value.toUpperCase());
    }, 1000);
  };

  const handleSeriesChange = (e) => {
    setSeriesType(e.target.value); // Update series type based on dropdown selection
  };

  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="form">
            <input
              type="text"
              onChange={handleChange}
              className="form-control form-input"
              placeholder="Type stock symbol only (e.g., AAPL)"
            />
          </div>
        </div>
      </div>

      <div style={{ margin: '16px 0' }}>
        <label>Select Series Type: </label>
        <select value={seriesType} onChange={handleSeriesChange}>
          <option value="annual">Annual</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>

      <div style={{ height: '400px', width: '100%', margin: '48px auto' }}>
        <BarChart data1={(seriesType== 'annual'?annual.roe:annual.roeTTM)} header={'Return on Equity'} title={seriesType}/>
      </div>
      <div style={{ height: '400px', width: '100%', margin: '48px auto'}}>
        <BarChart data1={annual.bookValue} header={'Book Value'} title={seriesType}/>
      </div>
      <div style={{ height: '400px', width: '100%', margin: '48px auto'}}>
        <BarChart data1={annual.salesPerShare} header={'Sales Per Share'} title={seriesType}/>
      </div>
      <Link  className="nav-link disabled" to="/quote" state={{company}}>Quote</Link  >
      <Link className='nav-link' to="/companyProfile" state={{company}}>Company Profile</Link>
    </div>
  );
}
