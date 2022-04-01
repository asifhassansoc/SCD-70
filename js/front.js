function adduser(ethadd){
    fetch("http://localhost:8081/adduser", {
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    method: "POST",
    body: JSON.stringify({"ethadd" : ethadd,}),
})
};