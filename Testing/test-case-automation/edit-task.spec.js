import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await page.getByRole('textbox', { name: 'Add a new task' }).click();
    await page.getByRole('textbox', { name: 'Add a new task' }).fill('First task to test.');
    await page.getByRole('button', { name: 'Add Task' }).click();
  });


test('ToDo_005 Edit: correct data', async ({ page }) => {
  await page.getByRole('button', { name: 'Edit:' }).click();
  await expect(page.locator('#taskList').getByRole('textbox')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Apply' })).toBeVisible();
  await page.locator('#taskList').getByRole('textbox').click();
  await page.locator('#taskList').getByRole('textbox').fill('This is edited task now.');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('#taskList').getByRole('textbox')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Apply' })).not.toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('This is edited task now.');
});

test('ToDo_006 Edit: empty.', async ({ page }) => {
  await page.getByRole('button', { name: 'Edit:' }).click();
  await expect(page.locator('#taskList').getByRole('textbox')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Apply' })).toBeVisible();
  await page.locator('#taskList').getByRole('textbox').click();
  await page.locator('#taskList').getByRole('textbox').fill('');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('#taskList').getByRole('textbox')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Apply' })).not.toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('');
});

test('ToDo_007 Edit: spaces only.', async ({ page }) => {
  await page.getByRole('button', { name: 'Edit:' }).click();
  await expect(page.locator('#taskList').getByRole('textbox')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Apply' })).toBeVisible();
  await page.locator('#taskList').getByRole('textbox').click();
  await page.locator('#taskList').getByRole('textbox').fill('        ');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('#taskList').getByRole('textbox')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Apply' })).not.toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('        ');
});
