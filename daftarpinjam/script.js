const request = new XMLHttpRequest();

function getDataPinjam() {
    request.open('GET','http://localhost:3000/api/DataPeminjaman', true);
    request.withCredentials = true;
    request.onload = function (){
        var data = JSON.parse(this.response);

        const tbody = document.getElementById('tbl_body');
        if(data.length == 0){
            const root = document.getElementById('root');
            root.hidden = false;
            const table = document.getElementById('tbl_id');
            table.hidden = true;
            const h2 = document.createElement('h2');            
            h2.setAttribute('class','text-danger');
            h2.setAttribute('style','text-align: center');
            h2.textContent = 'Data Kosong!';
            root.appendChild(h2);
        } else {
            data.forEach(barang => {
                const tr = tbody.appendChild(document.createElement('tr'));
                tr.appendChild(document.createElement('td')).textContent=barang.IDPeminjaman;
                tr.appendChild(document.createElement('td')).textContent=barang.NamaPeminjam;
                tr.appendChild(document.createElement('td')).textContent=barang.JumlahBarang;
                const dataBarang = barang.Barang.substr(26);
                tr.appendChild(document.createElement('td')).textContent=dataBarang;
                tr.appendChild(document.createElement('td')).textContent=barang.Status;
                const waktu = barang.WaktuPengembalian.slice(0,-14);
                tr.appendChild(document.createElement('td')).textContent=waktu;
                tr.appendChild(document.createElement('td')).textContent=barang.KontakPeminjam;
            });
        }
        
    };
    request.send();
}

function sendPeminjaman(){
    var ID = Math.floor(Math.random() * 1000).toString();
    while(ID.length < 5){
        ID = 0 + ID;
    }
    ID = 'ID_' + ID;
    var data = '';
    request.onreadystatechange = function(){
       var name = document.getElementById('user').value;
       var contact = document.getElementById('contact').value;
       var jumlah = document.getElementById('jumlah_brg').value;
       var id_bar = document.getElementById('idbarang').value;
       var waktu = document.getElementById('kembali').value;
       const temp = '{ \
        "$class": "model.DataPeminjaman",\
        "IDPeminjaman": "'+ID+'",\
        "NamaPeminjam": "'+name+'",\
        "KontakPeminjam": "'+contact+'",\
        "JumlahBarang": '+jumlah+',\
        "Barang": "resource:model.DataBarang#'+id_bar+'",\
        "Status": "DIPINJAM",\
        "WaktuPengembalian": "'+waktu+'"\
        }';
       data = temp;
    };
    request.open('POST','http://localhost:3000/api/DataPeminjaman', true);
    request.setRequestHeader('Content-type','application/json');
    request.withCredentials = true;
    var corm = confirm("Yakin isinya sudah benar?");
    if(corm){
        request.send(data);
        alert("Terima Kasih. Jangan Lupa Dikembalikan yaa XD");
        return true;
    } else {
        return false;
    }
}

function getDataforForm(){
    var request = new XMLHttpRequest();
    request.open('GET','http://localhost:3000/api/DataBarang', true);
    request.withCredentials = true;
    request.onload = function (){
        var data = JSON.parse(this.response);

        const select = document.getElementById('idbarang');
        if(data.length == 0){
            const option = document.createElement('option');
            option.setAttribute('value',null);
            option.textContent = '<--- Data Kosong --->';
            select.appendChild(option);
            select.disabled = true;
        } else {
            data.forEach(barang => {
                const option = document.createElement('option');
                option.setAttribute('value',barang.IDBarang);
                option.textContent = barang.NamaBarang;
                select.appendChild(option);
            });
        }
    };
    request.send();
}