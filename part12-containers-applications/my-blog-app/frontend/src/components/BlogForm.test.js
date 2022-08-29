import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> calls the event-handler function with the correct argument", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  //get input elements and write to them
  const title = screen.getByLabelText("title:");
  const author = screen.getByLabelText("author:");
  const url = screen.getByLabelText("url:");
  const button = screen.getByText("create");

  await user.type(title, "React vs Preact");
  await user.type(author, "Mr SmartyPants");
  await user.type(url, "www.there.fi");
  await user.click(button);

  //check that event handler was called once
  expect(createBlog.mock.calls).toHaveLength(1);

  //check that the handler was called with the right argument
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "React vs Preact",
    author: "Mr SmartyPants",
    url: "www.there.fi",
  });
});
