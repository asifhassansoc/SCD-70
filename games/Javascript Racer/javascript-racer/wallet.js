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
        hide();
        $('#exampleModal').modal('show');
        nfts(ethadd);
      })
      .catch(function (error) {
        alert("User Denied");
        console.log(error);
      });
  }
  else {
    swal("Already Logged In")
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}
logOut();

async function nfts(add) {
  const options = { chain: 'rinkeby', address: add };
  const NFTs = await Moralis.Web3API.account.getNFTs(options);
  
  for (i = 0; i < NFTs.result.length; i++) {
    // var data = NFTs.result[i];
    var metadata = JSON.parse(NFTs.result[i].metadata);
    var myimg = metadata.image;
    console.log(myimg);
    document.getElementById("mynfts").innerHTML += `
    <div class="col-lg-4 col-md-4">
    <div class="card nftcard">
    <img src="${myimg}" onclick="show()" data-dismiss="modal" class="card-img-top" width="300px" height="100px" />
    </div>
    </div>
    `}
  // console.log(data);
  // console.log(metadata);
}