import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
            <nav className='text-neutral-100 w-full h-full flex justify-between item-center px-10 py-5'>
                <Link to="/" className='bg-neutral-950 px-3 py-2 rounded border border-neutral-800 transition cursor-pointer'>Loan Approval Prediction System</Link>
                <Link to="/docs" className='bg-neutral-900 px-3 py-2 rounded border border-neutral-800 transition hover:scale-95 cursor-pointer'>Docs</Link>
            </nav>
  )
}

export default Navbar
