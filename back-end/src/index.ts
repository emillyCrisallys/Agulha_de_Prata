import express from 'express'
import sequelize from './config/database'
import UserModel from './models/UserModel'

const app = express()
const port = 3000


app.get('/users', async (req, res) => {
    const users = await UserModel.findAll()
    res.send(users)
})

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