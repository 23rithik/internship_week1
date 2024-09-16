import { useState } from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Customer_home from './components/customer/Customer_home';
import Viewtickets from './components/customer/Viewtickets';
import Admin_home from './components/admin/Admin_home';
// import Movie_book from './components/customer/Movie_book'; // Ensure correct import path

import { Route, Routes } from 'react-router-dom';
import Movie_Book from './components/customer/Movie_book';
import TicketBook from './components/customer/Ticket_book';
import Review from './components/customer/Review';
import ListReview from './components/customer/ListReview';
// import TicketsPage from './components/customer/TicketsPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contactus' element={<Contact />} />
        
        <Route path='/customer_home' element={<Customer_home />} />
        <Route path='/viewtickets' element={<Viewtickets />} />
        <Route path='/movie_book/:id' element={<Movie_Book />} />
        <Route path='/tickets/:id' element={<TicketBook />} />
        <Route path='/review' element={<Review />} />
        <Route path='/listreview/:movieName' element={<ListReview />} />
        {/* <Route path='/showticket' element={<TicketsPage />} /> */}
        
        <Route path='/admin_home' element={<Admin_home />} />
      </Routes>
    </>
  );
}

export default App;
