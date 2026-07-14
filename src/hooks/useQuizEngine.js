import { useState, useEffect, useCallback } from 'react'

export const TIME_LIMIT = 30 // segundos por pregunta
const PUNTOS_POR_PREGUNTA = 10

/**
 * Encapsula todo el estado del examen: pregunta actual, temporizador,
 * puntaje y el historial de respuestas (correcta / incorrecta / sin responder).
 */
export function useQuizEngine(preguntas) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [respuestas, setRespuestas] = useState([])

  const currentQuestion = preguntas[currentIndex]
  const isLastQuestion = currentIndex === preguntas.length - 1

  const registrarRespuesta = useCallback(
    (status) => {
      setRespuestas((prev) => [...prev, { id: currentQuestion.id, status }])
    },
    [currentQuestion],
  )

  const seleccionarOpcion = useCallback(
    (opcion) => {
      if (answered) return
      setSelectedOption(opcion)
      setAnswered(true)
      const esCorrecta = opcion === currentQuestion.respuestaCorrecta
      registrarRespuesta(esCorrecta ? 'correct' : 'incorrect')
    },
    [answered, currentQuestion, registrarRespuesta],
  )

  const manejarTimeout = useCallback(() => {
    if (answered) return
    setSelectedOption(null)
    setAnswered(true)
    registrarRespuesta('timeout')
  }, [answered, registrarRespuesta])

  // Cuenta regresiva en pasos de 100ms para una barra de progreso fluida.
  // Se detiene automáticamente en cuanto la pregunta queda respondida.
  useEffect(() => {
    if (answered) return
    if (timeLeft <= 0) {
      manejarTimeout()
      return
    }
    const id = setTimeout(() => setTimeLeft((t) => +(t - 0.1).toFixed(1)), 100)
    return () => clearTimeout(id)
  }, [timeLeft, answered, manejarTimeout])

  const siguientePregunta = useCallback(() => {
    setCurrentIndex((i) => i + 1)
    setSelectedOption(null)
    setAnswered(false)
    setTimeLeft(TIME_LIMIT)
  }, [])

  const reiniciar = useCallback(() => {
    setCurrentIndex(0)
    setSelectedOption(null)
    setAnswered(false)
    setTimeLeft(TIME_LIMIT)
    setRespuestas([])
  }, [])

  const aciertos = respuestas.filter((r) => r.status === 'correct').length
  const puntaje = aciertos * PUNTOS_POR_PREGUNTA

  return {
    currentQuestion,
    currentIndex,
    isLastQuestion,
    selectedOption,
    answered,
    timeLeft,
    timeLimit: TIME_LIMIT,
    respuestas,
    puntaje,
    seleccionarOpcion,
    siguientePregunta,
    reiniciar,
  }
}
