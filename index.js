class startGame {
  constructor() {
    document.getElementById("msg").innerHTML = "";
    document.getElementById("score").innerHTML = 0;
    this.a = new Array(81);
    for (let i = 0; i < 81; i++) this.a[i] = i + 1;
    this.total_clicked = 0;
    // get bomb location
    this.location = this.getBombLocation();
    //console.log(this.location);

    // boolean location
    this.visited = new Array(81);
    for (let i = 0; i < 81; i++) this.visited[i] = false;

    //create grid view
    this.createGridView(this);
  }

  // get bomb location
  getBombLocation() {
    var bomb = new Array(10);
    let count = 0;
    while (count < 10) {
      const rand = Math.floor(Math.random() * 82);
      if (!bomb.includes(rand)) {
        bomb[count] = rand;
        count++;
      }
    }
    return bomb;
  }

  // create grid look
  createGridView(a, grid) {
    var grid = document.getElementById("grid");
    grid.innerHTML = "";

    for (let i = 0; i < 9; i++) {
      let row = grid.insertRow(i);
      for (let j = 0; j < 9; j++) {
        let cell = row.insertCell(j);
        cell.onclick = function () {
          a.clickCell(this, i, j);
        };
        let mine = document.createAttribute("position");
        mine.position = i * 9 + j + 1;
        cell.setAttributeNode(mine);
      }
    }
  }

  // onclick handler function
  clickCell(cell, i, j) {
    const cur = i * 9 + j + 1;
    //console.log(cur);
    if (this.location.includes(cur)) {
      this.spotAllBomb();
    } else {
      if (!this.visited[cur]) {
        cell.style.backgroundColor = "Green";
        this.total_clicked++;
        document.getElementById("score").innerHTML = this.total_clicked;
        this.visited[cur] = true;
      }
    }

    if (this.total_clicked == 71) {
      document.getElementById("msg").innerHTML =
        '<h3>Congratulations you won the game</h3><button type="button" class="btn btn-primary" onclick="startNew()">Start New Game</button>';
    }
  }

  spotAllBomb = () => {
    document.getElementById("msg").innerHTML =
      '<h3>Game Over</h3><button type="button" class="btn btn-primary" onclick="startNew()">Start New Game</button>';
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        var cell = grid.rows[i].cells[j];
        if (this.location.includes(i * 9 + j + 1)) {
          cell.style.backgroundColor = "red";
        }
      }
    }
  };
}

obj = new startGame();

function startNew() {
  obj = new startGame();
}