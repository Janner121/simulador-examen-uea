const ESTADO_CLASSES = {
  default: 'border-gray-300 bg-white hover:border-emerald-500 hover:bg-emerald-50',
  correct: 'border-emerald-600 bg-emerald-100 text-emerald-900',
  incorrect: 'border-red-600 bg-red-100 text-red-900',
}

export default function OptionButton({ letra, texto, estado, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${ESTADO_CLASSES[estado]} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-sm font-bold">
        {letra}
      </span>
      <span>{texto}</span>
    </button>
  )
}
