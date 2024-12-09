








import GuestLayout from './auth_components/guestlayout';
import BlogDetails from './components/BlogDetails'
import Contact from './components/Contact'
import FavoritePage from './components/FavoritePage'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Route, Routes , Navigate, useLocation } from 'react-router-dom'
import ProfileIndex from './components/Profile/ProfileIndex'
import Blogs from './components/Blogs'
import AboutUs from './components/AboutUs'
import Landing from './components/landing/Landing'
import GetAnswerFromArticle from './components/GetAnswerFromArticle'




function App() {
  // Determine the current route
  const location = useLocation();
  // const hideHeaderFooter = ["/login", "/signup"].includes(location.pathname);
  const hideHeaderFooter = ["/login", "/signup"].some((path) => location.pathname.startsWith(path));


  return (
    <div>
      {/* Conditionally render Header */}
      {!hideHeaderFooter && <Header />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing/>} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path='/favorite' element={<FavoritePage />} />
        <Route path='contact' element={<Contact />} />
        <Route path='/article' element={<Blogs /> }/>
        <Route path='/user' element={<ProfileIndex/>} />
        <Route path='/about' element={<AboutUs/>}/>


       {/* Authentication routes inside GuestLayout */}
       <Route path="/" element={<GuestLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Redirects */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {/* Conditionally render Footer */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;