let isiTotal = [];
let keteranganPermLength;
let keteranganTemplength;


async function main() {
    let datas = await fetchData()
    setDatas(datas);
    addNote()
    domHandler(datas);
}

async function fetchData() {
    return document.getElementsByClassName("brenden")
}

function setDatas(datas) {
    //Untuk Setiap Data :
    for (let i = 0; i < datas.length; i++) {
        let pasalIni = datas[i].getAttribute('data');
        let isiPasal = datas[i].innerHTML;
        let newData = `<span hidden>${pasalIni}</span><span hidden> ${i}</span>${setLink(isiPasal, pasalIni)}`
        document.getElementsByClassName("brenden")[i].innerHTML = newData
    }
}

function setLink(isi, namapasal) {
    let pattern = "Pasal\\s+(\\w\\w\\w|\\w\\w|\\w)\\s+ayat\\s+\\((\\w\\w|\\w)\\)\\s+\\huruf\\s+\\w|Pasal\\s+(\\w\\w\\w|\\w\\w|\\w)\\s+ayat\\s+\\((\\w|\\w\\w)\\)|Pasal\\s+(\\w\\w\\w|\\w\\w|\\w)|Pasal\\s+(\\w\\w\\w|\\w\\w|\\w)|ayat\\s+\\((\\w|\\w\\w)\\)\\s+huruf\\s+\\w|ayat\\s+\\((\\w|\\w\\w)\\)|huruf\\s+\\w$";
    let regexss = new RegExp(pattern, 'gi')
    let regexss2 = new RegExp(pattern, '')
    namapasal = namapasal.split(" ")[1]
    let matchedIsi = isi.match(regexss)
    if (matchedIsi !== null) {
        matchedIsi.forEach(element => {
            element = element.toUpperCase()
            let regeee = new RegExp('\\s+', 'gim')
            element = element.replace(regeee, ' ')
            isi = isi.replace(regexss2, `<span class='keterangan' data=${namapasal}>${element}</span>`)
        });
    } else {
        isi = isi;
    }
    return (isi)
}

function domHandler(datas) {
    showKeterangan(datas);
    let toolbarButton = document.getElementsByClassName('toolbar')[0]
    toolbarButton.addEventListener('click', () => {
        document.getElementsByClassName('toolbar')[1].classList.toggle('find')
        document.getElementsByClassName('toolbar')[2].classList.toggle('note')
    })
    let buttonCari = document.getElementById('button-cari')
    buttonCari.addEventListener('click', () => {
        findThings();
    })
    let toolbarSearch = document.getElementsByClassName('toolbar')[1]
    toolbarSearch.addEventListener('click', () => {
        document.getElementsByClassName('modal-toolbar')[0].classList.toggle('modal-toolbar-hide')
    })
}

async function findThings() {
    let query = document.getElementById('cari').value
    let dataNeeds = await fetchData()
    for (let ind = 0; ind < dataNeeds.length; ind++) {
        document.getElementsByClassName('card-header')[ind].classList.remove('hide')
        let regexExp = new RegExp(query, 'gi')
        let matchedData = dataNeeds[ind].innerHTML.match(regexExp)
        if (matchedData == null) {
            document.getElementsByClassName('card-header')[ind].classList.add('hide')
        }
        let replacedText = dataNeeds[ind].innerHTML.replace(regexExp, `<span class='search-highlight'>${query}</span>`)
        dataNeeds[ind].innerHTML = replacedText
    }
}

function refresh() {
    location.reload()
}
function addNote() {
    let judulPasal = document.getElementsByClassName('pasal-nama')
    for (let index = 0; index < judulPasal.length; index++) {
        let namaPasal = judulPasal[index].innerHTML.replace(/\s+/g, " ")
        let id = judulPasal[index].innerHTML.replace(/\s+/g, "")
        judulPasal[index].innerHTML += `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-journal-text toolbar-icon tombol-note" fill="currentColor" onclick="showNote('${id}','${namaPasal}')"
            xmlns="http://www.w3.org/2000/svg" data="${id}">
            <path
                d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
            <path
                d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            <path fill-rule="evenodd"
                d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
        </svg>`

    }
}
function showNote(id, namaPasal) {
    document.getElementsByClassName('note-container')[0].classList.remove('hide')
    let uuName = document.getElementById('judulUU').innerHTML
    document.getElementsByClassName('note-container')[0].innerHTML = `<div class="note">
    <textarea id="noteText" placeholder="Belum ada Catatan">${showNoteText(id, uuName)}</textarea>
     <div class="addNote">  
    <span><button onclick="closeNote()">Tutup</button></span><span><button onclick="saveNote('${id}','${uuName}')" id="saveNoteButton">Tersimpan</button>    </span><h5 id="namaPasalNote">${namaPasal}</h5>
    </div>
    </div>
   `
    let noteText = document.getElementById('noteText')
    noteText.addEventListener('keyup', () => {
        document.getElementById('saveNoteButton').setAttribute('style', 'background-color : red')
        document.getElementById('saveNoteButton').innerHTML = "Simpan"
    })
}
function showNoteText(id, uuName) {
    let note = localStorage.getItem(`${uuName} ${id}`)
    if (note == null) {
        return ""
    } else {
        return note;
    }

}
function saveNote(id, uuName) {
    let note = document.getElementById('noteText').value
    localStorage.setItem(`${uuName} ${id}`, note);
    document.getElementById('saveNoteButton').setAttribute('style', 'background-color : #1A3B50')
    document.getElementById('saveNoteButton').innerHTML = "Tersimpan"
}
function closeNote() {
    document.getElementsByClassName('note-container')[0].classList.add('hide')
}
function showKeterangan(datas) {
    let keterangan = document.getElementsByClassName("keterangan");
    keteranganPermLength = keterangan.length;
    for (let index = 0; index < keterangan.length; index++) {
        keterangan[index].addEventListener("click", () => {
            openKeterangan();
            let selisih = 0;
            if (keteranganPermLength < keteranganTemplength) {
                selisih = keteranganTemplength - keteranganPermLength;
                index += selisih;
            }
            console.log(keterangan[index]);
            let attribute = keterangan[index].getAttribute("data");
            let keteranganContent = keterangan[index].textContent;
            let encodedId = keteranganParser(keteranganContent, attribute);
            setKeterangan(encodedId.encodedid, encodedId.name);
            console.log(encodedId.encodedid);
            keteranganTemplength = keterangan.length;
            index = index - selisih;
        })
    }
}

function closeKeterangan() {
    document.getElementById("keteranganAyat").classList.add("hide");
}

function keteranganParser(keterangan, attribute) {
    console.log(`Keterangan ${keterangan}`)
    let pasal = 0;
    let ayat = 0;
    let huruf = 0;
    keteranganArray = keterangan.split(" ");
    switch (keteranganArray[0]) {
        case "PASAL":
            pasal = keteranganArray[1];
            ayat = keteranganArray[3] || 0;
            huruf = keteranganArray[5] || 0;
            break;
        case "AYAT":
            pasal = attribute;
            ayat = keteranganArray[1];
            huruf = keteranganArray[3] || 0;
            break;
        case "HURUF":
            pasal = attribute;
            ayat = attribute;
            huruf = keteranganArray[1];
            break;
        default:
            break;
    }
    return encodeId(pasal, ayat, huruf, attribute);
}

function encodeId(pasal, ayat, huruf, attribute) {
    let hurufs = huruf;
    if (ayat !== 0) {
        ayat = ayat.match(/\w+/g)[0];
        if (typeof huruf == "string") {
            huruf = huruf.charCodeAt(0) - 64;
        }
    }
    if (ayat == 0) {
        return {
            encodedid: `${pasal}-${ayat}-${huruf}`,
            name: `pasal ${pasal}`
        };
    } else {
        if (hurufs == 0) {
            return {
                encodedid: `${pasal}-${ayat}-${huruf}`,
                name: `pasal ${pasal} ayat ${ayat}`
            }
        }
    }
    return {
        encodedid: `${pasal}-${ayat}-${huruf}`,
        name: `pasal ${pasal} ayat ${ayat} huruf ${hurufs}`
    };
}

function openKeterangan() {
    document.getElementsByClassName("modal-keterangan")[0].classList.remove("hide");
}

function setKeterangan(id, name) {
    let content = document.getElementById(id);
    document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[1].innerHTML = name;
    try {
        document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[3].innerHTML = content.innerHTML
    } catch (error) {
        document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[3].innerHTML = "Pasal Tidak Ada"
    }

}
main();