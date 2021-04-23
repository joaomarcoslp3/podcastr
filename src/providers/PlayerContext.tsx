import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

type PlayerContextData = {
  episodesList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  play: (episode: Episode) => void
  playList: (episode: Episode[], index: number) => void
  togglePlay: () => void
  hasPrevious: boolean
  hasNext: boolean
  playNext: () => void
  playPrevious: () => void
  setPlayingState: (state: boolean) => void
  isLooping: boolean
  toggleLoop: () => void
  isShuffling: boolean
  toggleShuffle: () => void
  clearPlayerState: () => void
}

type PlayerContextProviderProps = {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodesList, setEpisodesList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  function play (episode: Episode) {
    setEpisodesList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodesList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodesList.length

  function playNext() {
    if (isShuffling) {
      const nextEpisodeIndex = Math.floor(Math.random() * episodesList.length)
      setCurrentEpisodeIndex(nextEpisodeIndex)
    } else if (hasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    } 
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function togglePlay () {
    setIsPlaying(!isPlaying)
  }

  function toggleShuffle () {
    setIsShuffling(!isShuffling)
  }

  function toggleLoop () {
    setIsLooping(!isLooping)
  }

  function setPlayingState (state: boolean) {
    setIsPlaying(state)
  }

  function clearPlayerState () {
    setEpisodesList([])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider value={{
      episodesList, 
      currentEpisodeIndex, 
      play,
      playList,
      hasPrevious,
      hasNext,
      playNext, 
      playPrevious, 
      isPlaying, 
      togglePlay, 
      setPlayingState,
      isLooping, 
      toggleLoop,
      isShuffling,
      toggleShuffle,
      clearPlayerState
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}
