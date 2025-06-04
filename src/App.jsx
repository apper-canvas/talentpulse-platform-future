import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div>
<Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastClassName="rounded-xl border border-surface-200"
        bodyClassName="text-surface-800 font-medium"
        progressClassName="bg-primary"
      />
    </div>
  )
}

export default App