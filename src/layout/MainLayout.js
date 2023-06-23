import NavBar from '@/components/NavBar'
import React from 'react'

const MainLayout = ({children}) => {
  return (
    <div>
        <NavBar/>
      {children}
    </div>
  )
}

export default MainLayout
