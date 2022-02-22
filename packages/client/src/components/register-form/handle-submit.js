export default async function handleSubmit(email, password) {
  let response
  try {
    response = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
  } catch (error) {
    return {
      pageError: `Network error: ${JSON.stringify(error)}`,
    }
  }

  if (response.status === 500) {
    const error = await response.json()
    return {
      pageError: error.message,
    }
  }

  if (response.status === 422) {
    const error = await response.json()
    return {
      emailError: error.emailError ?? '',
      passwordError: error.passwordError ?? '',
    }
  }

  if (response.status === 409) {
    const error = await response.json()
    return {
      emailError: error.message,
    }
  }

  if (response.status === 201) {
    const data = response.json()
    return {
      email: data.email,
      username: data.username,
    }
  }

  return {
    pageError: 'Unhandled response',
  }
}
