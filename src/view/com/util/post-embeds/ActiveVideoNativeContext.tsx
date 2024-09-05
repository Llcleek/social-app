import React from 'react'
import {useVideoPlayer, VideoPlayer} from 'expo-video'

import {isNative} from '#/platform/detection'

const Context = React.createContext<{
  activeSource: string
  activeViewId: string | undefined
  setActiveSource: (src: string | null, viewId: string | null) => void
  player: VideoPlayer
} | null>(null)

export function Provider({children}: {children: React.ReactNode}) {
  if (!isNative) {
    throw new Error('ActiveVideoProvider may only be used on native.')
  }

  const [activeSource, setActiveSource] = React.useState('')
  const [activeViewId, setActiveViewId] = React.useState<string>()

  const player = useVideoPlayer(activeSource, p => {
    p.muted = true
    p.loop = true
    // We want to immediately call `play` so we get the loading state
    p.play()
  })

  const setActiveSourceOuter = (src: string | null, viewId: string | null) => {
    setActiveSource(src ? src : '')
    setActiveViewId(viewId ? viewId : '')
  }

  return (
    <Context.Provider
      value={{
        activeSource,
        setActiveSource: setActiveSourceOuter,
        activeViewId,
        player,
      }}>
      {children}
    </Context.Provider>
  )
}

export function useActiveVideoNative() {
  const context = React.useContext(Context)
  if (!context) {
    throw new Error(
      'useActiveVideoNative must be used within a ActiveVideoNativeProvider',
    )
  }
  return context
}