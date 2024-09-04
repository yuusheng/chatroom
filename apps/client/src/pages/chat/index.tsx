import ChatRoom from './ChatRoom'
import { Header } from '~/components/Header'

function Chat() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <main className="pb-5 px-40 flex-1 overflow-hidden">
        <ChatRoom />
      </main>
    </div>
  )
}

export default Chat
