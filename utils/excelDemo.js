const excelJS = require('exceljs');

//without using await
// const workbook = new excelJS.Workbook();
// workbook.xlsx.readFile("C:/Users/SravyaNarsingoju/Downloads/TestFile.xlsx").then(function()
// {
//    const worksheet = workbook.getWorksheet('Sheet1');
//       worksheet.eachRow((row, rowNumber) =>
//       {
//          row.eachCell((cell, colNumber ) =>
//          {
//             console.log(cell.value);
//          });
//       });
// });

//to read the excel file and print the desired cellvalue and the complete data in the excel file
async function excelReadFile() {
   const workbook = new excelJS.Workbook();
   await workbook.xlsx.readFile("C:/Users/SravyaNarsingoju/Downloads/TestFile.xlsx")
   {
      const worksheet = workbook.getWorksheet('Sheet1');
      worksheet.eachRow((row, rowNumber) => {
         row.eachCell((cell, colNumber) => {
            if (cell.value === "Apple") {
               console.log(rowNumber);
               console.log(colNumber);
            }
         });
      });
   };
}

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

//to replace the data in the excel file
async function excelWriteFile(searchText, replaceText, change, filePath) {
   const workbook = new excelJS.Workbook();
   await workbook.xlsx.readFile(filePath);
   const worksheet = workbook.getWorksheet('Sheet1');
   const output = await readExcel(worksheet, searchText);
   const cell = worksheet.getCell(output.row, output.column + change.changeCol);
   cell.value = replaceText;
   await workbook.xlsx.writeFile(filePath);
}

excelReadFile();
excelWriteFile("Mango", "565", { changeRow: 0, changeCol: 2 }, "C:/Users/SravyaNarsingoju/Downloads/TestFile.xlsx");