var tableData = data;
var tbody = d3.select("tbody");

function buildTable(data) {
  tbody.html("");

  data.forEach((dataRow) => {

    var row = tbody.append("tr");


    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
      cell.text(val);
    });
  });
}

var filters = {};

function updateFilters() {

  
  var changedElement = d3.select(this).select("input");
  var elementValue = changedElement.property("value");
  var filterId = changedElement.attr("id");

  
  
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }

  
  filterTable();

}

function filterTable() {

  
  let filteredData = tableData;

  
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  
  buildTable(filteredData);
}


d3.selectAll(".filter").on("change", updateFilters);

buildTable(tableData);
