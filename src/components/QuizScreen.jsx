import ProgressTimer from './ProgressTimer'
import OptionButton from './OptionButton'
import FeedbackCard from './FeedbackCard'

const LETRAS = ['A', 'B', 'C', 'D']

export default function QuizScreen({ nombre, quiz, totalPreguntas, onSiguiente }) {
  const {
    currentQuestion,
    currentIndex,
    isLastQuestion,
    selectedOption,
    answered,
    timeLeft,
    timeLimit,
    puntaje,
    seleccionarOpcion,
  } = quiz

  const esCorrectaSeleccion = answered && selectedOption === currentQuestion.respuestaCorrecta

  const getEstadoOpcion = (opcion) => {
    if (!answered) return 'default'
    if (opcion === currentQuestion.respuestaCorrecta) return 'correct'
    if (opcion === selectedOption) return 'incorrect'
    return 'default'
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-3 rounded-xl bg-white p-4 shadow">
          <div className="flex items-center justify-between text-sm sm:text-base">
            <span className="font-semibold text-gray-700">{nombre}</span>
            <span className="text-gray-500">
              Pregunta {currentIndex + 1}/{totalPreguntas}
            </span>
            <span className="font-semibold text-emerald-700">{puntaje} pts</span>
          </div>
          <ProgressTimer timeLeft={timeLeft} timeLimit={timeLimit} />
        </header>

        <main className="space-y-4 rounded-xl bg-white p-6 shadow">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {currentQuestion.categoria}
          </span>
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
            {currentQuestion.pregunta}
          </h2>

          <div className="space-y-3">
            {currentQuestion.opciones.map((opcion, idx) => (
              <OptionButton
                key={opcion}
                letra={LETRAS[idx]}
                texto={opcion}
                estado={getEstadoOpcion(opcion)}
                disabled={answered}
                onClick={() => seleccionarOpcion(opcion)}
              />
            ))}
          </div>

          {answered && (
            <FeedbackCard
              esCorrecta={esCorrectaSeleccion}
              justificacion={currentQuestion.justificacion}
            />
          )}

          {answered && (
            <button
              type="button"
              onClick={onSiguiente}
              className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {isLastQuestion ? 'Ver Resultados' : 'Siguiente Pregunta'}
            </button>
          )}
        </main>
      </div>
    </div>
  )
}
