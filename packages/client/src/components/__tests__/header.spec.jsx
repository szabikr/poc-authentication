/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../header'

describe('Header component', () => {
  it('should render title', () => {
    const { container, getByText } = render(<Header />, {
      container: document.body.appendChild(document.createElement('div')),
    })
    expect(getByText('Move to Done')).toBeInTheDocument()
    expect(container.firstChild).toMatchInlineSnapshot(`
      <h1>
        Move to Done
      </h1>
    `)
  })
})
