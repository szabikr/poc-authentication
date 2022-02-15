import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../header'

describe('Header component', () => {
  it('should render title', () => {
    const { getByText } = render(<Header />, {
      container: document.body.appendChild(document.createElement('div')),
    })
    expect(getByText('Move to Done')).toBeInTheDocument()
  })
})
