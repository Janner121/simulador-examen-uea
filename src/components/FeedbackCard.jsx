export default function FeedbackCard({ esCorrecta, justificacion }) {
  return (
    <div
      className={`rounded-lg border-l-4 p-4 ${esCorrecta ? 'border-emerald-600 bg-emerald-50' : 'border-red-600 bg-red-50'}`}
    >
      <p className={`font-bold ${esCorrecta ? 'text-emerald-800' : 'text-red-800'}`}>
        {esCorrecta ? '¡Correcto!' : 'Incorrecto'}
      </p>
      <p className="mt-1 text-sm text-gray-700">{justificacion}</p>
    </div>
  )
}
