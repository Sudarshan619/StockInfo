import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import finnhubClient from './finnhub';


export default function Home() {

    const [gainers, setGainers] = useState([]);
    const [covid, setCovid] = useState([]);
    const [marketNews, setMarketnews] = useState([]);


    const fetchDetails = () => {
        finnhubClient.covid19((error, data, response) => {
            setCovid(data)

        });

        finnhubClient.marketNews("general", {}, (error, data, response) => {
            setMarketnews(data)
            console.log(data)
        });
    }
    useEffect(() => {
        fetchDetails()
    }, [])

    return (
        <div className='header-div'>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" style={{ height: '500px' }}>
                    <div className="carousel-item active" style={{ height: '500px' }}>
                        <div style={{ display: 'flex',alignItems:'center',width:'80%',margin:'auto',justifyContent:'center' }}>
                            <img className="d-block" src="stock.png" alt="First slide" style={{ height: '60vh', width: '50%' }} />
                            <div className='content-carousal'>
                                <h3 style={{color:'blue'}}>Daily News</h3>
                                <p>  Get the latest stock market news and updates to stay ahead of the trends.
                                    Market Highlights: Overview of daily market movements, including major indices and sectors driving the gains or losses.
                                    Company News: Track announcements, earnings reports, mergers & acquisitions, and regulatory actions affecting stock prices.
                                    Global Updates: Stay informed about events impacting global markets, such as geopolitical tensions, interest rate hikes, or energy price shifts.
                                    Commodity Watch: Live updates on oil, gold, and currency trends that influence the stock market.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ height: '500px' }}>
                        <div style={{ display: 'flex' ,alignItems:'center',width:'80%',margin:'auto',justifyContent:'center'}}>
                            <img className="d-block" src="stock1.webp" alt="Second slide" style={{ height: '60vh', width: '50%' }} />
                            <div className='content-carousal'>
                                <h3 style={{color:'blue'}}>IPO Updates</h3>
                                <p>   Stay ahead with the latest IPOs hitting the market.

                                    Upcoming IPOs: Get information on companies planning to go public, including their expected listing date, issue price, and market expectations.
                                    Recent Listings: Track how newly listed stocks are performing post-IPO with real-time updates on their opening prices, current value, and volatility.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ height: '500px' }}>
                        <div style={{ display: 'flex' ,alignItems:'center',width:'80%',margin:'auto',justifyContent:'center' }}>
                            <img className="d-block" src="stock2.webp" alt="Third slide" style={{ height: '60vh', width: '50%' }} />
                            <div className='content-carousal'>
                                <h3 style={{color:'blue'}}>Company Analytics</h3>
                                <p>  Analyze individual company performance with detailed insights.
                                    Financial Metrics: Access quarterly and annual reports with key indicators like revenue, net profit, P/E ratio, and EBITDA.
                                    Stock Performance: View historical trends and compare the company’s stock performance with industry benchmarks.
                                    Competitor Comparison: Get insights on how the company stacks up against its peers.
                                    News Impact: See how news events (earnings, new product launches, leadership changes) affect stock prices in real time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="ticker-wrap">
                <div className="ticker">
                    <div className="ticker__item">Covid deaths across the world</div>
                    {Array.isArray(covid) && covid.length > 0 ?
                        (
                            covid.map((element, index) => (
                                <div className="ticker__item" key={index}>
                                    <p className='p-covid'>{element.state}</p>
                                    <p className='p-covid'>Case:<span style={{ fontSize: '16px' }}>{element.case}</span></p>
                                    <p className='p-covid'>Death:<span style={{ fontSize: '16px' }}>{element.death}</span></p>
                                </div>
                            ))
                        ) : ""
                    }
                </div>
            </div>
            <div>
                {/* to handle undefined values */}
                {Array.isArray(gainers) && gainers.length > 0 ?
                    (
                        gainers.map((element) => {
                            <div className="card" style="width: 18rem;">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to="#" className="card-link">Card link</Link>
                                    <Link to="#" className="card-link">Another link</Link>
                                </div>
                            </div>
                        })
                    ) : ""

                }

            </div>
            {Array.isArray(marketNews) && marketNews.length > 0 ?
                (
                    marketNews.slice(0, 10).map((element, index) => (
                        <div class="header-container">
                            <div class="left">
                                <div class="inner">
                                    <h3>{element.headline}</h3>
                                    <p>{element.summary}</p>
                                </div>
                            </div>
                            <div class="right">
                                <img style={{ width: '100%' }} src={element.image} />
                            </div>
                        </div>
                    ))
                ) : ""

            }

        </div >
    )
}
