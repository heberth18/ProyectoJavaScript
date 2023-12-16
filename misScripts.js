// VARIABLES
let selector = document.getElementById('miSelector');   
let lista = document.getElementById('miLista');
let input = document.getElementById('miInput');
let boton = document.getElementById('miBoton');

let archivo = 'peliculas.json'; // variable que va aparecer por defecto

//ESCUCHADORES  DE EVENTOS
selector.addEventListener('change', cambiarArchivo)
selector.addEventListener('cambioModo', mensajeModo);
input.addEventListener('keydown', verificarInput);; 
boton.addEventListener('click', buscar);    


//FUNCIONES 
function cambiarArchivo(){
    archivo = selector.value;
    let evento = new CustomEvent('cambioModo');// Se crea evento personalizado
    selector.dispatchEvent(evento);
}

function mensajeModo(){
    alert('El archivo de busqueda ahora es ' + selector.value);
}

function verificarInput(evento){
    if((evento.keyCode < 65 || evento.keyCode > 90) && evento.keyCode != 32 && evento.keyCode != 8){
        evento.preventDefault();
    }

    if(evento.key === "Enter"){
        buscar();
    }

}


function buscar(){
    lista.innerHTML = "";

    fetch(archivo)
    .then(respuesta => respuesta.json())
    .then(function(salida){

        let seEncontroCoincidencia = false;

        for(let item of salida.data){
            console.log('Item For:', item.nombre);

            if(item.nombre.startsWith(input.value.toUpperCase())){
            

                seEncontroCoincidencia = true;

                console.log("Este es el if");
                let p = document.createElement('p');
                p.id = item.nombre;
                p.innerHTML = item.sinopsis;
                p.style.display = 'none';

                let li = document.createElement('li');
                console.log("Creando lista");
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
                console.log("Hijos");
                lista.appendChild(li);
                
            }
        }
        
        if(!seEncontroCoincidencia){
            console.log("No se encontraron coincidencias")
            alert( '"'+input.value+'"' + " no se encuentra en cartelera");
        }

    })  
    .catch(function(error){
        console.log('Error', error);
    })
}