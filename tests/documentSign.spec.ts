import { test, expect } from "@playwright/test";
import path from "path";

const testEmail = "test@example.com";
const pathTestPDF = path.resolve(__dirname, "mocks/test.pdf");

const uploadDocument = async (page: any, filePath: string) => {
  await page.setInputFiles('input[type="file"]', filePath);
  await page.click('button[type="submit"]');
};

const addSigner = async (page: any, email: string) => {
  await page.fill('input[placeholder="Signer Email"]', email);
  await page.click('button:has-text("Request signer")');
};

test("initial state", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(/SignFlow/);

  const emptyStateText = page.locator(
    "text=No documents yet. Please upload a document to get started."
  );
  await expect(emptyStateText).toBeVisible();
});

test("can upload a document", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const pathTestPDF = path.resolve(__dirname, "mocks/test.pdf");
  await page.setInputFiles('input[type="file"]', pathTestPDF);

  await page.click('button[type="submit"]');

  await expect(page.locator("body")).toContainText("test.pdf");

  await expect(page.locator("text=No signers yet")).toBeVisible();
});

test("can add a signer", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await uploadDocument(page, pathTestPDF);
  await addSigner(page, testEmail);

  await expect(page.locator("text=No signers yet")).not.toBeVisible();

  await expect(page.locator(`text=${testEmail}`)).toBeVisible();

  await expect(page.locator("text=Pending")).toBeVisible();
});

test("can sign a document", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await uploadDocument(page, pathTestPDF);
  await addSigner(page, testEmail);

  await page.click('button:has-text("Sign")');

  await expect(page.locator("text=Signed")).toBeVisible();
});

test("can decline to sign a document", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await uploadDocument(page, pathTestPDF);
  await addSigner(page, testEmail);

  await page.click('button:has-text("Decline")');

  await expect(page.locator("text=Declined")).toBeVisible();
});
