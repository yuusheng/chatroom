import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <main>
        <Outlet />
      </main>
      <Toaster />
    </ClerkProvider>
  )
}

export default App
