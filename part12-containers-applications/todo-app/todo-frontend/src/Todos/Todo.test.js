import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('content is rendered', () => {
  const todo = {
    text: "Learn Docker",
    done: false,
  }

  const doneInfo = "this todo was done"
  const notDoneInfo = "Not done here"

  render(<Todo todo={todo} doneInfo={doneInfo} notDoneInfo={notDoneInfo} />)

  const textElem = screen.getByText("Learn Docker")
  expect(textElem).toBeDefined()

  const info = screen.getByText("Not done here")
  expect(info).toBeDefined()
})