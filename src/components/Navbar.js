import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/contacts">contacts</Link>
      <Link to="/test">test</Link>
    </div>
  )
}

export default Navbar