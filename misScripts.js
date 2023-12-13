// VARIABLES
let selector = document.getElementById('miSelector');   
let lista = document.getElementById('miLista');
let input = document.getElementById('miInput');
let boton = document.getElementById('miBoton');

let archivo = 'peliculas.json'; // variable que va aparecer por defecto

//ESCUCHADORES  DE EVENTOS
selector.addEventListener('change', cambiarArchivo)// Chage es un evento propio de los selectores
selector.addEventListener('cambioModo', mensajeModo);
input.addEventListener('keydown', verificarInput);
boton.addEventListener('click', buscar);


//FUNCIONES 
function cambiarArchivo(){
    archivo = selector.value;
    let evento = new CustomEvent('cambioModo');// Se crea evento personalizado
    selector.dispatchEvent(evento);// se dispara el evento
}

function mensajeModo(){
    alert('El archivo de busqueda ahora es ' + selector.value);
}

function verificarInput(evento){
    if((evento.keyCode < 65 || evento.keyCode > 90) && evento.keyCode != 32 && evento.keyCode != 8){
        evento.preventDefault();
    }
}

function buscar(){
    lista.innerHTML = "";// Cada vez que presione el boton este quedara vacio

    fetch(archivo)
    .then(respuesta => respuesta.json())
    .then(function(salida){
        for(let item of salida.data){
            if(item.nombre.startsWith(input.value.toUpperCase())){
                let p = document.createElement('p');
                p.id = item.nombre;
                p.innerHTML = item.sinopsis;// se le agrega al parrafo el contenido de la sinopsis
                p.style.display = 'none';// Aparecen los archivos sin la sinopsis

                let li = document.createElement('li');
                li.innerHTML = item.nombre;
                li.addEventListener('mouseover', function(){
                    let p = document.getElementById(item.nombre);
                    p.style.display = 'block';
                })

                li.addEventListener('mouseout', function(){
                    let p = document.getElementById(item.nombre);
                    p.style.display = 'none';
                })

                li.appendChild(p);
                lista.appendChild(li);
            }
        }
    })  
    .catch(function(error){
        console.log(error);
    })
}