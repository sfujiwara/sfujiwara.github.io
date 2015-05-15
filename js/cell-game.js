// todo: numRows, numCols はフォームではなくテーブルから取得すべき

function randomChoose(n) {
  var res = Math.floor(Math.random() * (n+1));
  //alert(res);
  return res
}

function drawMap() {
  stopAutoUpdate();
  // Draw empty cells
  var row = document.getElementById("nrow").value;
  var col = document.getElementById("ncol").value;
  var ss = [];
  ss.push("<table id='grid'>");
  for (var i=0; i<row; i++) {
    ss.push("<tr>");
    for (var j=0; j<col; j++) {
      ss.push("<td class='empty-cell' onclick='changeClass(this)'>");
      ss.push("</td>");
    }
    ss.push("</tr>");
  }
  ss.push("</table>");
  $('#map').html(ss.join(''));
}

function changeClass(cell) {
  if (cell.className == "empty-cell") {
    cell.className = "occupied-cell";
  }
  else {
    cell.className = "empty-cell";
  }
}

function arrangeUnits() {
  // Set units on initial positions
  var numUnits = document.getElementById("nunit").value;
  var tbl = document.getElementById("grid");
  // Note that table tag can be addressed without DOM only using id
  var numRows = grid.rows.length;
  var numCols = grid.rows[0].cells.length;
  for (var i=0; i<numUnits; i++) {
    var indRow = randomChoose(parseInt(numRows)-1);
    var indCol = randomChoose(parseInt(numCols)-1);
    tbl.rows[indRow].cells[indCol].className = "occupied-cell";
  }
}

function countAdjacentLives(r, c) {
  var tbl = document.getElementById("grid");
  // Note that table tag can be addressed without DOM only using id
  var numRows = grid.rows.length;
  var numCols = grid.rows[0].cells.length;
  var numAdjacentLives = 0;
  // Case of upper left corner
  if (r === 0 && c === 0) {
    if (tbl.rows[r].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
  }
  // Case of upper right corner
  else if (r === 0 && c == numCols-1) {
    if (tbl.rows[r].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
  }
  // Case of bottom left corner
  else if (r == numRows-1 && c === 0) {
    if (tbl.rows[r-1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r-1].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
  }
  // Case of bottom right corner
  else if (r == numRows-1 && c == numCols-1) {
    if (tbl.rows[r-1].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r-1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
  }
  else if (r === 0) {
    if (tbl.rows[r].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
  }
  else if (r == numRows-1) {
    if (tbl.rows[r-1].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r-1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r-1].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
  }
  else if (c === 0) {
    if (tbl.rows[r-1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r-1].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
  }
  else if (c == numCols-1) {
    if (tbl.rows[r-1].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r-1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
  }
  // Other cases
  else {
    if (tbl.rows[r-1].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r-1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r-1].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c-1].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c].className == "occupied-cell") numAdjacentLives += 1;
    if (tbl.rows[r+1].cells[c+1].className == "occupied-cell") numAdjacentLives += 1;
  }
  return numAdjacentLives;
}

function update() {
  var tbl = document.getElementById("grid");
  // Note that table tag can be addressed without DOM only using id
  var numRows = grid.rows.length;
  var numCols = grid.rows[0].cells.length;

  // Initialize array
  var arr = new Array();
  for(var r=0; r<numRows; r++){
    // １次元配列の各番地に、配列を作成して格納する
    arr[r] = new Array();
    for(var c=0; c<numCols; c++){
      arr[r][c] = false;
    }
  }

  // Check next status of each cells
  for (var r=0; r<numRows; r++) {
    for (var c=0; c<numCols; c++) {
      numAdjacentLives = countAdjacentLives(r, c);
      // Birth
      if (numAdjacentLives == 3) arr[r][c] = true;
      else if (numAdjacentLives <= 1) arr[r][c] = false;
      else if (numAdjacentLives >= 4) arr[r][c] = false;
      else {
        if (tbl.rows[r].cells[c].className == "occupied-cell") arr[r][c] = true;
        else arr[r][c] = false;
      }
    }
  }
  // Update class of each cells
  for (var r=0; r<numRows; r++) {
    for (var c=0; c<numCols; c++) {
      if (arr[r][c]) {
        tbl.rows[r].cells[c].className = "occupied-cell";
      }
      else {
        tbl.rows[r].cells[c].className = "empty-cell";
      }
    }
  }
}

// Global variables
var timer;
var autoUpdate = false;

function startAutoUpdate() {
  if (!autoUpdate) {
    timer = setInterval(update, 100);
    autoUpdate = true;
  }
}

function stopAutoUpdate() {
  if (autoUpdate) {
    clearInterval(timer);
    autoUpdate = false;
  }
}
