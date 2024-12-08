
import BlogDetails from './components/BlogDetails'
import Contact from './components/Contact'
import FavoritePage from './components/FavoritePage'
import Footer from './components/Footer'
import Header from './components/Header'
import Landing from './components/landing/landing'
import { BrowserRouter, Route, Routes } from 'react-router-dom'



function App() {

  return (
    <BrowserRouter>

     <Header/>
    
    <Routes>
        <Route path="/" element={<Landing/>} />
        {/* <Route path="/blogdetails" element={<BlogDetails />} /> */}
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path='/favorite' element={<FavoritePage />} />
        <Route path='contact' element={<Contact />} />
      </Routes>
     <Footer/>
    
    </BrowserRouter>
  )
}

export default App
