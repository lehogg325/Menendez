import { useEffect, useRef } from 'react'
import { useGameState } from './hooks/useGameState'
import { useAudio } from './hooks/useAudio'
import TitleScreen from './components/TitleScreen'
import GameScreen from './components/GameScreen'
import LoseScreen from './components/LoseScreen'
import WinBigScreen from './components/WinBigScreen'
import WinSmallScreen from './components/WinSmallScreen'
import FARAScreen from './components/FARAScreen'

export default function App() {
  const game  = useGameState()
  const audio = useAudio()

  // Stable ref so the effect below doesn't re-register on every render
  const audioRef = useRef(audio)
  audioRef.current = audio

  // Play audio cues on screen transitions
  useEffect(() => {
    if (game.screen === 'lose')     audioRef.current.playClang()
    if (game.screen === 'winBig')   audioRef.current.playWinBig()
    if (game.screen === 'winSmall') audioRef.current.playWinSmall()
    if (game.screen === 'winFARA')  audioRef.current.playWinSmall()
  }, [game.screen])

  if (game.screen === 'title') {
    return <TitleScreen onStart={game.startGame} />
  }

  if (game.screen === 'game') {
    return (
      <GameScreen
        round={game.round}
        cashInDollars={game.cashInDollars}
        goldBars={game.goldBars}
        streak={game.streak}
        fbi={game.fbi}
        foreign={game.foreign}
        difficulty={game.difficulty}
        scenario={game.currentScenario!}
        audio={audio}
        onChoose={game.handleChoice}
      />
    )
  }

  if (game.screen === 'winBig') {
    return (
      <WinBigScreen
        cashInDollars={game.cashInDollars}
        goldBars={game.goldBars}
        fbi={game.fbi}
        foreign={game.foreign}
        gameLog={game.gameLog}
        onReset={game.resetGame}
      />
    )
  }

  if (game.screen === 'winSmall') {
    return (
      <WinSmallScreen
        cashInDollars={game.cashInDollars}
        goldBars={game.goldBars}
        fbi={game.fbi}
        foreign={game.foreign}
        gameLog={game.gameLog}
        onReset={game.resetGame}
      />
    )
  }

  if (game.screen === 'winFARA') {
    return (
      <FARAScreen
        cashInDollars={game.cashInDollars}
        goldBars={game.goldBars}
        fbi={game.fbi}
        foreign={game.foreign}
        gameLog={game.gameLog}
        onReset={game.resetGame}
      />
    )
  }

  // lose
  return (
    <LoseScreen
      round={game.round}
      cashInDollars={game.cashInDollars}
      goldBars={game.goldBars}
      foreign={game.foreign}
      lastChoice={game.gameLog.at(-1)?.choiceText}
      gameLog={game.gameLog}
      onReset={game.resetGame}
    />
  )
}
