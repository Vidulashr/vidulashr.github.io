//Fills in search bar datalist
catchPlayers().catch((error) => {
	console.error('Error',error);
});



let playerdatamap = new Map;
var count = 0;
async function catchPlayers() {
  for (x = 1; x < 34; x++) {
    var link = "https://www.balldontlie.io/api/v1/players?page=" + x + "&per_page=100";
    const response = await fetch(link)
    const playerdata = await response.json();
    console.log(playerdata); //gets player data
    for (i = 0; i < playerdata['data'].length; i++) {
      const {first_name, last_name,id} = playerdata['data'][i];
      var name1 = document.createElement("option");
      name1.value = first_name + " " + last_name;
      name1.setAttribute("id",id); //set id as player id
      name1.setAttribute("class",first_name + " " + last_name);
      document.getElementById("playerlist").appendChild(name1);
      playerdatamap.set(id,x);
    }
    console.log(playerdata['meta'][2])
  }
}




var playername = document.getElementById("playername");
var playernum = document.getElementById("playernumber");
var playerheight = document.getElementById("playerht");
var playerweight = document.getElementById("playerwt");
var playerposition = document.getElementById("playerage");
var playerage = document.getElementById("playerage");



async function setStats(searchid) {
    var link = "https://www.balldontlie.io/api/v1/players/"+searchid;
    const response = await fetch(link);
    const playerdata = await response.json();
    console.log(playerdata); //gets player data
    const {height_feet,weight_pounds,height_inches,position} = playerdata;
    if (height_feet===null){
      playerheight.textContent = "N/A";
    }
    else{
          playerheight.textContent = height_feet+"'"+height_inches;
    }
    if (weight_pounds===null){
          playerweight.textContent = "N/A";

    }
    else{
          playerweight.textContent = weight_pounds+" lbs";
    }
    playerposition.textContent = position;
}

var playerteam = document.getElementById("playerteam");
async function setTeam(searchid) {
    var link = "https://www.balldontlie.io/api/v1/players/"+searchid;
    const response = await fetch(link);
    const playerdata = await response.json();
    console.log(playerdata); //gets player data
    const {full_name} = playerdata["team"];
    playerteam.textContent = full_name;
}

var playerpts = document.getElementById("ppg");
var playerreb= document.getElementById("rpg");
var playerast= document.getElementById("apg");
var playerblk= document.getElementById("bpg");
async function setAverages(searchid) {
    var link = "https://www.balldontlie.io/api/v1/season_averages?player_ids[]="+searchid;
    const response = await fetch(link)
    const playerdata = await response.json();
    console.log(playerdata); //gets player data
    const {reb,ast,blk,pts} = playerdata["data"][0];
    console.log(reb,ast,pts,blk);
    playerpts.innerText = pts+" PPG";
    playerreb.innerText = reb+ " RPG";
    playerast.innerText = ast +" APG";
    playerblk.innerText = blk +" BPG";
}






//Search button animation
$('.search-button').click(function(){
  $(this).parent().toggleClass('open');
});

//Sign in button function
var signin = document.getElementById("signup");
signin.onclick = (function () {
    alert("Working on it")
});

//Search button function
var searchbar = document.getElementById("searchbar");
var searchedplayer;
var searchopened = false;
var searchbutton = document.getElementById("button");
var playerstats = document.getElementById("statcontent");
searchbutton.onclick= (function () {
  if (!searchopened) {
    searchopened = true;
  } else {
    if (document.getElementById("playerSearch").value === "") {
      searchopened = false;
    } else {
      searchedplayer = document.getElementById("playerSearch").value;
      searchedplayerid = document.getElementsByClassName(searchedplayer)[0].id;
      searchbar.style.display = "none"; //remove search bar once searched
      playerstats.style.display = "contents"; //display stats
      setStats(searchedplayerid); //show player id
      setTeam(searchedplayerid);
      setAverages(searchedplayerid);
      playername.textContent = searchedplayer = document.getElementById("playerSearch").value;
      searchopened = false;
    }}
});







