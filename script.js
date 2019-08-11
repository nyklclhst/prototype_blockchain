var access_token = '';
var check;
const request = new XMLHttpRequest();


function checkWallet(){
    request.open('GET','http://localhost:3000/api/wallet',true);
    request.withCredentials = true;
    request.onload = function(){
        var data = JSON.parse(this.response);
        if(data.length == 0){
            check = 500;
            console.log('check = '+ check);
            checkUser();
        } else {
            check = request.status;
            console.log('check = '+ check);
            checkUser();
        }
    }
    request.send();
}

function getAccessToken(){
    var decodedCookie = decodeURIComponent(document.cookie);
    var name = "access_token=s:";
    var ca = decodedCookie.split('.');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            access_token = c.substring(name.length, c.length);
        }
    }
}

function checkUser(){
    if(access_token == ''){
        window.location.replace('http://localhost:3000/auth/github');
    } else {
        if(check === 200){
            window.location.replace('daftarbarang/');
            console.log('user ada');

        } else {
            window.location.replace('./ask.html');
            console.log('user tidak ada');
        }
    }
}

getAccessToken();
checkWallet();