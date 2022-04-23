import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './app'
import Welcome from './components/welcome'
import Home from './components/home'
import {
  AuthContainer,
  RegisterForm,
  RegisterSuccess,
  LoginForm,
  LoginSuccess,
  AuthContextProvider,
} from './auth'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Welcome />} />
            <Route path="auth" element={<AuthContainer />}>
              <Route path="register" element={<RegisterForm />} />
              <Route path="register/success" element={<RegisterSuccess />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="login/success" element={<LoginSuccess />} />
            </Route>
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
