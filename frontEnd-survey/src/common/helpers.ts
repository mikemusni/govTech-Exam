export const setLocalStorage = (key: string, data: object) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalStorage = <T>(key: string): T | null => {
  const storage = localStorage.getItem(key)
  if (storage !== null) {
    try {
      return JSON.parse(storage)
    } catch (error) {
      return null
    }
  }

  return null
}
