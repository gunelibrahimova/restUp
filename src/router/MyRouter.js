import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurants from '../components/Restaurants/CreateRestaurants'
import Restaurants from '../components/Restaurants/Restaurants'
import Home from '../pages/Home'


const MyRouter = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/restaurants" element={<Restaurants/>}/>
            <Route path='/restaurants/create' element={<CreateRestaurants />}/>
        </Routes>
    </div>
  )
}

export default MyRouter