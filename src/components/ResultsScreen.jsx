const PUNTOS_POR_PREGUNTA = 10

export default function ResultsScreen({ nombre, respuestas, totalPreguntas, onRetry }) {
  const aciertos = respuestas.filter((r) => r.status === 'correct').length
  const fallos = respuestas.filter((r) => r.status === 'incorrect').length
  const noRespondidas = respuestas.filter((r) => r.status === 'timeout').length
  const notaFinal = aciertos * PUNTOS_POR_PREGUNTA
  const notaMaxima = totalPreguntas * PUNTOS_POR_PREGUNTA

  const mensaje =
    notaFinal >= notaMaxima * 0.7
      ? `¡Felicidades, ${nombre}! Excelente desempeño.`
      : `¡Buen intento, ${nombre}! Sigue practicando, vas por buen camino.`

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 text-center shadow-2xl">
        <h1 className="text-2xl font-bold text-emerald-900">{mensaje}</h1>

        <div className="rounded-xl bg-emerald-50 p-6">
          <p className="text-sm text-gray-500">Nota Final</p>
          <p className="text-4xl font-extrabold text-emerald-700">
            {notaFinal}
            <span className="text-lg font-medium text-gray-500"> / {notaMaxima}</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg bg-emerald-100 p-3">
            <p className="text-xl font-bold text-emerald-700">{aciertos}</p>
            <p className="text-gray-600">Aciertos</p>
          </div>
          <div className="rounded-lg bg-red-100 p-3">
            <p className="text-xl font-bold text-red-700">{fallos}</p>
            <p className="text-gray-600">Fallos</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-3">
            <p className="text-xl font-bold text-gray-700">{noRespondidas}</p>
            <p className="text-gray-600">Sin responder</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRetry}
          className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Volver a Intentar
        </button>
      </div>
    </div>
  )
}
