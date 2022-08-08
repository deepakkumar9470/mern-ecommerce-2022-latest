import React from 'react'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import AdminDashboard from './admin/AdminDashboard';
import AddProduct from './admin/AddProduct';
import MyLogin from './pages/MyLogin';
import MySignUp from './pages/MySignUp';
import Navigation from './components/Navigation';
import {useSelector } from 'react-redux';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import OrdersPage from './pages/OrdersPage';
import EditProductPage from './admin/EditProductPage';
import ScrollToTop from './components/ScrollToTop';
function App() {
  const {user} = useSelector((state) => state);
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
      <Navigation/>
         <Routes>
            <Route index element={<Home/>}/>
            <Route path="*" element={<Home/>}/>
              {!user && <>
                <Route path='/login' element={<MyLogin/>}/>
                  <Route path='/signup' element={<MySignUp/>}/>
              </>}

              {user && (
                <>
                   <Route path='/cart' element={<Cart/>}/>
                </>
              )
              }

            {user && user.isAdmin && (
              <>
                 <Route path='admin' element={<AdminDashboard/>}/>
                 <Route path='/product/:id/edit' element={<EditProductPage/>}/>
              </>
              )
              }
            <Route path='/order' element={<OrdersPage/>}/>
           
            <Route path='/product/:id' element={<ProductPage/>}/>
            <Route path='/category/:category' element={<CategoryPage/>}/>
            
            <Route path='/new-product' element={<AddProduct/>}/>
            
         </Routes>
      </BrowserRouter>
       
       
    </div>
  );
}

export default App;
