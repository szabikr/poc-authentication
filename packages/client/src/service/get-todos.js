async function fetchTodos(accessToken) {
  console.log('FETCH TODOS with accessToken', accessToken)
  try {
    const response = await fetch('/api/todos', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.status === 401) {
      const { error } = await response.json()
      return { hasError: true, error }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.log('error while making fetch request', error)
    return { hasError: true, error }
  }
}

export default fetchTodos
