
import fs from "fs"

export default class cartManager {
    constructor(path){
        this.path = path
    } 

    //metodo para agregar nuevo carrito
    addCart = async(cart) => {
        try {
            //llama al metodo getProd y guarda array de todos los prod. en allProducts
            const allCarts = await this.getCarts()

            //crea el objeto base del producto a añadir, parámetros a completar cuando se llame al metodo. 
            const newCart = cart
            //busca el code del nuevo producto y lo guarda
            const newCartCode = newCart.code
            //.some devuelve true o false, busca si hay otro producto con el mismo code en el array.
            const codeFilter = allCarts.some(product => product.code === newCartCode)

            //si no existe un prod. con el mismo code y estan todos los campos completos,
            //le autoasigna un id autoincrementable y lo pushea al array de productos.
            if (!codeFilter 
                && newCart.products
                ) {
                if (allCarts.length === 0) {
                    newCart.id = 1
                } else {
                    ///////accedo al id del ultimo elemento del array y lo incremento en uno.
                    newCart.id = allCarts[allCarts.length - 1].id + 1
                } 
                allCarts.push(newCart)
                //el nuevo array con el producto agregado se sobreescribe al archivo json y lo actualiza
                await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, '\t'));
           }
        } catch (error) {
            console.log(error);
        }
    }

    //metodo para obtener todos los productos
    getCarts = async () => {
        try {
            //chequea si existe un archivo con la ruta que le paso por parametro
            //pasa el texto formato json para que pueda ser leido 
            //retorna el array con todos los productos
          if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const allCarts = JSON.parse(data);
            return allCarts;
          } else {
            ///si no encuentra el archivo retorna "caca"
            return "caca";
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      }
    
    getCartById = async(idCart) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const allCarts = await JSON.parse(data);

                const idFilter = allCarts.find(cart => idCart == cart.id)
                return idFilter[products]
                /////retorna solo el array con productos del carrito
                ////agregar return en caso de error
            } 
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async(id, field) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8")
                const allProducts = await JSON.parse(data)

                const productIndex = allProducts.findIndex(item => item.id = id)
                if (productIndex === -1) {
                    console.log("El producto no existe")
                    return;
                }

                allProducts[productIndex][field] = "nuevo valor"

                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'))
            }
        } catch(error) {
            console.log(error)
        }
    }

    deleteProduct = async(id) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8")
                const allProducts = await JSON.parse(data)

                const productIndex = allProducts.findIndex(item => item.id = id)

                if (productIndex === -1) {
                    console.log("El producto no existe")
                    return;
                } else {
                    allProducts.splice(productIndex, 1)
                }

                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'))
            }
        }  catch(error) {
            console.log(error)
        }
    }
}

