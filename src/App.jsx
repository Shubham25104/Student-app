import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Front from './Components/Front'
import Output from './Components/Output';
import './App.css'

function App() {

  return (
    <>
     <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Front />} />
                    <Route path='/output' element={<Output />} />
                </Routes>
            </BrowserRouter>
    </>
  )
}

export default App
