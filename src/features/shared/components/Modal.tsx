export default function Modal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode
  onClose: () => void
  title: string
}) {
  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      <div className='bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-lg w-full max-w-lg text-left p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h2 id='modal-title' className='text-xl m-0'>
            {title}
          </h2>
          <button
            type='button'
            className='text-[var(--text)] hover:text-[var(--text-h)] text-2xl leading-none'
            onClick={onClose}
            aria-label='Close'
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
