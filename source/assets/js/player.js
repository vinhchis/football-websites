let dataPlayerArray = [];
let order = false;

const listCardBody = document.getElementById("container-player-card");
const btnSortName = document.getElementById("btn-sort-name");
const btnNameFilter = document.getElementById("btn-name-filter");
const nameFilterInput = document.getElementById("name-filter");

async function fetchPlayerData() {
  try {
    const response = await fetch("../assets/json/player.json");
    const data = await response.json();
    dataPlayerArray.push(data);
    return dataPlayerArray;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getListPlayer() {
  let data = await fetchPlayerData();
  let players = [];
  data[0].map((club) => {
    club.players.map((player) => {
      players.push(player);
    });
  });
  return players;
}

async function getTopTenPlayer() {
  let data = await fetchPlayerData();
  let players = [];

  data[0].map((club) => {
    club.players.map((player) => {
      players.push(player);
    });
  });

  players.sort((a, b) => (a.goal > b.goal ? -1 : 1));
  return players.slice(0, 10);
}

async function renderTopPlayer(key) {
  let topPlayers = await getTopTenPlayer();
  switch (key) {
    case 1: // sort by name
      {
        order = !order;
        topPlayers = topPlayers.sort(function (a, b) {
          let x = a.player_name.toLowerCase();
          let y = b.player_name.toLowerCase();
          return order ? x > y : x < y;
        });
      }
      break;
    case 2: // sort by goal
      {
        order = !order;
        topPlayers = topPlayers.sort(function (a, b) {
          let x = a.goal;
          let y = b.goal;
          return order ? x < y : x > y;
        });
      }
      break;
    case 3: // search by name
      {
        let playerName = nameFilterInput.value;
        topPlayers = topPlayers.filter((player) =>
          player.player_name.toLowerCase().includes(playerName.toLowerCase())
        );
      }
      break;
    default:
      renderPlayers();
      break;
  }

  const playerRow = topPlayers.map((player) => {
    let flag = `https://is.vnecdn.net/objects/country/${player.flag}`;
    let player_icon = `"../assets/images/League/${player.league}/${player.club}/${player.player_name}.webp"`;
    return `
    <div class="col-lg-3 col-md-4 col-6 text-center" id="card-item">
            <div class="card mb-3 box-shadow" style="color: black">
              <!-- Hình ảnh và thông tin cầu thủ -->
              <div class="hover__boder border-bottom pt-2 d-flex">
                <!-- Hình ảnh cầu thủ -->
                <div class="rounded-circle player-icon px-3">
                  <img width="200px" class="img-fluid rounded-circle"
                    src=${player_icon}
                    alt=${player.player_name} />
                </div>
                <!-- Thông tin cầu thủ -->
                <div class="text-start">
                  <p class="h6 pt-2 font-weight-bold">${player.player_name}</p>
                  <p>
                    <img width="10%" src="https://is.vnecdn.net/objects/country/ar.svg" alt="" />
                    <span class="pl__8px">${player.nationality}</span>
                  </p>
                </div>
              </div>
              <!-- Chi tiết về cầu thủ -->
              <div class="infor-player-flex p__lr-20px pt-2">
                <!-- Thông tin trái -->
                <div style="white-space: nowrap">
                  <p class="text-start">Date of Birth</p>
                  <p class="text-start">Club</p>
                  <p class="text-start">Position</p>
                  <p class="text-start">Weight:</p>
                  <p class="text-start">Height:</p>
                  <p class="text-start">Goal:</p>
    
                </div>
                <!-- Thông tin phải -->
                <div>
                  <p class="text-end">24/06/1987</p>
                  <p class="text-end">
                    <img width="10%" src="https://is.vnecdn.net/objects/teams/85.png" alt="" />
                    <span class="pl__8px">${player.club}</span>
                  </p>
                  <p class="text-end">${player.position}</p>
                  <p class="text-end">${player.weight}</p>
                  <p class="text-end">${player.height}</p>
                  <p class="text-end">${player.goal}</p>

                </div>
              </div>
              <!-- Nút chi tiết -->
              <button class="btn btn-outline-dark">
                Chi tiết <span class="pl-1">></span>
              </button>
            </div>
          </div>
    `;
  });
  listCardBody.innerHTML = playerRow.join("");
}

// Default
renderTopPlayer(1);