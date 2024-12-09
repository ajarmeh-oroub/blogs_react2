
import BlogDetails from './components/BlogDetails'
import Contact from './components/Contact'
import FavoritePage from './components/FavoritePage'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProfileIndex from './components/Profile/ProfileIndex'
import Blogs from './components/Blogs'
import AboutUs from './components/AboutUs'
import Landing from './components/landing/Landing'
import BlogGenerator from './components/BlogGenerator'


function App() {

  return (
    <BrowserRouter>

     <Header/>
    
    <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path='/favorite' element={<FavoritePage />} />
        <Route path='contact' element={<Contact />} />
        <Route path='blog' element={<Blogs /> }/>
        <Route path='/user' element={<ProfileIndex/>} />
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/aa' element={<BlogGenerator/>}/>
    
     
      
      </Routes>
     <Footer/>
    
    </BrowserRouter>
  )
}

export default App
