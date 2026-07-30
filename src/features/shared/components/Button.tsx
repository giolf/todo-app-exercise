export default function Button({
  text,
  onClick,
  type = 'button',
  variant = 'primary',
}: {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger'
}) {
  const styles =
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700'
      : variant === 'secondary'
        ? 'bg-gray-600 hover:bg-gray-700'
        : 'bg-blue-600 hover:bg-blue-700'

  return (
    <button
      type={type}
      className={`${styles} text-white px-4 py-2 rounded-md text-sm font-medium transition-colors`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
