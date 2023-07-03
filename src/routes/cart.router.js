import { Router } from "express"
import cartManager from "../managers/cartManager"

const router = Router()

const path = "./src/files/cart.json"
const handleCarts = new cartManager(path)
let allCarts = []

const getAllCarts = async() => {
    try {
        allCarts = await handleCarts.getCarts()
    } catch (error) {
        console.log(error)
    }
} 
getAllCarts()

router.get("/:cid", async(req, res) => {
    const cartId = req.params.id
    const cart = await handleProducts.getProductById(cartId)
    res.send(cart)
})

router.post("/", async(req, res) => {
    const cart = req.body 
    await handleProducts.addProduct(cart)
    res.send({status: "success", messagge: "product added"})
})

router.post("/:cid/product/:pid", async(req, res) => {
    const cart = req.body 
    await handleProducts.addProduct(cart)
    res.send({status: "success", messagge: "product added"})
})

export default router