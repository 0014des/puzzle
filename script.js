const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");

let tiles = [];
const size = 4; // 4x4

// タイルを生成
function createTiles() {
  tiles = [];
  for (let i = 1; i <= 15; i++) {
    tiles.push(i);
  }
  tiles.push(""); // 空白マス
}

// タイルを描画
function renderTiles() {
  puzzle.innerHTML = "";
  tiles.forEach((value, index) => {
    const tile = document.createElement("div");
    tile.className = "tile" + (value === "" ? " empty" : "");
    tile.textContent = value;
    tile.addEventListener("click", () => moveTile(index));
    puzzle.appendChild(tile);
  });

  if (isSolved()) {
    message.textContent = "クリア！おめでとう🎉";
  } else {
    message.textContent = "";
  }
}

// タイルを移動
function moveTile(index) {
  const emptyIndex = tiles.indexOf("");
  const validMoves = [
    emptyIndex - 1, emptyIndex + 1,
    emptyIndex - size, emptyIndex + size
  ];

  // 隣接してるかチェック（横は同じ行のみ）
  const sameRow = Math.floor(index / size) === Math.floor(emptyIndex / size);
  if (
    validMoves.includes(index) &&
    (Math.abs(index - emptyIndex) === size || sameRow)
  ) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    renderTiles();
  }
}

// シャッフル
function shuffle() {
  do {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (isSolved()); // 最初から完成してたらやり直し
  renderTiles();
}

// クリア判定
function isSolved() {
  for (let i = 0; i < 15; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[15] === "";
}

// 初期化
createTiles();
renderTiles();
