window.onload = function () {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Moomin "El espíritu del fuego" Mug - Arabia',
            precio: 1799,
            imagen: 'img/fire-spirit-arabia.jpg'
        },
        {
            id: 2,
            nombre: 'Moomintroll Mug - Arabia',
            precio: 1799,
            imagen: 'img/mug1-1.jpg'
        },
        {
            id: 3,
            nombre: 'Moomin "Fiel a sus orígenes - Duerme Bien" Mug - Arabia',
            precio: 1799,
            imagen: 'img/mug4-1.jpg'
        },
        {
            id: 4,
            nombre: 'Moomin Together Mug Summer 2021 - Arabia',
            precio: 1799,
            imagen: 'img/mugSummer2.jpg'
        },
        {
            id: 5,
            nombre: 'Edicion Especial Moomin Mug by Arabia - In the Mountains',
            precio: 2100,
            imagen: 'img/specialEdition-mug3.jpg'
        },
        {
            id: 6,
            nombre: 'Edicion Especial Moomin Mugs 2-pack - Arabia',
            precio: 3299,
            imagen: 'img/specialEdition-2mugs.jpg'
        },
        {
            id: 7,
            nombre: 'Snorkmaiden Mug 3,7 dl - Muurla',
            precio: 1399,
            imagen: 'img/mug2-1.jpg'
        },
        {
            id: 8,
            nombre: 'Moomin "The Island" Mug 3,7dl - Muurla',
            precio: 1399,
            imagen: 'img/mug5.jpg'
        },
        {
            id: 9,
            nombre: 'Moomin Vaso Termino 0,4 l verdes oscuro - Stelton',
            precio: 2999,
            imagen: 'img/vaso-termico1.jpg'
        },
        {
            id: 10,
            nombre: 'Moomin Vaso Termino 0,4 l gris claro - Stelton',
            precio: 2999,
            imagen: 'img/vaso-termico2.jpg'
        },
        {
            id: 11,
            nombre: 'Lata de té verde Moomintroll "Arándano" - Teministeriet',
            precio: 899,
            imagen: 'img/tea1.jpg'
        },
        {
            id: 12,
            nombre: 'Lata de té Snorkmaiden "Frutos Rojos" - Teministeriet',
            precio: 899,
            imagen: 'img/tea2.jpg'
        },
        {
            id: 13,
            nombre: 'Lata de té verde Moomintroll "Chokeberries" - Teministeriet',
            precio: 899,
            imagen: 'img/tea3.jpg'
        },
        {
            id: 14,
            nombre: 'Moomin Together Plate Summer 2021 - Arabia',
            precio: 2499,
            imagen: 'img/plate.jpg'
        },
        {
            id: 15,
            nombre: 'Snorkmaiden Cuchara Cafe Together Summer 2021 – Hackman',
            precio: 1199,
            imagen: 'img/spoon1.jpg'
        },
        {
            id: 16,
            nombre: 'Moominpappa Cuchara Cafe Together Summer 2021 – Hackman',
            precio: 1199,
            imagen: 'img/spoon2.jpg'
        },
        {
            id: 17,
            nombre: 'Together Summer 2021 Bandeja Redonda 31cm - Opto Design',
            precio: 1699,
            imagen: 'img/bandeja1.jpg'
        },
    ];

    let carrito = [];
    let total = 0;
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones

   //Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const contenedor = document.createElement('div');
            contenedor.classList.add('card', 'col-sm-4');

            // Body
            const body = document.createElement('div');
            body.classList.add('card-body');

            // Titulo
            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = info.nombre;

            // Precio
            const precio = document.createElement('p');
            precio.classList.add('card-text');
            precio.textContent =  '$'+ info.precio;

            // Imagen
            const imagen = document.createElement('img');
            imagen.classList.add('img-fluid');
            imagen.setAttribute('src', info.imagen);
            
            // Boton 
            const boton = document.createElement('button');
            boton.classList.add('btn', 'btn-primary');
            boton.textContent = 'Comprar';
            boton.setAttribute('marcador', info.id);
            boton.addEventListener('click', addToCart);
            
            // Agrega
            body.appendChild(imagen);
            body.appendChild(title);
            body.appendChild(precio);
            body.appendChild(boton);
            contenedor.appendChild(body);
            DOMitems.appendChild(contenedor);
        });
    }

    
    //Evento para añadir un producto al carrito de la compra
    function addToCart(evento) {
        carrito.push(evento.target.getAttribute('marcador'))

        calcularTotal(); 
        renderCarrito();
        guardarEnLocalStorage();
    }

   // Dibuja todos los productos guardados en el carrito
    function renderCarrito() {
        DOMcarrito.textContent = '';
        const carritoSimple = [...new Set(carrito)];

        carritoSimple.forEach((item) => {
            const miCompra = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const cantidadItems = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            
            const contenedor = document.createElement('li');
            contenedor.classList.add('list-group-item', 'text-right', 'mx-2');
            contenedor.textContent = `${cantidadItems} x ${miCompra[0].nombre} - ${miCompra[0].precio}$`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;

            miBoton.addEventListener('click', borrarItemCarrito);
            contenedor.appendChild(miBoton);
            DOMcarrito.appendChild(contenedor);
        });
    }

    
    //Evento para borrar un elemento del carrito
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });

        renderCarrito();
        calcularTotal();
        guardarEnLocalStorage();

    }

    
    //Calcula el precio total teniendo en cuenta los productos repetidos
    function calcularTotal() {
        total = 0;
        carrito.forEach((item) => {
            const miCompra = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            total = total + miCompra[0].precio;
        });
        
        DOMtotal.textContent = total.toFixed(2);
    }

    
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        renderCarrito();
        calcularTotal();
        // Borra LocalStorage
        localStorage.clear();

    }

    function guardarEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarDeLocalStorage () {
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarDeLocalStorage();
    renderizarProductos();
    calcularTotal();
    renderCarrito();
       
    
    
    //FORMULARIO
    function validaForm(){
        // Campos de texto
        if($("#nombre").val() == ""){
            swal("El campo Nombre no puede estar vacío.");
            $("#nombre").focus();      
            return false;
        }
        if($("#direccion").val() == ""){
            swal("El campo Dirección no puede estar vacío.");
            $("#direccion").focus();
            return false;
        }
        if($("#consulta").val() == ""){
            swal("El campo Consulta no puede estar vacío.");
            $("#consulta").focus();
            return false;
        }
        // Checkbox
        if(!$("#info").is(":checked")){
            swal("Debe confirmar que es mayor de 18 años.");
            return false;
        }
        
        return true; 
    }


    $(document).ready( function() {   
        $("#botonenviar").click( function() {     
            if(validaForm()){                           
                $.post("enviar.php",$("#formdata").serialize(),function(res){
                    $("#formulario").fadeOut("slow");   
                    if(res == 1){
                        $("#exito").delay(500).fadeIn("slow");      
                    } else {
                        $("#fracaso").delay(500).fadeIn("slow");    
                    }
                });
            }
        });    
    });

    // ANIMACIONES DEL INICIO
    gsap.from(".logo", { opacity: 0, duration: 1, delay: 0.5, y: -10 });

    gsap.from(".hamburger", { opacity: 0, duration: 1, delay: 1, x: 20 });

    gsap.from(".hero-img", { opacity: 0, duration: 1, delay: 1.5, x: -200 });

    gsap.from(".hero-content h3", { opacity: 0, duration: 1, delay: 1, y: -50 });

    gsap.from(".hero-content h2", { opacity: 0, duration: 1, delay: 1, y: -45 });

    gsap.from(".hero-content a", { opacity: 0, duration: 1, delay: 1.5, y: 50 });

    gsap.from(".hero-content p", { opacity: 0, duration: 1, delay: 1.5, y: 50 });

        
    // EFECTO EN NAVBAR
    const navBar = document.querySelector(".nav");
    const navHeight = navBar.getBoundingClientRect().height;

    window.addEventListener("scroll", () => {
        const scrollHeight = window.pageYOffset;
        if (scrollHeight > navHeight) {
            navBar.classList.add("fix-nav");
        } else {
        navBar.classList.remove("fix-nav");
        }
    });
        
    // SCROLL 
    const links = [...document.querySelectorAll(".scroll-link")];
    links.map(link => {
    if (!link) return;
    link.addEventListener("click", e => {
        e.preventDefault();
        
        const id = e.target.getAttribute("href").slice(1);
        
        const element = document.getElementById(id);
        const fixNav = navBar.classList.contains("fix-nav");
        let position = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: position,
            left: 0,
        });
        
        navBar.classList.remove("show");
        menu.classList.remove("show");
        document.body.classList.remove("show");
        });
    });

}

    