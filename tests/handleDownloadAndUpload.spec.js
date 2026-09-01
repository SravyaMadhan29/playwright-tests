const { test, expect } = require('@playwright/test');
const excelJS = require('excelJS');
const fs = require('fs');

async function readExcel(worksheet, searchText) {
   let output = { row: -1, column: -1 };
   worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
         if (cell.value === searchText) {
            output.row = rowNumber;
            output.column = colNumber;
         }
      });
   })
   return output;
}

async function excelWriteFile(searchText, replaceText, change, filePath) {
   if (!fs.existsSync(filePath)) {
      throw new Error(`File not found before read: ${filePath}`);
   }
   const workbook = new excelJS.Workbook();
   await workbook.xlsx.readFile(filePath);
   const worksheet = workbook.getWorksheet('Sheet1');
   const output = await readExcel(worksheet, searchText);
   const cell = worksheet.getCell(output.row, output.column + change.changeCol);
   cell.value = replaceText;
   await workbook.xlsx.writeFile(filePath);
}

// excelWriteFile("Mango", "565",{changeRow:0, changeCol:2},"C:/Users/SravyaNarsingoju/Downloads/TestFile.xlsx");
test("validations for uploading and downloading excel", async ({ page }) => {
   const text = "Mango";
   const updateValue = "350";
   const filePath = "C:/Users/SravyaNarsingoju/Downloads/download.xlsx";
   await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
   const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: "Download" }).click(),
   ]);
   console.log("Playwright temp download path:", await download.path());
   await download.saveAs(filePath);
   console.log("File exists after saveAs?", fs.existsSync(filePath));
   await excelWriteFile(text, updateValue, { changeRow: 0, changeCol: 2 }, filePath);
   await page.locator("#fileinput").click();
   await page.locator("#fileinput").setInputFiles(filePath);
   const textLocator = await page.getByText(text);
   const desiredRow = await page.getByRole('row').filter({ has: textLocator });
   await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});