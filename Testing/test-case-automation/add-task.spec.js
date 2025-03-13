import { test, expect } from "@playwright/test";
import {
  addNewTaskTextBox,
  addNewTaskButton,
  checkbox,
  editButton,
  deleteButton,
  placeholderText,
  paragraph,
} from "../utilities/todo_locators";

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

test("ToDo_001 Add task: correct.", async ({ page }) => {
  await addNewTaskTextBox(page).fill("First task to test.");
  await addNewTaskButton(page).click();
  await expect(paragraph(page), "Task added").toContainText(
    "First task to test."
  );
  await expect(editButton(page), "Edit button visible").toBeVisible();
  await expect(deleteButton(page), "Delete button visible").toBeVisible();
  await expect(checkbox(page), "Checkbox visible").toBeVisible();
  await expect(addNewTaskTextBox(page)).toBeVisible();
  await expect(
    await placeholderText(page),
    "Placeholder text default value"
  ).toEqual("Add a new task");
});

test("ToDo_002 Add task: empty.", async ({ page }) => {
  await addNewTaskButton(page).click();
  await expect
    .soft(editButton(page), "ERROR EXPECTED Edit button not visible")
    .not.toBeVisible();
  await expect
    .soft(deleteButton(page), "ERROR EXPECTED Delete button not visible")
    .not.toBeVisible();
  await expect
    .soft(checkbox(page), "ERROR EXPECTED Checkbox not visible")
    .not.toBeVisible();
  await expect.soft(paragraph(page), "Paragraph not visible").not.toBeVisible();
});

test("ToDo_003 Add task: space filled task.", async ({ page }) => {
  await addNewTaskTextBox(page).fill("            ");
  await addNewTaskButton(page).click();
  await expect(paragraph(page), '"Space" text').toContainText("            ");
  await expect(editButton(page), "Edit button visible").toBeVisible();
  await expect(deleteButton(page), "Delete button visible").toBeVisible();
  await expect(checkbox(page), "Checkbox visible").toBeVisible();
  await expect(
    await placeholderText(page),
    "Placeholder text default value"
  ).toEqual("Add a new task");
});

test("ToDo_004 Add task: numbers and specials.", async ({ page }) => {
  await addNewTaskTextBox(page).fill("12345^&*()");
  await addNewTaskButton(page).click();
  await expect(paragraph(page), "Special signs task").toContainText(
    "12345^&*()"
  );
  await expect(editButton(page), "Edit button visible").toBeVisible();
  await expect(deleteButton(page), "Delete button visible").toBeVisible();
  await expect(checkbox(page), "Checkbox visible").toBeVisible();
  await expect(
    await placeholderText(page),
    "Placeholder text default value"
  ).toEqual("Add a new task");
});
