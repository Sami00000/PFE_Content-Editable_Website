import { Route , createBrowserRouter , createRoutesFromElements , RouterProvider} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/contact';
import About from './pages/about';
import Photography from './pages/photography';
import DigitalMarketing from './pages/digitalMarketing';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route index element={<Home />} ></Route>
      <Route path='/contact' element={<Contact />} ></Route>
      <Route path='/about' element={<About />} ></Route>
      <Route path='/photography' element={<Photography />} ></Route>
      <Route path='/digitalmarketing' element={<DigitalMarketing />} ></Route>
    </Route>
  ));
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
