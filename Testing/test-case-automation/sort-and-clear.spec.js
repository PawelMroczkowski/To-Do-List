import { test, expect } from "@playwright/test";
import { assert } from "console";

test.beforeEach(async ({ page }) => {
  await page.goto("./");
  const findAddTaskTextbox = page.getByRole("textbox", {
    name: "Add a new task",
  });
  const findAddTaskButton = page.getByRole("button", { name: "Add Task" });
  await findAddTaskTextbox.click();

  //adding tasks that are not in A-Z or Z-A order
  await findAddTaskTextbox.fill("Write To-Do list.");
  await findAddTaskButton.click();

  await findAddTaskTextbox.fill("Add some tasks to list.");
  await findAddTaskButton.click();

  await findAddTaskTextbox.fill("Check some tasks as completed.");
  await findAddTaskButton.click();

  await findAddTaskTextbox.fill("Sort tasks.");
  await findAddTaskButton.click();

  await findAddTaskTextbox.fill("Delete one task.");
  await findAddTaskButton.click();

  await findAddTaskTextbox.fill("Prepare more tests.");
  await findAddTaskButton.click();

  await findAddTaskTextbox.fill("Edit at least 2 tasks.");
  await findAddTaskButton.click();
});

test("ToDo_011 Sort tasks: A-Z.", async ({ page }) => {
  let i = 0;
  let sorted_aToz_Tasks = [
    "Add some tasks to list.",
    "Check some tasks as completed.",
    "Delete one task.",
    "Edit at least 2 tasks.",
    "Prepare more tests.",
    "Sort tasks.",
    "Write To-Do list.",
  ];
  let tasks = [];
  await page.getByRole("button", { name: "Sort A to Z" }).click();
  await expect(page.getByText("To-Do List Add Task Clear")).toBeVisible();
  tasks = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("tasks"))
  );
  for (i = 0; i < 7; i++) {
    await expect(tasks[i].taskText).toEqual(sorted_aToz_Tasks[i]);
    console.log(i,'_order from local storage:   ',tasks[i].taskText, '\n', i ,'_how should be sorted:  ', sorted_aToz_Tasks[i]);
  }
});


test("ToDo_012 Sort tasks: Z-A.", async ({ page }) => {
  let i = 0;
  let sorted_zToa_Tasks = [
    "Write To-Do list.",
    "Sort tasks.",
    "Prepare more tests.",
    "Edit at least 2 tasks.",
    "Delete one task.",
    "Check some tasks as completed.",
    "Add some tasks to list.",
  ];
  let tasks = [];
  await page.getByRole("button", { name: "Sort Z to A" }).click();
  await expect(page.getByText("To-Do List Add Task Clear")).toBeVisible();
  tasks = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("tasks"))
  );
  for (i = 0; i < 7; i++) {
    await expect(tasks[i].taskText).toEqual(sorted_zToa_Tasks[i]);
    console.log(i,'_order from local storage:   ',tasks[i].taskText, '\n', i ,'_how should be sorted:  ', sorted_zToa_Tasks[i]);
  }
});


test("ToDo_013 Clear Local Storage.", async ({ page }) => {
  let i = 0;
  let tasks = [];
  await expect(page.getByText("To-Do List Add Task Clear")).toBeVisible();
  //load, tasks array is expected to have content
  tasks = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("tasks"))
  );
    await expect(tasks).toEqual(expect.any(Object));
  await page.getByRole("button", { name: "Clear Local Storage" }).click();

  //load, tasks array is expected to be empty from now
  tasks = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("tasks"))
  );

  await expect(Array.isArray(tasks) && tasks.length === 0).toBeTruthy();
  
});