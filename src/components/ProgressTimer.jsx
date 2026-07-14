export default function ProgressTimer({ timeLeft, timeLimit }) {
  const percent = Math.max(0, (timeLeft / timeLimit) * 100)
  const color = percent > 50 ? 'bg-emerald-500' : percent > 20 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className={`h-full ${color} transition-all duration-100 ease-linear`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
