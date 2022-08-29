// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then((response) => {
    const user = response.body;
    localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("addBlog", ({ title, author, url }) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: { title, author, url },
    //to set the Authorization header needed in the POST-request,
    //get the loggedBlogappUser JSON-string from localStorage, parse it into a JS-object, and access the
    //'token'-property
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedBlogappUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:3000");
});

//like a certain blog n times based on blog title
//make sure likes were increased before liking again
//assumes that likes are 0 at the beginning
Cypress.Commands.add("likeBlog", function (title, n) {
  //initial likes
  let likes = 0;

  //find view button that is a sibling of <span> with the title and click it
  cy.contains(title).siblings("button").click();

  //click the like button n times, make sure the new like-amount has been
  //rendered before clicking again
  for (let i = 1; i <= n; i++) {
    cy.contains("button", "like").click();
    cy.contains("span", `likes ${i}`);
  }
  //make sure to click hide to make sure only 1 like button is available at a time
  cy.contains("hide").click();
});
