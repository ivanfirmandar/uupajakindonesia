let isiTotal = [];
let keteranganPermLength;
let keteranganTemplength;


async function main() {
    let datas = await fetchData()
    setDatas(datas);
    domHandler(datas);
    // console.log(linkIndex);
    beautifyArray(linkIndex);
    change();
}
function change(params) {
    let yokai = document.getElementsByClassName('keterangan2');
    for (let index = 0; index < yokai.length; index++) {
        let result = yokai[index].innerHTML;
        result = result.replace(/\-/g, " ")
        yokai[index].innerHTML = result;
    }
}

async function fetchData() {
    return document.getElementsByClassName("brenden")
}
let otherIndex = 0;
function setDatas(datas) {
    //Untuk Setiap Data :
    let otherIndex = 0;
    for (let i = 0; i < datas.length; i++) {
        let pasalIni = datas[i].getAttribute('data');
        let isiPasal = datas[i].innerHTML;
        let newData = `<span hidden>${pasalIni}</span><span hidden> ${i}</span>${setLink(isiPasal, pasalIni)}`
        // console.log(newData)
        document.getElementsByClassName("brenden")[i].innerHTML = newData
    }
}
let linkIndex = [];
function setLink(isi, namapasal) {
    let pattern = "Pasal\\s+(\\w\\w\\w|\\w\\w|\\w)\\s+ayat\\s+\\((\\w\\w|\\w)\\)\\s+\\huruf\\s+\\w|Pasal\\s+(\\w\\w\\w|\\w\\w|\\w)\\s+ayat\\s+\\((\\w|\\w\\w)\\)|Pasal\\s+(\\w\\w\\w|\\w\\w|\\w)\\s+huruf\\s+\\((\\w|\\w\\w)\\)|Pasal\\s+(\\w\\w\\w|\\w\\w|\\w)|Pasal\\s+(\\w\\w\\w|\\w\\w|\\w)|ayat\\s+\\((\\w|\\w\\w)\\)\\s+huruf\\s+\\w|ayat\\s+\\((\\w|\\w\\w)\\)|huruf\\s+\\w\\s";
    let regexss = new RegExp(pattern, 'gi')
    let regexss2 = new RegExp(pattern, '')
    let index = 0
    let identityParsed;
    let tmpIsi = [];
    namapasal = namapasal.split(" ")[1]
    let matchedIsi = isi.match(regexss)
    if (matchedIsi !== null) {
        matchedIsi.forEach(element => {
            element = element.toUpperCase()
            // console.log(isi);
            let regeee = new RegExp('\\s+', 'gim')
            element = element.replace(regeee, ' ')
            let arrayElement = element.split(" ");
            console.log(namapasal)
            console.log(element)
            isi = isi.replace(regexss2, `<span class='keterangan' data=${namapasal} data2=${otherIndex}>${element}</span>`)
            // tmpIsi.push(`<span class='keterangan' data=${namapasal} data2=${otherIndex}>${element}</span>`)
            index++
            // otherIndex++
        });
    } else {
        isi = isi;
        index++
        // otherIndex++
    }
    // console.log(tmpIsi)
    // linkIndex.push(tmpIsi);
    return (isi)
}
let beautifiedArray = [];
function beautifyArray(linkIndex) {
    // console.log(linkIndex)
    linkIndex.forEach(element => {
        element.forEach(elemeee => {
            beautifiedArray.push(element);
        })
    });
    // console.log(beautifiedArray);
}

function domHandler(datas) {
    showKeterangan(datas);
    let toolbarButton = document.getElementsByClassName('toolbar')[0]
    toolbarButton.addEventListener('click', () => {
        document.getElementsByClassName('toolbar')[1].classList.toggle('find')
        document.getElementsByClassName('modal-toolbar')[0].classList.add('modal-toolbar-hide')
        // document.getElementsByClassName('toolbar')[2].classList.toggle('note')
    })
    let buttonCari = document.getElementById('button-cari')
    buttonCari.addEventListener('click', () => {
        findThings();
    })
    let toolbarSearch = document.getElementsByClassName('toolbar')[1]
    toolbarSearch.addEventListener('click', () => {
        document.getElementsByClassName('modal-toolbar')[0].classList.toggle('modal-toolbar-hide')
    })
    window.addEventListener('load', () => {
        document.getElementById("body").classList.remove("body");
    })
}

async function findThings() {
    let query = document.getElementById('cari').value
    let dataNeeds = await fetchData()
    for (let ind = 0; ind < dataNeeds.length; ind++) {
        document.getElementsByClassName('card-header')[ind].classList.remove('hide')
        let regexExp = new RegExp(`\\s+${query}`, 'gi')
        // console.log(dataNeeds[ind]);
        let matchedData = dataNeeds[ind].innerHTML.match(regexExp)
        if (matchedData == null) {
            document.getElementsByClassName('card-header')[ind].classList.add('hide')
        }
        let replacedText = dataNeeds[ind].innerHTML.replace(regexExp, ` <span class='search-highlight'>${query}</span>`)
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
            console.log(keteranganPermLength);
            console.log(keteranganTemplength)
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
            // console.log(encodedId.encodedid);
            keteranganTemplength = keterangan.length;
            index = index - selisih;
            console.log(keteranganPermLength);
            console.log(keteranganTemplength)
        })
    }
}

function closeKeterangan() {
    document.getElementById("keteranganAyat").classList.add("hide");
}

function keteranganParser(keterangan, attribute) {
    // console.log(`Keterangan ${keterangan}`)
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
    // console.log(attribute)
    return encodeId(pasal, ayat, huruf, attribute);
}

function encodeId(pasal, ayat, huruf, attribute) {
    let hurufs = huruf;
    console.log(pasal)
    console.log(ayat);
    console.log(huruf);
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
    // console.log(encodedId)
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
    // content.innerHTML.replace(/\<span.*>/g, "Makan")
    name = name.toUpperCase();
    // console.log(id)
    console.log(id);
    try {
        document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[1].innerHTML = name;
        document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[3].innerHTML = content.innerHTML
    } catch (error) {
        // content = createDifferent()
        document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[1].innerHTML = "Pemberitahuan";
        document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[3].innerHTML = "Tidak Terdapat di Dalam Undang - Undang Ini"
    }
}
function createDifferent(id, name) {
    let content = document.getElementById(id);
    name = name.replace(/\-/g, " ")
    name = name.toUpperCase();
    // console.log(content.innerHTML)
    let bucok = content.innerHTML.replace(/\<span.*keterangan\"/g, "<span class='keterangan2'")
    console.log(name);
    openKeterangan();
    try {
        document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[1].innerHTML = name;
        document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[3].innerHTML = bucok
        keteranganTemplength = keteranganPermLength
    } catch (error) {
        // content = createDifferent()
        document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[1].innerHTML = "Pemberitahuan";
        document.getElementsByClassName("modal-keterangan")[0].childNodes[1].childNodes[3].innerHTML = "Tidak Terdapat di Dalam Undang - Undang Ini"
    }
}
main();