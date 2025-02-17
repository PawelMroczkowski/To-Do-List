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
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText('First task to test.')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit:' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible();
    await expect(page.getByRole('checkbox')).not.toBeVisible();
    
});

test("ToDo_009 Toggle task: completed to true.", async ({ page }) => {
    await expect(page.getByText('First task to test.')).toBeVisible();
    await page.getByRole('checkbox').check();
    await expect(page.getByRole('checkbox')).toBeChecked();
    });

    
test("ToDo_010 Toggle task: completed to false.", async ({ page }) => {
    await expect(page.getByText('First task to test.')).toBeVisible();
    await page.getByRole('checkbox').check();
    await expect(page.getByRole('checkbox')).toBeChecked();
    await page.getByRole('checkbox').uncheck();
    await expect(page.getByRole('checkbox')).not.toBeChecked();
});
