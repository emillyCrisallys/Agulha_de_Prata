import express from 'express'
import sequelize from './config/database'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import inventoryRoutes from './routes/inventoryRoutes'
import cartRoutes from './routes/cartRoutes';
import loginRoutes from './routes/loginRoutes'
import './models/associations';


const app = express()
const port = 3000

app.use(express.json())
app.use(userRoutes)
app.use(productRoutes)
app.use(inventoryRoutes)
app.use(cartRoutes)
app.use(loginRoutes)



sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Database connected successfully')
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error)   
    })

app.listen(port, () => {
    console.log('Server is running on port', port)
})