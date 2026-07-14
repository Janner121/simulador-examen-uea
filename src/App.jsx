import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'
import { useQuizEngine } from './hooks/useQuizEngine'
import preguntas from './data/preguntas.json'

export default function App() {
  const [screen, setScreen] = useState('welcome') // 'welcome' | 'quiz' | 'results'
  const [nombre, setNombre] = useState('')
  const quiz = useQuizEngine(preguntas)

  const handleStart = (nombreIngresado) => {
    setNombre(nombreIngresado)
    setScreen('quiz')
  }

  // Evita que el hook incremente el índice más allá de la última pregunta.
  const handleSiguiente = () => {
    if (quiz.isLastQuestion) {
      setScreen('results')
    } else {
      quiz.siguientePregunta()
    }
  }

  const handleRetry = () => {
    quiz.reiniciar()
    setScreen('welcome')
  }

  if (screen === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        nombre={nombre}
        respuestas={quiz.respuestas}
        totalPreguntas={preguntas.length}
        onRetry={handleRetry}
      />
    )
  }

  return (
    <QuizScreen
      nombre={nombre}
      quiz={quiz}
      totalPreguntas={preguntas.length}
      onSiguiente={handleSiguiente}
    />
  )
}
