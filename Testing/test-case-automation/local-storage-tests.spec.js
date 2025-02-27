import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("./");
  const taskInputText = page.getByRole("textbox", {
    name: "Add a new task",
  });
  const addTaskButton = page.getByRole("button", { name: "Add Task" });
  let tasks = [
    "Write To-Do list.",
    "Add some tasks to list.",
    "Check some tasks as completed.",
    "Sort tasks.",
    "Delete one task.",
    "Prepare more tests.",
  ];
  await expect(taskInputText, "textbox visible").toBeVisible();
  await expect(addTaskButton, "button visible").toBeVisible();
  for (const task of tasks) {
    await taskInputText.fill(task);
    await addTaskButton.click();
  }
});

test("ToDo_015 Local storage checking.", async ({ page }) => {
  //variable declarations
  let tasks;
  const taskInputText = page.getByRole("textbox", {
    name: "Add a new task",
  });
  const listItem = page.getByRole("listitem");
  const addTaskButton = page.getByRole("button", { name: "Add Task" });

  await test.step("Check if initial number of tasks is correct", async () => {
    await loadLocStorage();
    //check if 6 tasks are in array
    await expect(tasks.length, "Check if 6 tasks are added").toEqual(6);
  });

  await test.step("Add task and check changes", async () => {
    //add task
    await expect(taskInputText).toBeVisible();
    await expect(addTaskButton).toBeVisible();
    await taskInputText.fill("Edit at least 2 tasks.");
    await addTaskButton.click();
    //load storage again after adding task
    await loadLocStorage();
    //check if changes are correct
    await expect(
      tasks.length,
      "Check if array length is longer by 1 after adding task"
    ).toEqual(7);
    await expect(
      tasks[6].taskText,
      "Check if added task text is correct"
    ).toEqual("Edit at least 2 tasks.");
  });

  await test.step("Edit", async () => {});

  await test.step("Sort A-Z", async () => {});

  await test.step("Toggle completed", async () => {});

  await test.step("Sort Z-A", async () => {});

  await test.step("Delete", async () => {});

  await test.step("Toggle not completed", async () => {});

  await test.step("Clear local storage", async () => {});

  //functions

  async function loadLocStorage() {
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );
  }
});
