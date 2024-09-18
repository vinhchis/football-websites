let dataPlayerArray = [];
let order = false;

const listCardBody = document.getElementById("container-10-player");
const btnSortName = document.getElementById("btn-sort-name");
const btnNameFilter = document.getElementById("btn-name-filter");
const nameFilterInput = document.getElementById("name-filter");

// const playerBanner = document.querySelector(".player-banner");

const playerDetailbody = document.getElementById("modal-player-detail");

async function fetchMatchesData() {
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
  let data = await fetchMatchesData();
  let players = [];
  data[0].map((club) => {
    club.players.map((player) => {
      players.push(player);
    });
  });
  return players;
}

async function getTopTenPlayer() {
  let data = await fetchMatchesData();
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
  let item = {};
  const playerRow = topPlayers.map((player) => {
    // let flag = `https://is.vnecdn.net/objects/country/${player.flag}`;
    let club_icon = `"../assets/images/League/${player.league}/${player.club}/${player.club}_logo.png"`;

    let player_icon = `"../assets/images/League/${player.league}/${player.club}/${player.player_name}.webp"`;
    item = {
      name: player.name,
      goal: player.goal,
    };
    console.log(item);
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
                    <img width="10%" src="${player.flag}" alt="" />
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
                    <img width="10%" src=${club_icon} alt="" />
                    <span class="pl__8px">${player.club}</span>
                  </p>
                  <p class="text-end">${player.position}</p>
                  <p class="text-end">${player.weight}</p>
                  <p class="text-end">${player.height}</p>
                  <p class="text-end">${player.goal}</p>
                </div>
              </div>
              <!-- Nút chi tiết -->
     
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick='showDetailPlayer(${JSON.stringify(
              player
            )})'>
    Detail
  </button>
            </div>
          </div>
    `;
  });
  listCardBody.innerHTML = playerRow.join("");
}

// Default
renderTopPlayer(1);



function showDetailPlayer(player) {
  let club_icon = `"../assets/images/League/${player.league}/${player.club}/${player.club}_logo.png"`;
  let player_icon = `"../assets/images/League/${player.league}/${player.club}/${player.player_name}.webp"`;
  playerDetailbody.innerHTML = `
  <div class="container mt-3">
        <!-- container-player begin-->
        <div class="row container-player">
            <!-- player-banner Begin -->
            <div class="row player-banner">
                <div class="col-3">
                    <img class="avatar img-fluid img-thumbnail border-3"
                        src=${player_icon} alt="Nkunku">
                    <div class="player-name">${player.player_name}</div>
                </div>
                <div class="col-6 offset-3 row">
                    <div class="col-7">
                        <div class="player-nationality">
                            <img src="${player.flag}" alt="">
                            <p>${player.nationality}</p>
                        </div>
                        <div class="club-card">
                            <div class="club-logo">
                                <a href="#">
                                    <img class="img-fluid text-center" src=${club_icon} alt="">
                                </a>
                            </div>
                            <div class="club-title">
                                <p>${player.club}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-5 jersey-number">
                        <p>${player.jersey_number}</p>
                    </div>
                </div>
            </div>
            <!-- player-banner Begin -->

            <!-- player-sidebar begin-->
            <div class="row">
                <div class="col-4 player-sidebar">
                    <div class="player-info card">
                        <div class="card-body">
                            <h5 class="card-title">Personal Information</h5>
                            <p class="card-text player-desc">Christopher Alan Nkunku is a French professional footballer
                                who plays
                                as an attacking midfielder, second striker or forward for Premier League club Chelsea
                                and the France national team.
                            </p>

                            <!-- Chi tiết về cầu thủ -->
                            <div class="infor-player-flex pt-pr pt-2">
                                <!-- Thông tin trái -->
                                <div style="white-space: nowrap;">
                                    <p class="text-start">Date of Birth:</p>
                                    <p class="text-start">Current Club:</p>
                                    <p class="text-start">Position:</p>
                                    <p class="text-start">Weight:</p>
                                    <p class="text-start">Height:</p>
                                </div>
                                <!-- Thông tin phải -->
                                <div>
                                    <p class="text-end">${player.dob}</p>
                                    <p class="text-end">
                                        <img width="10%" src=${club_icon} alt="">
                                        <span class="pl__8px">${player.club}</span>
                                    </p>
                                    <p class="text-end">${player.position}</p>
                                    <p class="text-end">${player.weight} kg</p>
                                    <p class="text-end">${player.height} cm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- player-award begin -->
                    <div class="player-award card">
                        <div class="card-body">
                            <h5 class="card-title">Awards</h5>
                            <ol class="list-group list-group-numbered">
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">Man of the Match</div>
                                        A player of the match or man of the match award is often given to the most
                                        outstanding player in a particular match.
                                    </div>
                                    <span class="badge bg-primary rounded-pill">20</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">Premier Leage Cup</div>
                                    </div>
                                    <span class="badge bg-primary rounded-pill">3</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">Chamption Leage Cup</div>
                                    </div>
                                    <span class="badge bg-primary rounded-pill">1</span>
                                </li>
                            </ol>


                        </div>
                    </div>
                    <!-- player-end begin -->
                </div>
                <!-- player-sidebar end-->

                <div class="col-8">
                    <!-- Player-carrer Begin-->
                    <div class="player-carrer">
                        <table class="table table-hover">
                            <tr>
                                <th>Year</th>
                                <th>Club</th>
                            </tr>
                            <tr>
                                <td>2020</td>
                                <td>Chelsea</td>
                            </tr>
                            <tr>
                                <td>2023</td>
                                <td>Mu</td>
                            </tr>
                            <tr>
                                <td>2023</td>
                                <td>Mu</td>
                            </tr>
                            <tr>
                                <td>2023</td>
                                <td>Mu</td>
                            </tr>
                            <tr>
                                <td>2023</td>
                                <td>Mu</td>
                            </tr>
                            <tr>
                                <td>2023</td>
                                <td>Mu</td>
                            </tr>
                        </table>
                    </div>
                    <!-- Player-carrer End-->

                </div>
            </div>
        </div>
        <!-- container-player end-->
    </div>
  
  `;

  console.log("playser", player);
}
// ----------------------------------------

//-----
// const listMatchBody = document.getElementById("container-match");

// const listClubBody = document.getElementById("container-club-rank");
// const listLeagueInput = document.getElementById("list-league");
// async function fetchClubsData() {
//   try {
//     const response = await fetch("../assets/json/club.json");
//     const data = await response.json();
//     dataPlayerArray.push(data);
//     return dataPlayerArray;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// async function getClubsByLeague(league_name) {
//   let data = await fetchClubsData();
//   console.log("club", data[0]);
//   let clubs = [];
//   data[0].leagues.map((league) =>
//     league.clubs.map((club) => console.log(club.name))
//   );
//   // data[0].leagues.map(league =>
//   //     league.clubs.map(club => {
//   //         if(club.name == league_name){
//   //             clubs.push(club)
//   //         }
//   //     })
//   // )
//   return clubs;
// }

// getClubsByLeague("La Liga");

// // async function renderClubsRanking() {
// //   let league_name = listLeagueInput.options[listLeagueInput.selectedIndex].value;
// //   const clubs = await getClubsByLeague(league_name);
// //   console.log(clubs);
// // }

// // renderClubsRanking()
