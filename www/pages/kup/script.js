let isiTotal = [];
let keteranganPermLength;
let keteranganTemplength;


async function main() {
    let datas = await fetchData()
    setDatas(datas);
    domHandler(datas);
}

async function fetchData() {
    return document.getElementsByClassName("brenden")
}

function setDatas(datas) {
    for (let i = 0; i < datas.length; i++) {
        let pasalIni = datas[i].getAttribute('data');
        let isiPasal = datas[i].innerHTML;
        let newData = `<span hidden>${pasalIni}</span><span hidden> ${i}</span>${setLink(isiPasal, pasalIni)}`
        document.getElementsByClassName("brenden")[i].innerHTML = newData
    }
}

function setLink(isi, namapasal) {
    let pattern = "Pasal\\s+(\\w\\w|\\w)\\s+ayat\\s+\\((\\w\\w|\\w)\\)\\s+\\huruf\\s+\\w|Pasal\\s+(\\w\\w|\\w)\\s+ayat\\s+\\((\\w|\\w\\w)\\)|Pasal\\s+(\\w\\w|\\w)|Pasal\\s+(\\w\\w|\\w)|ayat\\s+\\((\\w|\\w\\w)\\)\\s+huruf\\s+\\w|ayat\\s+\\((\\w|\\w\\w)\\)|huruf\\s+\\w$";
    // console.log(isi)
    let regexss = new RegExp(pattern, 'gi')
    let regexss2 = new RegExp(pattern, '');
    // console.log(namapasal)
    namapasal = namapasal.split(" ")[1];
    let matchedIsi = isi.match(regexss);
    if (matchedIsi !== null) {
        matchedIsi.forEach(element => {
            element = element.toUpperCase();
            console.log("SEBELUM DIGANTI")
            console.log(element)
            let regeee = new RegExp('\\s+', 'gim')
            // console.log(element.match(regeee))
            element = element.replace(regeee, ' ')
            console.log("SETELAH DIGANTI")
            console.log(element)
            isi = isi.replace(regexss2, `<span class='keterangan' data=${namapasal}>${element}</span>`);
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
        document.getElementsByClassName('modal-toolbar')[0].classList.toggle('modal-toolbar-hide')
    })
    let buttonCari = document.getElementById('button-cari')
    buttonCari.addEventListener('click', () => {
        findThings();
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
    console.log(`Pasal : ${pasal}`);
    console.log(`Ayat : ${ayat}`)
    console.log(`Huruf : ${huruf}`)
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
    if (hurufs == 0) {
        return {
            encodedid: `${pasal}-${ayat}-${huruf}`,
            name: `pasal ${pasal} ayat ${ayat}`
        };
    } else {
        if (ayat == 0) {
            return {
                encodedid: `${pasal}-${ayat}-${huruf}`,
                name: `pasal ${pasal}`
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