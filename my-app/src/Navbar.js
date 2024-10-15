import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{background: 'transparent !important',position: 'sticky', top: '0',width: '100%',zIndex:'99'}}>
  <Link  className="navbar-brand " to="#">StockINFO</Link  >
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link  className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link  >
      </li>
      <li className="nav-item">
        <Link  className="nav-link" to="company">Features</Link  >
      </li>
      <li className="nav-item">
        <Link  className="nav-link" to="ipo">IPO</Link  >
      </li>
      <li className="nav-item">
        <Link  className="nav-link disabled" to="#">Disabled</Link  >
      </li>
    </ul>
  </div>
</nav>
    )
}
