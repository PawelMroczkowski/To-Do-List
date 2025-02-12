import { test, expect } from "@playwright/test";
import { assert } from "console";

test.beforeEach(async ({ page }) => {
  await page.goto('./');
});

test("ToDo_001 Add task: correct.", async ({ page }) => {
  await page.getByRole("textbox", { name: "Add a new task" }).click();
  await page
    .getByRole("textbox", { name: "Add a new task" })
    .fill("First task to test.");
  await page.getByRole("button", { name: "Add Task" }).click();
  await expect(page.getByRole("paragraph"), "Task added").toContainText(
    "First task to test."
  );
  await expect(
    page.getByRole("button", { name: "Edit:" }),
    "Edit button visible"
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Delete" }),
    "Delete button visible"
  ).toBeVisible();
  await expect(page.getByRole("checkbox"), "Checkbox visible").toBeVisible();
  const placeholderText = await page
    .getByRole("textbox", { name: "Add a new task" })
    .getAttribute("placeholder");
  expect(placeholderText, 'Placeholder text default value').toEqual("Add a new task");
});

test("ToDo_002 Add task: empty.", async ({ page }) => {
  await page.getByRole("button", { name: "Add Task" }).click();
  await expect
    .soft(
      page.getByRole("button", { name: "Edit:" }),
      "Edit button not visible"
    )
    .not.toBeVisible();
  await expect
    .soft(
      page.getByRole("button", { name: "Delete" }),
      "Delete button not visible"
    )
    .not.toBeVisible();
  await expect
    .soft(page.getByRole("checkbox"), "Checkbox not visible")
    .not.toBeVisible();
});

test("ToDo_003 Add task: space filled task.", async ({ page }) => {
  await page.getByRole("textbox", { name: "Add a new task" }).click();
  await page
    .getByRole("textbox", { name: "Add a new task" })
    .fill("            ");
  await page.getByRole("button", { name: "Add Task" }).click();
  await expect(page.getByRole("paragraph"), '"Space" text').toContainText(
    "            "
  );
  await expect(
    page.getByRole("button", { name: "Edit:" }),
    "Edit button visible"
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Delete" }),
    "Delete button visible"
  ).toBeVisible();
  await expect(page.getByRole("checkbox"), "Checkbox visible").toBeVisible();
  const placeholderText = await page
    .getByRole("textbox", { name: "Add a new task" })
    .getAttribute("placeholder");
  expect(placeholderText, 'Placeholder text default value').toEqual("Add a new task");
});

test("ToDo_004 Add task: numbers and specials.", async ({ page }) => {
  await page.getByRole("textbox", { name: "Add a new task" }).click();
  await page
    .getByRole("textbox", { name: "Add a new task" })
    .fill("12345^&*()");
  await page.getByRole("button", { name: "Add Task" }).click();
  await expect(page.getByRole("paragraph"), "Special signs task").toContainText(
    "12345^&*()"
  );
  await expect(
    page.getByRole("button", { name: "Edit:" }),
    "Edit button visible"
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Delete" }),
    "Delete button visible"
  ).toBeVisible();
  await expect(page.getByRole("checkbox"), "Checkbox visible").toBeVisible();
  const placeholderText = await page
    .getByRole("textbox", { name: "Add a new task" })
    .getAttribute("placeholder");
  expect(placeholderText, 'Placeholder text default value').toEqual("Add a new task");
});

test.afterEach(async ({ page }) => {
  await page.getByRole('button', { name: 'Clear Local Storage' }).click();
});