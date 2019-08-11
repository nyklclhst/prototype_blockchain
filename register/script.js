const request = new XMLHttpRequest();
function regis(){
    const url = "http://localhost:3001/api/userData";
    const type = 'POST';
    document.getElementById("loader").style.display = "block";
    document.getElementById("form").style.display = "none";
    const email = document.getElementById('email').value;
    const uname = document.getElementById('username').value;
    const data = '{ "$class": "model.userData","userID":"' + uname + '@seculab-network","username":"'+ uname + '","email":"'+ email +'" }';
    if(uname !== null && validateEmail(email)){
        request.open(type,url, true);
        request.setRequestHeader('Content-type','application/json');
        request.send(data);
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200) {
                Swal.fire("Congratulation", "You just registered! We will contact you soon for confirmation", "success"); 
                document.getElementById("loader").style.display = "none";
                document.getElementById("form").style.display = "block";
            } 
            if(request.status !== 200 && request.readyState === 4) {
                Swal.fire({ type: 'error', title: 'Oops...', text: 'Something went wrong!', footer: '<a href="#">Why do I have this issue?</a>'});
                document.getElementById("loader").style.display = "none";
                document.getElementById("form").style.display = "block";
            }
        }
    } else {
        Swal.fire({ type: 'error', title: 'Oops...', text: 'Wrong Email Pattern!', footer: '<a href="#">Why do I have this issue?</a>'});
        return;
    }
}

function validateEmail(emailID) {
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");
    
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
    alert("Please enter correct email ID")
    document.getElementById('email').focus() ;
    return;
    }
    return true;
}

function uploadcard(){
    const name = document.getElementById('name').value;
    document.getElementById("loader").style.display = "block";
    document.getElementById("form").style.display = "none";
    if(name !== null){
        const url = 'http://localhost:3000/api/wallet/import?name='+name;
        const data = document.getElementById('icard').files[0];
        var formData = new FormData();
        formData.append('card',data);
        request.open('POST',url,true);
        request.withCredentials = true;
        request.send(formData);
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 204) {
                Swal.fire("Congratulation", "You just registered! We will contact you soon for confirmation", "success"); 
                document.getElementById("loader").style.display = "none";
                document.getElementById("form").style.display = "block";
                setTimeout(function(){
                    window.location.replace('daftarbarang/');
                }, 5000)
            } 
            if(request.status !== 204 && request.readyState === 4) {
                Swal.fire({ type: 'error', title: 'Oops...', text: 'Something went wrong!', footer: '<a href="#">Why do I have this issue?</a>'});
                document.getElementById("loader").style.display = "none";
                document.getElementById("form").style.display = "block";
            }
        }
    } else {
        Swal.fire({ type: 'error', title: 'Oops...', text: 'Name cannot be empty!', footer: '<a href="#">Why do I have this issue?</a>'});
        return;
    }
}