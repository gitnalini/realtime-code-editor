import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import EditorPage from './pages/editorPage';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
             
            style: {
              border: '1px solid #007100',
              padding: '16px',
              color: '#007100',
              background: '#f0f0f0',
            },
          },
          error: {
            style: {
              border: '1px solid #FF0000',
              padding: '16px',
              color: '#FF0000',
              background: '#fff0f0',
            },
          },
        }}
      />
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
