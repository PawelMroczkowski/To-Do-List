import { test, expect, mergeExpects } from "@playwright/test";

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

  const addTaskButton = page.getByRole("button", { name: "Add Task" });

  await test.step("Check if initial number of tasks is correct", async () => {
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );
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
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );
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

  await test.step("Edit", async () => {
    let tasks;
    const listItem = page.getByRole("listitem");
    const editAtLeast2Tasks = { has: page.getByText("Edit at least 2 tasks.") };
    //start editing task
    await listItem.filter(editAtLeast2Tasks).getByText("Edit:").click();
    let editTextClassBoxValue = await listItem
      .filter(editAtLeast2Tasks)
      .locator(".editText");
    editTextClassBoxValue.click();
    editTextClassBoxValue.press("ControlOrMeta+a");
    editTextClassBoxValue.fill("Edit more than 3 tasks.");
    await listItem
      .filter(editAtLeast2Tasks)
      .getByRole("button", { name: "Apply" })
      .click();
    //checking if edited task is visible
    await expect(
      listItem.filter({ has: page.getByText("Edit more than 3 tasks.") })
    ).toBeVisible();
    //checking local storage
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );
    await expect(
      tasks.filter((task) => task.taskText == "Edit more than 3 tasks.")
    ).toBeTruthy();
  });

  await test.step("Sort A-Z", async () => {
    let i = 0;
    let sorted_aToz_Tasks = [
      "Add some tasks to list.",
      "Check some tasks as completed.",
      "Delete one task.",
      "Edit more than 3 tasks.",
      "Prepare more tests.",
      "Sort tasks.",
      "Write To-Do list.",
    ];
    await page.getByText("Sort A to Z").click();
    await expect(
      page.getByRole("heading", { name: "To-Do List" })
    ).toBeVisible();

    //loading local storage
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );

    for (i = 0; i < 7; i++) {
      await expect(tasks[i].taskText, "Checking A-Z order").toEqual(
        sorted_aToz_Tasks[i]
      );
    }
  });

  await test.step("Toggle completed", async () => {
    const listItem = page.getByRole("listitem");
    const checkbox = listItem.getByRole("checkbox");
    //wait for visible element
    await expect(
      page.getByRole("heading", { name: "To-Do List" })
    ).toBeVisible();
    //load tasks
    let tasks;
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );
    await checkbox.first().check();
    await checkbox.nth(3).check();
    await checkbox.last().check();
    //load storage
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );
    await expect(
      tasks[0].completed,
      "first task completed status"
    ).toBeTruthy();
    await expect(
      tasks[3].completed,
      "middle task completed status"
    ).toBeTruthy();
    await expect(tasks[6].completed, "last task completed status").toBeTruthy();
  });

  await test.step("Sort Z-A", async () => {
    let i = 0;
    let sorted_zToa_Tasks = [
      "Write To-Do list.",
      "Sort tasks.",
      "Prepare more tests.",
      "Edit more than 3 tasks.",
      "Delete one task.",
      "Check some tasks as completed.",
      "Add some tasks to list.",
    ];
    await page.getByText("Sort Z to A").click();
    await expect(
      page.getByRole("heading", { name: "To-Do List" })
    ).toBeVisible();

    //loading local storage
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );

    for (i = 0; i < 7; i++) {
      await expect(tasks[i].taskText, "Checking Z-A order").toEqual(
        sorted_zToa_Tasks[i]
      );
    }
  });

  await test.step("Delete", async () => {
    //define elements
    const listItem = page.getByRole("listitem");
    const deleteButtonFirst = listItem
      .first()
      .getByRole("button", { name: "Delete" });
    const deleteButtonLast = listItem
      .last()
      .getByRole("button", { name: "Delete" });
    //first and last task as variable
    //load storage
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );
    let firstTask = tasks[0];
    let lastTask = tasks[tasks.length - 1];

    //checking if less items visible
    await expect(listItem, "7 list items visible").toHaveCount(7);
    await deleteButtonFirst.click();
    await deleteButtonLast.click();
    await expect(listItem, "5 list items visible").toHaveCount(5);
    //load storage
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );
    //check if first and last tasks are not present in array from local storage
    await expect(tasks, "not contain first task").not.toContain(firstTask);
    await expect(tasks, "not contain last task").not.toContain(lastTask);
  });

  await test.step("Toggle not completed", async () => {
    const listItem = page.getByRole("listitem");
    const checkbox = listItem.getByRole("checkbox");
    //wait for visible element
    await expect(
      page.getByRole("heading", { name: "To-Do List" })
    ).toBeVisible();
    // uncheck task that is checked
    await checkbox.nth(2).click();
    //load storage
    tasks = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("tasks"))
    );
    //none of tasks should be completed now
    for (const task of tasks) {
      await expect(
        task.completed,
        "Check if task is not completed"
      ).not.toBeTruthy();
    }
  });
  await test.step("Clear local storage", async () => {
    //wait for visible element
    await expect(
      page.getByRole("heading", { name: "To-Do List" })
    ).toBeVisible();
  });
  //delete all tasks by button
  await page.getByRole("button", { name: "Clear Local Storage" }).click();
  //load storage
  tasks = await page.evaluate(() => JSON.parse(localStorage.getItem("tasks")));
  //check if array is empty
  await expect(
    Array.isArray(tasks) && tasks.length === 0,
    "Is array empty"
  ).toBeTruthy();
});
