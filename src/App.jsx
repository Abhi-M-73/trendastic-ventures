import { Toaster } from 'react-hot-toast'
import Navigation from './routes/Navigation'

const App = () => {
  return (
    <>
      <Navigation />

      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#10B981",
              color: "white",
              fontSize: "15px",
              padding: "12px 16px",
              borderRadius: "10px",
              fontWeight: "600",
            },
            iconTheme: {
              primary: "white",
              secondary: "#10B981",
            },
          },
          error: {
            style: {
              background: "#EF4444",
              color: "white",
              fontSize: "15px",
              padding: "12px 16px",
              borderRadius: "10px",
              fontWeight: "600",
            },
            iconTheme: {
              primary: "white",
              secondary: "#EF4444",
            },
          },
          style: {
            background: "#1F2937",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "15px",
          },
        }}
      />
    </>
  )
}

export default App
