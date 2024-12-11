console.log("Beautiful December!!");

// create buttons on embedded website

// create variables
// Default is const, if valued wouldn't change
const viz = document.getElementById("tableauViz");

// if values could change
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

//define buttons
const OregonButton = document.getElementById("Oregon_Button");
const ClearButton = document.getElementById("Clear_Filter_Button");
const UndoButton = document.getElementById("Undo_Button");

//define sheetnames as variables
let salesMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// avoid using var for variables

// Create a function to log workbook information
function logWorkbookInformation() {
  //get workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  // Get the array of dashboards within our workbook
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(
      "The sheet with index " + index + " has the name " + element.name
    );
  });

  //Get the active sheet in our workbook
  vizActiveSheet = workbook.activeSheet;
  console.log("The active sheet is: " + vizActiveSheet.name + ".");

  //List all the worksheets within the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    let WorksheetName = element.name;
    console.log(
      "The worksheet with the index [" + index + "] is: " + WorksheetName
    );
  });

  //Assign sheets to the variables created
  salesMap = listSheets.find((i) => i.name == "SaleMap");
  totalSales = listSheets.find((i) => i.name == "Total Sales");
  salesByProduct = listSheets.find((i) => i.name == "SalesbyProduct");
  salesBySegment = listSheets.find((i) => i.name == "SalesbySegment");
}

// Log workbook information once the viz has become interactive
// add event listener
viz.addEventListener("firstinteractive", logWorkbookInformation);

// Function for the buttons to work
function oregonfunction() {
  console.log(OregonButton.value);
  //apply filter to sheets
  salesMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

// Function for clear button to work
function clearfunction() {
  console.log("Cleared");
  //apply filter to sheets
  salesMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
}

//Function to undo
function undofunction() {
  console.log("Undone");
  //apply filter to sheets
  viz.undoAsync();
}

// event listener for buttons
OregonButton.addEventListener("click", oregonfunction);
ClearButton.addEventListener("click", clearfunction);
UndoButton.addEventListener("click", undofunction);
