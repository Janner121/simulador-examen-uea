import { useState } from 'react'

export default function WelcomeScreen({ onStart }) {
  const [nombre, setNombre] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nombre.trim()) onStart(nombre.trim())
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-emerald-900 sm:text-3xl">
            Simulador de Examen
          </h1>
          <p className="text-lg font-semibold text-emerald-700">
            Universidad Estatal Amazónica
          </p>
          <p className="text-sm text-gray-500">
            Responde 100 preguntas y pon a prueba tus conocimientos.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre del estudiante
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre completo"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={!nombre.trim()}
          className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Iniciar Prueba
        </button>
      </form>
    </div>
  )
}
