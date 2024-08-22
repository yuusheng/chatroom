import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'


export const onlineCountAtom = atom(0)

export const showUserJoinedAtom = atomWithStorage('show-user-join', true)
