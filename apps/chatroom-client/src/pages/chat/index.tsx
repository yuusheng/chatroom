import { onlineCountAtom, showUserJoinedAtom } from "~/atoms";
import { useAtom, useAtomValue } from "jotai";
import ChatRoom from "./ChatRoom";
import { Switch } from "~/components/ui/switch";

function Chat() {
  const onlineCount = useAtomValue(onlineCountAtom);
  const [showUserJoin, setShowUserJoin] = useAtom(showUserJoinedAtom)

  return (
    <>
      <header className="w-full h-10 py-1 flex">
        <div className="w-16 px-4 py-0.5 flex rounded-3xl bg-lime-200 items-center justify-between">
          <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
          <span>{onlineCount}</span>
        </div>

        <div className="flex gap-2 items-center">
          <span>User Join Toast</span>
          <Switch checked={showUserJoin} onCheckedChange={setShowUserJoin} />
        </div>
      </header>
      <main>
        <ChatRoom />
      </main>
    </>
  );
}

export default Chat;
