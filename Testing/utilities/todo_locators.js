export function paragraph(page) {
  return page.getByRole("listitem").getByRole("paragraph");
}

export function addNewTaskTextBox(page) {
  return page.getByRole("textbox", {
    name: "Add a new task",
  });
}

export function addNewTaskButton(page) {
  return page.getByRole("button", { name: "Add Task" });
}

export function checkbox(page) {
  return page.getByRole("listitem").getByRole("checkbox");
}

export function editButton(page) {
  return page.getByRole("listitem").getByRole("button", { name: "Edit:" });
}

export function deleteButton(page) {
  return page.getByRole("listitem").getByRole("button", { name: "Delete" });
}

export function placeholderText(page) {
  return page
    .getByRole("textbox", { name: "Add a new task" })
    .getAttribute("placeholder");
}
