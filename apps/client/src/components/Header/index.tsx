import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useAtom, useAtomValue } from 'jotai'
import { onlineCountAtom, showUserJoinedAtom } from '~/atoms'
import { Switch } from '~/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { url } from '~/utils/url'
import { Button } from '../ui/button'

export function Header() {
  const onlineCount = useAtomValue(onlineCountAtom)
  const [showUserJoin, setShowUserJoin] = useAtom(showUserJoinedAtom)

  return (
    <header className="w-full py-2 px-5 flex items-center">
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        <div className="w-14 h-7 px-4 py-0.5 flex rounded-3xl bg-lime-200/30  items-center justify-between">
          <div className="h-1.5 w-1.5 bg-green-600/20 rounded-full relative">
            <div className="h-1.5 w-1.5 bg-green-600 blur-[1px]  rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <span className="">{onlineCount}</span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Switch
                data-state={showUserJoin ? 'checked' : 'unchecked'}
                checked={showUserJoin}
                onCheckedChange={setShowUserJoin}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>User Join Toast</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <UserInfo />
      </div>
    </header>
  )
}

function UserInfo() {
  const path = window.location.pathname

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal" forceRedirectUrl={url(path).href}>
          <Button variant="outline">
            Login
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}
