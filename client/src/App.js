import React, { Suspense } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Loadeer from './Components/Loadeer.js'
const Home   = React.lazy(()=>import("./Pages/HomePages.js"))
const Search = React.lazy(()=>import("./Pages/SearchPage.js"))
const Profile= React.lazy(()=>import("./Pages/Profile.js"))
const AuthPage=React.lazy(()=>import("./Pages/AuthPage.js"))
const ProductDetail =React.lazy(()=>import("./Pages/ProductsDetails.js"))
const CreateProduct =React.lazy(()=>import("./Pages/AdminPages/CreateProduct.js"))
const EditProduct=React.lazy(()=>import('./Pages/AdminPages/EditProduct.js')) 


const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loadeer/>}> 
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path='/auth' element={<AuthPage/>}/> 
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/create-product" element ={<CreateProduct/>}/>
      <Route path='/update-product/:id' element={<EditProduct/>}/>

     </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
