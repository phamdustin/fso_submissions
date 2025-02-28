const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByText("Add blog").click();
  await page.getByTestId("blogform-title").fill(title);
  await page.getByTestId("blogform-author").fill(author);
  await page.getByTestId("blogform-url").fill(url);
  await page.getByRole("button", { name: "Submit" }).click();
};

export { loginWith, createBlog };
