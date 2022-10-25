let carritoDeCompras=[]

const contenedorProductos=document.getElementById(`contenedor-productos`)
const contenedorCarrito=document.getElementById(`contenedor-carrito`)
const contadorCarrito=document.getElementById(`contadorCarrito`);
const precioTotal=document.getElementById(`precioTotal`);
const botonVaciar=document.getElementById(`checkout`);

//------------- Mostrar Prducto

function mostrarproducto(){
    stockproductos.forEach(item =>{
        let div=document.createElement("div")
        div.className="producto"
        div.innerHTML=`<div class="card">			
        <div class="col-md-4">
            <div class="product-item">
                <div class="product-thumb">
                    <span class="bage">Sale</span>
                    <img class="img-responsive" src="${item.img}" />
                    <div class="preview-meta">
                        <ul>
                            <span  data-toggle="modal" data-target="#product-modal">
                            </span>
                            <li>
                                <a href="#!" id="botonAgregar${item.id}"><i class="tf-ion-android-cart"></i></a>
                            </li>
                        </ul>
                      </div>
                </div>
                <div class="product-content">
                    <h4><a href="product-single.html">${item.producto}</a></h4>
                    <p class="price">$${item.precio}</p>
                    <p class="stock" id="descontarStock">Disponibles ${item.stock}</p>
                </div>
            </div>`
        contenedorProductos.appendChild(div)
        let btnAgregar = document.getElementById(`botonAgregar${item.id}`)
        btnAgregar.addEventListener(`click`,()=>{
            agregarAlCarrito(item.id);
        })        
    })
}

mostrarproducto()

//------------- Agregar al carrito

function agregarAlCarrito(id){
    let existe= carritoDeCompras.find(produc => produc.id == id)
    if (existe){
        existe.cantidad= existe.cantidad + 1
        document.getElementById(`cant${existe.id}`).innerHTML=`<p id="cant${existe.id}">Cantidad ${existe.cantidad}</p>`
        actualizarCarrito()  
    }
    else{
        let productoAgregar = stockproductos.find(item=> item.id==id)
        productoAgregar.cantidad= 1
        carritoDeCompras.push(productoAgregar);
        mostrarCarrito(productoAgregar);
        actualizarCarrito() 
    }    
}

//------------- Mostrar carrito

function mostrarCarrito(productoAgregar){
    actualizarCarrito()
    let div=document.createElement("div")
    div.className="productoEnCarrito"
    div.innerHTML=`<div class="media">
      <a class="pull-left" href="#!">
          <img class="media-object" src="${productoAgregar.img}" alt="image" />
      </a>							  
      <div class="media-body">
          <h4 class="media-heading"><a href="#!">${productoAgregar.producto}</a></h4>
          <div class="cart-price">
         <h5><strong>$${productoAgregar.precio}</strong></h5>
         <p id="cant${productoAgregar.id}">Cantidad ${productoAgregar.cantidad}</p>
      </div>
    </div>
      <a href="#!" class="remove" id ="Eliminar${productoAgregar.id}"><i class="tf-ion-close"></i></a>
      </div>`
    contenedorCarrito.appendChild(div)
    guardarStorage()
    let btnEliminar= document.getElementById(`Eliminar${productoAgregar.id}`)
    btnEliminar.addEventListener(`click`,()=>{
        if(productoAgregar.cantidad==1){
            carritoDeCompras = carritoDeCompras.filter(item => item.id !== productoAgregar.id)
            btnEliminar.parentElement.remove();
            actualizarCarrito()
            guardarStorage()
        }
       else{
        productoAgregar.cantidad= productoAgregar.cantidad - 1
        document.getElementById(`cant${productoAgregar.id}`).innerHTML=`<p id="cant${productoAgregar.id}">Cantidad ${productoAgregar.cantidad}</p>`
        actualizarCarrito()
        guardarStorage()
       }
    })
}

//------------- Actualizar carrito

function actualizarCarrito(){
    contadorCarrito.innerText= carritoDeCompras.reduce((acc,el)=>acc+el.cantidad,0)
    precioTotal.innerText=carritoDeCompras.reduce((acc,el)=>acc+el.precio*el.cantidad,0)
}

//------------- Libreria SweetAlert

document.getElementById("checkout").onclick = () => {
    if (carritoDeCompras.length>0){
    Swal.fire(
      "Tu compra fue realizada con exito!",
      "has click para continuar",
      "success"
    );}
    else{
        Swal.fire(
            "La compra no puede ser realizada",
            "Debe seleccionar un producto para realizar la compra",
            "error"
    );}
  };

//------------- Storage / JSON

  function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras))
  }

 function obtenerStorage(){
    let arrayStorage=JSON.parse(localStorage.getItem("carrito"))
    if(arrayStorage){
        for(el of arrayStorage){
        agregarAlCarrito(el.id);
        }
    }
}
obtenerStorage()

//------------------Vaciar Carrito

botonVaciar.addEventListener("click", () => {
    carritoDeCompras.forEach((item) => (item.cantidad = 1));
    carritoDeCompras.length = 0;
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
  });
