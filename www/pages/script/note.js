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

addNote()