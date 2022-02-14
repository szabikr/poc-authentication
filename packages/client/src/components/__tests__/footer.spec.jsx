/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../footer'

describe('Footer component', () => {
  it('should display footer text', () => {
    const { container, queryByText } = render(<Footer />, {
      container: document.body.appendChild(document.createElement('div')),
    })
    expect(queryByText('szabi.space')).toBeInTheDocument()
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        a 
        <strong>
          szabi.space
        </strong>
         development
      </div>
    `)
  })
})
