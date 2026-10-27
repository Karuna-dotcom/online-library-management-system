import { useEffect, useState } from 'react'

export const defaultBooks = [
  { id: 1, title: 'Python Programming', author: 'Mark Lutz', category: 'Programming', isbn: '123456', quantity: 5, available: 5},
  { id: 2, title: 'Artificial Intelligence', author: 'Stuart Russell', category: 'AI', isbn: '123457', quantity: 4, available: 4},
  { id: 3, title: 'Digital Electronics', author: 'Morris Mano', category: 'Electronics', isbn: '123458', quantity: 3, available: 3 },
  { id: 4, title: 'Computer Networks', author: 'Andrew Tanenbaum', category: 'Networking', isbn: '123459', quantity: 4, available: 4 },
  { id: 5, title: 'Data Science', author: 'John Smith', category: 'Data Science', isbn: '123460', quantity: 5, available: 5},
  { id: 6, title: 'JavaScript Basics', author: 'David Flanagan', category: 'Programming', isbn: '123461', quantity: 4, available: 4 },
]

export function readStorage(key, fallback) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback
  }

  try {
    const value = window.localStorage.getItem(key)
    if (value === null) return fallback

    const parsed = JSON.parse(value)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => readStorage(key, fallback))

  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return
    }

    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export function currentUser() {
  return readStorage('currentUser', null)
}

export function formatDate(date = new Date()) {
  const value = date ? new Date(date) : new Date()

  if (Number.isNaN(value.getTime())) {
    return new Date().toLocaleDateString()
  }

  return value.toLocaleDateString()
}
