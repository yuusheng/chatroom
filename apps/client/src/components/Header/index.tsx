import { useAtom, useAtomValue } from 'jotai'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Switch } from '@radix-ui/react-switch'
import { onlineCountAtom, showUserJoinedAtom } from '~/atoms'

export function Header() {
  const onlineCount = useAtomValue(onlineCountAtom)
  const [showUserJoin, setShowUserJoin] = useAtom(showUserJoinedAtom)

  return (
    <header className="w-full h-10 py-2 px-5 flex items-center">
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        <div className="w-14 h-7 px-4 py-0.5 flex rounded-3xl bg-lime-200/30  items-center justify-between">
          <div className="h-1.5 w-1.5 bg-green-600/20 rounded-full relative">
            <div className="h-1.5 w-1.5 bg-green-600 blur-[1px]  rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <span className="">{onlineCount}</span>
        </div>

        <div className="flex gap-2 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Switch checked={showUserJoin} onCheckedChange={setShowUserJoin} />
              </TooltipTrigger>
              <TooltipContent>
                <p>User Join Toast</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <SignedOut>
            <SignInButton>
              Login to your account
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
