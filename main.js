/////Carrito de compras de video juegos/////

class Producto{
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

/*const juego1 = new Producto(1, "A Plaguetale Requiem" , 10000, "img/juego 1-min.jpg");
const juego2 = new Producto(2, "Gotham Knights", 12500, "img/juego 2-min.jpg" );
const juego3 = new Producto(3, "Fortnite", 18000, "img/juego 3-min.jpg" );
const juego4 = new Producto(4, "Dying Light 2", 13500, "img/juego 4-min.png" );
const juego5 = new Producto(5, "Evil Dead", 10000, "img/juego 5-min.jpg" );
const juego6 = new Producto(6, "Uncharted", 14500, "img/juego 6-min.png" )*/

//Array de productos
fetch('./data.json')
.then(response=> response.json())
.then(datos=>{
console.log(datos);



})


/// Array carrito

let carrito = [];

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-6", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card border-light mb-3">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <button class="btn colorBoton" id="boton${producto.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tu juego se agrego al carrito',
                showConfirmButton: false,
                timer: 1500
            })
        })
    })
}

//Función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarProductos();

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-6", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card border-warning mb-3">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
            Swal.fire({
                title: 'Estas seguro que quieres eliminar este producto?',
                text: "Estas por eliminar un juego del carrito!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                Swal.fire(
                    'Borrado!',
                    'Tu juego fue.',
                    'success'
                )
                }
            })
        })
    })
    calcularTotal();
}


const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach((producto) => {
        totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}