import { Router } from "express"
import productManager from "../managers/productManager.js"

const router = Router()

const path = "./src/files/allProducts.json"

//llamamos al constructor de productManager para crear uno nuevo, le pasamos por parametro el
//path del archivo json que guarda la data.
const handleProducts = new productManager(path)
let allProducts = []

//function para obtener el archivo de los productos usando el metodo getProds del constructor
//que creamos en productManager


const getAllProducts = async() => {
    try {
        allProducts = await handleProducts.getProducts()
        console.log(allProducts)
    } catch (error) {
        console.log(error)
    }
} 
getAllProducts()


router.get("/", (req, res) => {
    const limit = req.query.limit // obtiene el valor que ingreso en el query param "limit"
    const limitedProducts = limit ? allProducts.slice(0, limit) : allProducts
    // Limitar los productos según el parámetro 'limit' o devolver todos los productos
    //slice es un metodo q devuelve un nuevo array recortado. El primer parametro
    //indica el indice desde donde se comienza a contar, el otro el final. 
    //en este caso el final es el limite de numero que le pongo como query param
    res.send(limitedProducts)
})

router.get("/:id", async(req, res) => {
    const productId = req.params.id
    const product = await handleProducts.getProductById(productId)
    res.send(product)
})

router.post("/", async(req, res) => {
    const product = req.body 
    await handleProducts.addProduct(product)
    res.send({status: "success", messagge: "product added"})
})

router.put("/:id", async(req, res) => {
    const productId = req.params.id
    const field = req.body.field 
    await handleProducts.updateProduct(productId, field)
    res.send({status: "success", messagge: "product added"})
})

router.delete("/:id", async(req, res) => {
    const productId = req.params.id

    await handleProducts.deleteProduct(productId)
    res.send({status: "success", messagge: "product added"})
})


export default router