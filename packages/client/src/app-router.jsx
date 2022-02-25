import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './app'
import Welcome from './components/welcome'
import { RegisterForm, RegisterSuccess } from './components/register'
import { LoginForm, LoginSuccess } from './components/login'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Welcome />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="register/success" element={<RegisterSuccess />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="login/success" element={<LoginSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
