import React from 'react'

export default function AddTextForm ({ onAdd, loading, children }) {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          onAdd(input.value)
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit" disabled={loading}>{children}</button>
      </form>
    </div>
  )
}