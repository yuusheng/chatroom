import { onlineCountAtom } from "~/atoms";
import { useAtomValue } from "jotai";
import ChatRoom from "./ChatRoom";

function Chat() {
  const onlineCount = useAtomValue(onlineCountAtom);

  return (
    <>
      <header className="w-full h-10 py-1">
        <div className="w-16 px-4 py-0.5 flex rounded-3xl bg-lime-200 items-center justify-between">
          <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
          <span>{onlineCount}</span>
        </div>
      </header>
      <main>
        <ChatRoom />
      </main>
    </>
  );
}

export default Chat;
