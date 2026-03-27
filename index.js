const pocetnaBeleska = {
    naslov: "Листа на нови видео игри: план за набавка",
    sodrzina: "1. CS2 Skins\n2. Minecraft Sale"
};

function vcitajBeleski() {
    let beleskiRaw = localStorage.getItem('moiteBeleski');
    if (!beleskiRaw) {
        let niza = [pocetnaBeleska];
        localStorage.setItem('moiteBeleski', JSON.stringify(niza));
        return niza;
    }
    return JSON.parse(beleskiRaw);
}

function prikaziLista() {
    const listaElement = document.getElementById('notesList');
    const beleski = vcitajBeleski();
    listaElement.innerHTML = "";
    beleski.forEach((b, index) => {
        let div = document.createElement('div');
        div.className = "note-item";
        div.innerText = b.naslov;
        div.onclick = () => urediBeleska(index);
        listaElement.appendChild(div);
    });
}

let selektiranaIndeks = null;
function urediBeleska(index) {
    const beleski = vcitajBeleski();
    document.getElementById('noteTitle').value = beleski[index].naslov;
    document.getElementById('noteContent').value = beleski[index].sodrzina;
    selektiranaIndeks = index;
}

function dodajNovaBeleska() {
    const naslov = document.getElementById('noteTitle').value;
    const sodrzina = document.getElementById('noteContent').value;
    if (naslov === "") { alert("Внеси наслов!"); return; }
    let beleski = vcitajBeleski();
    beleski.push({ naslov, sodrzina });
    localStorage.setItem('moiteBeleski', JSON.stringify(beleski));
    prikaziLista();
    document.getElementById('noteTitle').value = "";
    document.getElementById('noteContent').value = "";
}

function zacuvajIzmeni() {
    if (selektiranaIndeks === null) { alert("Прво избери белешка од листата лево!"); return; }
    let beleski = vcitajBeleski();
    beleski[selektiranaIndeks].naslov = document.getElementById('noteTitle').value;
    beleski[selektiranaIndeks].sodrzina = document.getElementById('noteContent').value;
    localStorage.setItem('moiteBeleski', JSON.stringify(beleski));
    prikaziLista();
    alert("Белешката е зачувана!");
}

prikaziLista();