import express from "express"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

const port = 8088

app.listen(port, () => console.log("levantando puerto 3000"))