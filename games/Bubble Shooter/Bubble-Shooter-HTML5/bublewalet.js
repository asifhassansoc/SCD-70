const serverUrl = "https://lfvk6rjxnjql.usemoralis.com:2053/server";
const appId = "j7K9Jx6KmRjlpwWXiKfqv7T7rRuMxVaCVjHqm4EF";

Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
          var ethAddress = user.get("ethAddress");
          // adduser(ethAddress);
        window.onReady(function onReady() {
            game.onload();
            });
            hide();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else{
        swal("Already Logged In")
    }
  }

  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }
  logOut();

function adduser(ethadd){
    fetch("http://localhost:8081/adduser", {
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    method: "POST",
    body: JSON.stringify({"ethadd" : ethadd,}),
})
};