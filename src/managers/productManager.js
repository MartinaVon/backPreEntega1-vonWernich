
import fs from "fs"

export default class productManager {
    constructor(path){
        this.path = path
    } 

    //metodo para agregar producto - asincrono.
    addProduct = async(product) => {
        try {
            //llama al metodo getProd y guarda array de todos los prod. en allProducts
            const allProducts = await this.getProducts()

            //crea el objeto base del producto a añadir, parámetros a completar cuando se llame al metodo. 
            const newProduct = product

            //busca el code del nuevo producto y lo guarda
            const newProductCode = newProduct.code
            //.some devuelve true o false, busca si hay otro producto con el mismo code en el array.
            const codeFilter = allProducts.some(product => product.code === newProductCode)

            //si no existe un prod. con el mismo code y estan todos los campos completos,
            //le autoasigna un id autoincrementable y lo pushea al array de productos.
            if (!codeFilter 
                && newProduct.title 
                && newProduct.description 
                && newProduct.price 
                && newProduct.status
                && newProduct.categorie
                && newProduct.code 
                && newProduct.stock) {
                if (allProducts.length === 0) {
                    newProduct.id = 1
                } else {
                    ///////accedo al id del ultimo elemento del array y lo incremento en uno.
                    newProduct.id = allProducts[allProducts.length - 1].id + 1
                } 
                allProducts.push(newProduct)
                //el nuevo array con el producto agregado se sobreescribe al archivo json y lo actualiza
                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'));
           }
        } catch (error) {
            console.log(error);
        }
    }

    //metodo para obtener todos los productos
    getProducts = async () => {
        try {
            //chequea si existe un archivo con la ruta que le paso por parametro
            //pasa el texto formato json para que pueda ser leido 
            //retorna el array con todos los productos
          if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const allProducts = JSON.parse(data);
            return allProducts;
          } else {
            ///si no encuentra el archivo retorna "caca"
            return "caca";
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      }
    
    getProductById = async(idProducto) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const allProducts = await JSON.parse(data);

                const idFilter = allProducts.find(product => idProducto == product.id)
                return idFilter
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

