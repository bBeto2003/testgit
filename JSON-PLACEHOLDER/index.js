fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => response.json())
    .then(json => {
        let menu = document.getElementById('mnuUsers');
        let opciones = '';
        for (let i = 0; i < json.length; i++) {
            opciones += `<option value='${json[i].id}'>${json[i].username}</option>`;
        }
        menu.innerHTML = opciones;

    })

const menu = document.getElementById('mnuUsers');
menu.addEventListener("change", () => {
    //console.log(mnuUsers.value);
    fetch('https://jsonplaceholder.typicode.com/users/' + menu.value)
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })



})
const btnPost = document.getElementById("btnPosts");
btnPost.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=' + menu.value)
        .then((response) => response.json())
        .then((json) => {
            let divpost = document.getElementById('posts');
            let datos = '';
            json.forEach(pub => {
                datos += `
                    <div class="divpost" id="pub${pub.id}">
                    <h2>${pub.title}</h2>
                    <p>${pub.body}</p>
                    <button type="button" class="boton6" onclick="Mostrar(${pub.id})">Mostar comentarios</button>
                    <div class="pcomes" id="pcom${pub.id}"></div>
                    </div> 
                `;

            })
            divpost.innerHTML = datos;
        })
});

const info = document.getElementById("infoUsers");
info.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/users/' + menu.value)
        .then((response) => response.json())
        .then((json) => {
            let a = document.getElementById("infos");
            let datos = '';

            datos += `
              <div class='datos'><p>Nombre: ${json.name}</p>
              <p>Correo: ${json.email}</p>
              <p>Nombre de usuario: ${json.username}</p>
              <p>Direccion: ${json.address.suite}</p>
              <p>Calle: ${json.address.street}</p>

              </div>
          `;
            a.innerHTML = datos;
        });

});


function Mostrar(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
        .then(response => response.json())
        .then(json => {
            let divcom = document.getElementById('pcom' + id);
            let coments = '';
            json.forEach(comment => {
                coments += `<h5>${comment.name}</h5><p>${comment.body}</p>`;
            });
            divcom.innerHTML = `${coments} <button type="button" class="boton5" onclick="Ocultar(${id})">Ocultar comentarios</button>`;
            document.getElementById("infoUsers").style.display = "block";
        });
};

function Ocultar(id) {
    let divcom = document.getElementById('pcom' + id);
    divcom.innerHTML = "";
}
