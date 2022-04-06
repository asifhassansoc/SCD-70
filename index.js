const serverUrl = "https://lfvk6rjxnjql.usemoralis.com:2053/server";
const appId = "j7K9Jx6KmRjlpwWXiKfqv7T7rRuMxVaCVjHqm4EF";

Moralis.start({ serverUrl, appId });

/* Authentication code */
var ethadd = '';
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        ethadd = user.get("ethAddress");
        adduser(ethadd);
        getid(ethadd);
        hide();
        // nfts(ethadd);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  else {
    alert("Already Logged In");
    // swal("Already Logged In");
  }
};

async function logOut() {
  await Moralis.User.logOut();
//   document.getElementById("nonp2").style.display = "inline";
//   document.getElementById("p2").style.display = "inline";
//   document.getElementById("logout").style.display = "none";
//   document.getElementById("p2e").style.display = "none";
//   document.getElementById("inv").style.display = "none";
  console.log("logged out");
};
logOut();

function hide(){
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "inline";
    document.getElementById("game").style.display = "inline";
    document.getElementById("invite").style.display = "inline";
    document.getElementById("wd").style.display = "inline";
}

function logouthide(){
        document.getElementById("logout").style.display = "none";
        document.getElementById("p2e").style.display = "none";
        document.getElementById("inv").style.display = "none";
        document.getElementById("wd").style.display = "none";
}

var userid;
var tokens;
function getid(){
  fetch("http://localhost:8081/getid?ethadd=" + ethadd)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    userid = data[0].id;
    // console.log(userid);
    tokens = data[0].tokens;
    document.getElementById("token").innerHTML = data[0].tokens;
  })
};

function copy() {
  /* Get the text field */
  var copyText = document.getElementById("link");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  alert("Copied the Link: " + copyText.value);
};

function checktoken(){
    var mytoken = document.getElementById("mytoken").value;
    if(mytoken > tokens){
        alert("Your token is not available:")
    }
}

// program to generate random strings
// declare all characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString() {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  fetch("http://localhost:8081/getinvitationid?userid=" + userid)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      if (data == "") {
        let invhash = result + userid;
        fetch("http://localhost:8081/addinvitation", {
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          method: "POST",
          body: JSON.stringify({ "userid": userid, "invitehash": invhash, }),
        })
        var link = "http://127.0.0.1:5500/index.html?inv=" + result + userid;
        document.getElementById("link").value = link;
        $('#inviteModal').modal('show');
      }
      else {
        let link = "http://127.0.0.1:5500/index.html?inv=" + data[0].invitehash;
        document.getElementById("link").value = link;
        $('#inviteModal').modal('show');
      }
    })
};

async function nfts() {
  const options = { chain: 'rinkeby', address: ethadd };
  const NFTs = await Moralis.Web3API.account.getNFTs(options);
  for (i = 0; i < NFTs.result.length; i++) {
    // var data = NFTs.result[i];
    var metadata = JSON.parse(NFTs.result[i].metadata);
    var myimg = metadata.image;
    // console.log(img);
    document.getElementById("mynfts").innerHTML += `
    <div class="col-lg-4 col-md-4">
    <div class="card nftcard">
    <img src="${myimg}" onclick="resize('${myimg}')" data-dismiss="modal" class="card-img-top" width="300px" height="100px" />
  </div>
  </div>
    `}
  // console.log(data);
  // console.log(metadata);
};

function resize(myimg) {
  var img = new Image();
  img.src = myimg;
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, 255, 60);
  // myimg.style.height = 60 + '%';
  console.log(img.src);
  game.resources[1].src = img.src;
  hide();
  window.onReady(function onReady() {
    game.onload();
  });
};

function adduser(waletadd) {
  fetch("http://localhost:8081/fetch")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.length == 0) {
        adduser2(waletadd);
        console.log("1st User Login");
      }
      var arr = data.map(item => {
        return item.waletadd;
    })
        // console.log(arr);
        if (arr.indexOf(waletadd) === -1) {
          adduser2(waletadd);
          // get url params
          const urlParams = new URLSearchParams(window.location.search);
          const inv = urlParams.get("inv");
          // console.log(inv, "inv");
          if (inv != null) {
            // get invite table
            fetch("http://localhost:8081/getinvitation?inv=" + inv)
              .then(function (res) {
                return res.json();
              })
              .then(function (data) {
                console.log(data[0].userid);
                var id = data[0].userid;
               // update user tokens
                fetch("http://localhost:8081/addtokens?id=" + id)
                  .then(function (res) {
                    return res.json();
                  })
                  .then(function (data) {
                    console.log(data);
                  })
              })
          }
      }
    })
};

function adduser2(waletadd) {
  fetch("http://localhost:8081/adduser", {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    method: "POST",
    body: JSON.stringify({ "waletadd": waletadd, }),
  })
};

function addscore(save) {
  var score = save.score;
  var steps = save.steps;
  // console.log(save, ethadd);
  fetch("http://localhost:8081/addscore", {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    method: "POST",
    body: JSON.stringify({ "ethadd": ethadd, "score": score, "steps": steps, }),
  })
};

function withdraw(){
  $('#wdModal').modal('show');
};

function wdeth(){
  var mytoken = document.getElementById("mytoken").value;
  if(mytoken > tokens){
      alert("Your token is not available:")
  }
  else{
    fetch("http://localhost:8081/wdeth", {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    method: "POST",
    body: JSON.stringify({ "ethadd": ethadd, "mytoken": mytoken, }),
  })
  }
}