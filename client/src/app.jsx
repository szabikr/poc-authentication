import React from 'react' 
import styles from './styles/app.module.css'

export default function App() {
  return (
    <div className={styles.container}>
      <h1>Move to Done</h1>
      <a href="/todos" className="primary">Login</a>
      <div className={styles.subtitle}>a <strong>szabi.space</strong> development</div>
    </div>
  )
}
