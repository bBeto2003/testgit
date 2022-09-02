class Producto {
    constructor(codigo,nombre, precio, cantidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.hijoIzquierdo = null;
        this.hijoDerecho = null;
    }
    texto() {
        return this.codigo + "(" + this.cantidad + ") " + this.nombre;
    }
    textoHtml() {
        return `<p>${this.codigo}:${this.nombre}${this.precio}${this.cantidad}</p>`;
    }
}
class BinaryTree {
    constructor() {
        this.raiz = null;
    }
    agregar(nuevo) {
        if (this.raiz == null)
            this.raiz = nuevo;
        else
            this._agregate(nuevo, this.raiz);
    }
    _agregate(nuevo, nodox) {
        if (nuevo.codigo < nodox.codigo)
            if (nodox.hijoIzquierdo == null)
                nodox.hijoIzquierdo = nuevo;
            else
                this._agregate(nuevo, nodox.hijoIzquierdo);
        else
        if (nodox.hijoDerecho == null)
            nodox.hijoDerecho = nuevo;
        else
            this._agregate(nuevo, nodox.hijoDerecho);



    }
    inOrder() {
        if (this.raiz == null)
            return " ";
        else
            return this._InOrderRec(this.raiz);
    }
    postOrder() {
        if (this.raiz == null)
            return " ";
        else
            return this._PostOrderRec(this.raiz);

    }
    preOrder() {
        if (this.raiz == null)
            return " ";
        else
            return this._PreOrderRec(this.raiz);

    }
    
    _InOrderRec(nodox) {
        let info = " ";
        if (nodox.hijoIzquierdo != null)
            info += this._InOrderRec(nodox.hijoIzquierdo);
        info += nodox.codigo;
        if (nodox.hijoDerecho != null)
            info += this._InOrderRec(nodox.hijoDerecho);
        return info;
    }
    
  
    _PostOrderRec(nodox) {
        let info = " ";
        if (nodox.hijoIzquierdo != null)
            info +=   this._PostOrderRec(nodox.hijoIzquierdo)+"-";
        if (nodox.hijoDerecho != null)
            info +=  this._PostOrderRec(nodox.hijoDerecho)+"-";
        info += nodox.codigo;
        return info;
    }
    _PreOrderRec(nodox) {
        let info = nodox.codigo;
        if (nodox.hijoIzquierdo != null) {
            info += "-" + this._PreOrderRec(nodox.hijoIzquierdo);
        }
        if (nodox.hijoDerecho != null) {
            info += "-" + this._PreOrderRec(nodox.hijoDerecho);
        }
        return info;


    }
    
    buscar(codigo){
        if(this.raiz==null){
          return null;
        }else if(this.raiz.codigo==codigo){
          return this.raiz;
        }
        else{
          return this._Buscar(codigo,this.raiz);
        }
      }
    _Buscar(codigo,nodox) {
        if (codigo<nodox.codigo){
            if(nodox.hijoIzquierdo==null){
              return null;
            }else if (nodox.hijoIzquierdo.codigo==codigo){
              return nodox.hijoIzquierdo;
            }else{
                return this._Buscar(codigo,nodox.hijoIzquierdo);
            }
          }else{
            if(nodox.hijoDerecho==null){
              return null;
            }else if(nodox.hijoDerecho.codigo==codigo){
              return nodox.hijoDerecho;
            }else{
              return this._Buscar(codigo,nodox.hijoDerecho);
            }
          }
    }
    
   /*
    Buscar(codigo, nodox = this.raiz) {
        while (nodox != null) {
            if (nodox.codigo === codigo)
                return nodox;

            if (codigo < nodox.codigo) {
                return this.Buscar(codigo, nodox = nodox.hijoIzquierdo)
            }
            if (codigo > nodox.codigo) {
                return this.Buscar(codigo, nodox = nodox.hijoDerecho)
            }
        }
        return null;
    }
    */

}


let arbol = new BinaryTree();
const btnagregar = document.getElementById('btnagregar');
btnagregar.addEventListener("click", () => {
    let codigo = document.getElementById("txtcodigo").value;
    //codigo = parseInt(codigo);
    let nombre = document.getElementById("txtnombre").value;
    let precio = document.getElementById("txtprecio").value;
    let cantidad = document.getElementById("txtcantidad").value;
    let producto = new Producto(codigo, nombre, precio, cantidad);
    arbol.agregar(producto);
    let detalles = document.getElementById('detalles');
    detalles.innerHTML += '<p>Se ha añadido</p>' + nombre;

})
const Buscar = document.getElementById('btnbuscar');
Buscar.addEventListener('click', () => {
    let codigo =  Number(document.getElementById('txtcodigo').value);
    let detalles = document.getElementById('detalles');
    let res = arbol.buscar(codigo);
   
    if (res == null)
        detalles.innerHTML = '<p>No existe el buscado</p>';
    else {
        detalles.innerHTML = `<p>Si existe </p>` ;
        detalles.innerHTML +=res.textoHtml();

    }
});

const inorder = document.getElementById("btninorder");
inorder.addEventListener("click", () => {
    let info = document.getElementById('detalles');
    
    let resultado = arbol.inOrder();
    info.innerHTML += 'Inorder';
    info.innerHTML += '<p>' + resultado + '<br></p>';
})




const posorder = document.getElementById("btnposorder");
posorder.addEventListener("click", () => {
    let info = document.getElementById('detalles');
    
    let resultado = arbol.postOrder();
    info.innerHTML += 'Postorder';
    info.innerHTML += '<p>' + resultado + '<br></p>';
})
const preorder = document.getElementById("btnpreorder");
preorder.addEventListener("click", () => {
    let info = document.getElementById('detalles');
    
    let resultado = arbol.preOrder();
    info.innerHTML += 'Preorder';
    info.innerHTML += '<p>' + resultado + '<br></p>';
})