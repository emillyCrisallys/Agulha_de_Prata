import express from 'express'
import sequelize from './config/database'
import userRoutes from './routes/userRoutes'

const app = express()
const port = 3000

app.use(express.json())
app.use(userRoutes)




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