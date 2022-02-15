import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../footer'

describe('Footer component', () => {
  it('should display footer text', () => {
    const { queryByText } = render(<Footer />, {
      container: document.body.appendChild(document.createElement('div')),
    })
    expect(queryByText('szabi.space')).toBeInTheDocument()
  })
})
