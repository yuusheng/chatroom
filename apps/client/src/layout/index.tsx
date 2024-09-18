import { ClerkProvider } from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Outlet />
      <Toaster />
    </ClerkProvider>
  )
}

export default App
