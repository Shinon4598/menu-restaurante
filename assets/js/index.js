let opciones = [
    { id: 0, nombre: "Cerveza", categoria: "bebida", precio: 2.49, cantidad:0, descripcion:"Bebida refrescante y espumosa perfecta para relajarse y compartir con amigos." },
    { id: 1, nombre: "Filete de res", categoria: "cena", precio: 18.99, cantidad:0, descripcion:"Jugoso y tierno filete de res asado a la perfección." },
    { id: 2, nombre: "Hamburguesa clásica", categoria: "almuerzo", precio: 11.99, cantidad:0, descripcion:"Deliciosa hamburguesa con ingredientes frescos y sabor casero." },
    { id: 3, nombre: "Lomo de cerdo", categoria: "cena", precio: 17.99, cantidad:0, descripcion:"Tierno lomo de cerdo cocinado con especias y acompañado de guarniciones exquisitas." },
    { id: 4, nombre: "Salmón a la parrilla", categoria: "cena", precio: 15.99, cantidad:0, descripcion:"Salmón fresco a la parrilla con hierbas aromáticas y limón." },
    { id: 5, nombre: "Ensalada de atún", categoria: "almuerzo", precio: 10.49, cantidad:0, descripcion:"Ensalada saludable con atún fresco, verduras y aderezo ligero." },
    { id: 6, nombre: "Jugo de naranja", categoria: "bebida", precio: 1.99, cantidad:0, descripcion:"Jugo natural y refrescante de naranjas recién exprimidas." },
    { id: 7, nombre: "Huevos revueltos", categoria: "desayuno", precio: 8.99, cantidad:0, descripcion:"Huevos suaves y esponjosos revueltos con ingredientes al gusto." },
    { id: 8, nombre: "Café americano", categoria: "bebida", precio: 2.99, cantidad:0, descripcion:"Café negro clásico y aromático." },
    { id: 9, nombre: "Tostadas francesas", categoria: "desayuno", precio: 9.49, cantidad:0, descripcion:"Tostadas dulces y esponjosas servidas con jarabe de arce." },
    { id: 10, nombre: "Ensalada César", categoria: "almuerzo", precio: 12.99, cantidad:0, descripcion:"Ensalada clásica con lechuga romana, crutones y aderezo César." },
    { id: 11, nombre: "Croissant", categoria: "desayuno", precio: 5.99, cantidad:0, descripcion:"Croissant crujiente y hojaldrado con mantequilla." },
    { id: 12, nombre: "Pizza margarita", categoria: "cena", precio: 16.99, cantidad:0, descripcion:"Pizza tradicional con tomate, mozzarella y albahaca." },
    { id: 13, nombre: "Sushi variado", categoria: "cena", precio: 22.99, cantidad:0, descripcion:"Deliciosa selección de sushi con variedad de pescados y arroz." },
    { id: 14, nombre: "Sopa de tomate", categoria: "almuerzo", precio: 9.99, cantidad:0, descripcion:"Sopa caliente y reconfortante de tomate fresco." },
    { id: 15, nombre: "Panqueques", categoria: "desayuno", precio: 7.99, cantidad:0, descripcion:"Panqueques esponjosos servidos con mantequilla y jarabe." },
    { id: 16, nombre: "Refresco", categoria: "bebida", precio: 1.49, cantidad:0, descripcion:"Bebida carbonatada y refrescante para acompañar cualquier comida." },
  ];
  
const menuItems = document.querySelectorAll(".menu__comidas ul");
let todoMenu = document.getElementById("todo-menu");
let desayunoMenu = document.getElementById("desayuno-menu");
let almuerzoMenu = document.getElementById("almuerzo-menu");
let bebidaMenu = document.getElementById("bebida-menu");
let cenaMenu = document.getElementById("cena-menu");
let listaCarrito= document.getElementById("lista-carrito")
let carro = document.getElementById("carro");
let listaTotal = document.getElementById("lista-total")
let total=0;

function crearElementoLi(opcion) {
    return `
        <li>
            <div class="menu__imagen">
                <img src="/assets/img/imagen (${opcion.id}).webp">
            </div>
            <div class="menu__comida">
                <div class="menu__texto">
                    <h3 class="menu__nombre">${opcion.nombre}</h3>
                    <h3 class="menu__precio">Precio: $${opcion.precio.toFixed(2)}</h3>
                </div>
                <p>${opcion.descripcion}<p>
                <button onclick="agregarAlCarrito(${opcion.id})">Agregar al carrito</button>
            </div>
        </li>
    `;
}
let todo= opciones.forEach((comida) => {
    const li= crearElementoLi(comida);
    todoMenu.innerHTML += li;
} )
//Desayuno
let desayuno = opciones.filter( comida => comida.categoria === "desayuno");
desayuno.forEach((comida) => {
    const li= crearElementoLi(comida);
    desayunoMenu.innerHTML += li;
})
desayunoMenu.style.display="none";

//Almuerzo
let almuerzo = opciones.filter( comida => comida.categoria === "almuerzo");
almuerzo.forEach((comida) => {
    const li= crearElementoLi(comida);
    almuerzoMenu.innerHTML += li;
})
almuerzoMenu.style.display="none"
//Cena
let cena = opciones.filter( comida => comida.categoria === "cena");
cena.forEach((comida) => {
    const li= crearElementoLi(comida);
    cenaMenu.innerHTML += li;

})
cenaMenu.style.display="none"
//Bebidas
let bebida = opciones.filter( comida => comida.categoria === "bebida");
bebida.forEach((comida) => {
    const li= crearElementoLi(comida);
    bebidaMenu.innerHTML += li;
})
bebidaMenu.style.display="none"
//Botones
function filtrarMenu(categoria) {
    menuItems.forEach((ul) =>{
        if(ul.id === `${categoria}-menu`){
            ul.style.display="grid";
        } else {
            ul.style.display= "none";
        }
    })
}
document.getElementById("btn-todo").addEventListener("click", () => {
    filtrarMenu("todo")
})
document.getElementById("btn-desayuno").addEventListener("click", () => {
    filtrarMenu("desayuno")
})
document.getElementById("btn-almuerzo").addEventListener("click", () => {
    filtrarMenu("almuerzo")
})
document.getElementById("btn-bebida").addEventListener("click", () => {
    filtrarMenu("bebida")
})
document.getElementById("btn-cena").addEventListener("click", () => {
    filtrarMenu("cena")
})
function eliminarProductoCarrito(id){
    const producto = opciones.find(e => e.id === id);
    if (producto.cantidad > 0) {
        producto.cantidad--;
        total -= producto.precio; // Restamos el precio del producto eliminado del total
        actualizarCarrito(); // Actualizamos el carrito con el nuevo total
    }
}
function actualizarCarrito() {
    listaCarrito.innerHTML="";
    total = 0;
    opciones.forEach(opcion => {
        if (opcion.cantidad > 0) {
            const li = document.createElement("li");
            li.classList="cantidad-producto";
            const p= document.createElement("p");
            //Boton Eliminar
            const botonEliminar = document.createElement("button");
            botonEliminar.textContent="x";
            botonEliminar.addEventListener("click", ()=>{
                eliminarProductoCarrito(opcion.id);
            })
            //Nombre y precio del producto
            li.appendChild(botonEliminar)
            p.textContent=`${opcion.nombre} - ${(opcion.precio * opcion.cantidad).toFixed(2)}`
            li.appendChild(p)
            //total
            total+= opcion.precio * opcion.cantidad;
            listaCarrito.appendChild(li);
            
        }
    })
    total = parseFloat(total.toFixed(2))
    listaTotal.textContent="";
    listaTotal.textContent=`Total= ${total}`;
}
//Carrito de compras
function agregarAlCarrito(id) {
    const producto = opciones.find(e => e.id === id);
    producto.cantidad++;
    actualizarCarrito();
}
//limpiar carrito
function limpiarCarrito() {
    listaCarrito.innerHTML="";
    opciones.forEach(opcion => {
        opcion.cantidad = 0;
    })
    actualizarCarrito();
}
//mostrar carrito
function mostrarCarrito() {
    carro.classList.toggle("show")
}