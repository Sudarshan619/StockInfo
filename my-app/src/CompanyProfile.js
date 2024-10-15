import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import finnhubClient from './finnhub';

export default function CompanyProfile() {
    const location = useLocation();
    const { company } = location.state || {};
    const [companyProfile, setCompanyProfile] = useState([]);


    const fetchDetails = () => {
        finnhubClient.companyProfile2({ 'symbol': company }, (error, data, response) => {
            console.log(data)
            setCompanyProfile(data);
        });
    }
    useEffect(() => {
        fetchDetails();
    }, [company]);

    return (
        <div id="accordion" style={{ width: '60%', margin: 'auto' }}>
            <img src={companyProfile.logo} style={{width:'-webkit-fill-available',height:'60vh'}}/>
            <div class="card card-company">
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Company Information
                        </button>
                    </h5>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        <h5 class="card-title">Country</h5>
                        <p class="card-text">{companyProfile.country}</p>
                        <h5 class="card-title">Currency</h5>
                        <p class="card-text">{companyProfile.currency}</p>
                        <h5 class="card-title">Exchange</h5>
                        <p class="card-text">{companyProfile.exchange}</p>
                    </div>
                </div>
            </div>
            <div class="card card-company">
                <div class="card-header" id="headingTwo">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Company Stocks
                        </button>
                    </h5>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body">
                    <h5 class="card-title">Company Name</h5>
                    <p class="card-text">{companyProfile.name}</p>
                    <h5 class="card-title">Phone</h5>
                    <p class="card-text">{companyProfile.phone}</p>
                    <h5 class="card-title">Outstanding shares</h5>
                    <p class="card-text">{companyProfile.shareOutstanding}</p>
                    <h5 class="card-title">Market Capitalization</h5>
                    <p class="card-text">{companyProfile.marketCapitalization}</p>
                    </div>
                </div>
            </div>
            <div class="card card-company">
                <div class="card-header" id="headingThree">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <Link class="card-text" to={companyProfile.weburl}>Website</Link>
                        </button>
                    </h5>
                </div>
            </div>
        </div>
    )
}
