async function fetchMatchesData() {
  try {
    const response = await fetch("../assets/json/match.json");
    const data = await response.json();
    dataPlayerArray.push(data);
    return dataPlayerArray;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getListMatch() {
  let data = await fetchMatchesData();
  let matches = [];
  console.log(data);
//   data[0].map((match) => {
//     matches.push(match);
//     console.log(match);
//   });
//   return matches;
}

getListMatch();
