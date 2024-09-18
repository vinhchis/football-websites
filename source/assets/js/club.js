let dataPlayerArray = [];
const club_name = "Chelsea"; // Hanoi FC club page
let order = false;

const listPlayerBody = document.getElementById("table-body-player");
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

async function getListPlayerByClub(club) {
  let playerList = await getListPlayer();
  //   console.log(playerList);
  const players = playerList.filter((player) => {
    if (player.club == club) {
      return player;
    }
  });
  return players;
}

async function renderPlayers(key) {
  let players = await getListPlayerByClub(club_name);
 
  switch (key) {
    case 1: // by name
      {
        order = !order;
        players = players.sort(function (a, b) {
          let x = a.player_name.toLowerCase();
          let y = b.player_name.toLowerCase();
          return order ? x > y : x < y;
        });

      }
      break;
    case 2: // by goal
      {
        order = !order;
        players = players.sort(function (a, b) {
          let x = a.goal;
          let y = b.goal;
          return order ? x < y : x > y;
        });
      }
      break;
    case 3:
      {
        let playerName = nameFilterInput.value; 
        players = players.filter(player => player.player_name.includes(playerName))
        // console.log("3", players);
      }
      break;
    default:
      renderPlayers();
      break;
  }

  console.log("player", players);
  const playerRow = players.map((player) => {
    let player_icon = `"../assets/images/League/${player.league}/${player.club}/${player.player_name}.webp"`
    return `
        <tr>
            <td>1</td>
            <td>
              <img width="20%" class="img-fluid img-thumbnail" src=${player_icon} alt="" srcset="">
            </td>
            <td>${player.player_name}</td>
            <td>${player.position}</td>
            <td>${player.weight} kg</td>
            <td>${player.height} m</td>
            <td>${player.goal}</td>
            <td>${player.dob}</td>
            <td>${player.nationality}</td>
          </tr>
        `;
  });
  listPlayerBody.innerHTML = playerRow.join("");
}

renderPlayers(1);



