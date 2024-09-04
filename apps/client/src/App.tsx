import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/clerk-react'
import Chat from './pages/chat'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Chat />
      <Toaster />
    </ClerkProvider>
  )
}

export default App
