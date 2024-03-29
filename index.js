const { response } = require('express')
const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())


const users = []

const chekUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    
    if (index < 0) {
        return response.status(404).json({ erro: "User not found" })
    }

    request.usersIndex = index
    request.usersId = id
    next()
}

app.get('/users', (request, response) => {

    return response.json(users)
})


app.post('/users', (request, response) => {
    
    try {  
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }
    
    users.push(user)

    return response.status(201).json(user)
}
    catch (err) {
        return response.status(500).json({error: err.message})
    }
})


app.put('/users/:id', chekUserId , (request, response) => {
    const index = request.usersIndex
    const id = request.usersId
    const {name, age} = request.body

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)
})


app.delete('/users/:id', chekUserId , (request, response) => {
    const index = request.usersIndex
    const id = request.usersId
    users.splice(index, 1)

    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`servidor iniciando na porta ${port} 😎`)
})