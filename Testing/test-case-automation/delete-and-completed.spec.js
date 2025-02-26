import { test, expect } from "@playwright/test";
import { assert } from "console";

test.beforeEach(async ({ page }) => {
  await page.goto("./");
  await page
    .getByRole("textbox", { name: "Add a new task" })
    .fill("First task to test.");
  await page.getByRole("button", { name: "Add Task" }).click();
});

test("ToDo_008 Delete task.", async ({ page }) => {
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("First task to test.")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Edit:" })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Delete" })).not.toBeVisible();
  await expect(page.getByRole("checkbox")).not.toBeVisible();
});

test("ToDo_009 Toggle task: completed to true.", async ({ page }) => {
  await expect(page.getByText("First task to test.")).toBeVisible();
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("checkbox")).toBeChecked();
});

test("ToDo_010 Toggle task: completed to false.", async ({ page }) => {
  await expect(page.getByText("First task to test.")).toBeVisible();
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("checkbox")).toBeChecked();
  await page.getByRole("checkbox").uncheck();
  await expect(page.getByRole("checkbox")).not.toBeChecked();
});

test("ToDo_014 Delete: same id task.", async ({ page }) => {
  let tasks, copyTask, pasteTask;
  await page
    .getByRole("textbox", { name: "Add a new task" })
    .fill("Run manual tests.");
  await page.getByRole("button", { name: "Add Task" }).click();

  //manipulating local storage to get two tasks with same id
  tasks = await page.evaluate(
    () => JSON.parse(localStorage.getItem("tasks"))
  );
  copyTask = tasks.filter((task) => task.taskText == "First task to test.")[0];
  pasteTask = tasks.filter((task) => task.taskText == "Run manual tests.")[0];
  pasteTask.id = copyTask.id;
  tasks.concat(pasteTask);
  await page.evaluate(
    (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks)),
    tasks
  );
  await page.reload();

  //deleting one task, checking if both are not present
  const deletingTask = await page
    .getByRole("listitem")
    .filter({ has: page.getByText("First task to test.") });
  await expect(deletingTask, "Precondition task visible").toBeVisible();
  await deletingTask.getByRole("button", { name: "Delete" }).click();
  await page.reload();
  await expect(
    page.getByRole("listitem").filter({
      has: page
        .getByText("First task to test.")
        .and(page.getByText("Run manual tests.")),
    }),
    "Both tasks not visible"
  ).not.toBeVisible();

  //checking if array in local storage is empty
  tasks = await page.evaluate(
    () => JSON.parse(localStorage.getItem("tasks"))
  );
  await expect(
    Array.isArray(tasks) && tasks.length === 0,
    "Array from local storage after deleting one task is empty"
  ).toBeTruthy();
});
