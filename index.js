import express, { response } from 'express'
import {  } from 'dotenv/config'
import cors from 'cors'
import {
  getAllBlogs, getBlog, createBlog, deleteBlog, editBlog, login, notImplemented,
} from './db.js'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())


app.get('/pizza.txt', async(req, res) => {
  res.status(200)
  const responseBody = {"name": await getAllBlogs(), "Age": 19}
  res.json(responseBody)
})


app.get('/blogs', async (req, res) => {
  try {
    const blogs = await getAllBlogs()
    res.json(blogs)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

app.get('/blogs/:id', async (req, res) => {
  const { id } = req.params

  try {
    const blog = await getBlog(id)
    res.json(blog)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

app.post('/blogs', async (req, res) => {
  console.log(`[REQUEST] /blogs { ${JSON.stringify(req.body)} }`)
  const { title, content, image64 } = req.body

  try {
    const result = await createBlog(title, content, image64)
    console.log(`[RESPONSE] /blogs { ${JSON.stringify(result)} }`)
    res.json({success: true, result})
  } catch (error) {
    console.error('ERROR EN EL CATCH', error)
    res.status(error.status || 500).json({ message: error.message, success: false })
  }
})



app.delete('/blogs/:id', async (req, res) => {
  const { id } = req.params

  try {
    const result = await deleteBlog(id)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})


app.put('/blogs/:id', async (req, res) => {
  const  id  = req.params.id
  const { title, content, image64 } = req.body
  
  try {
    const result = await editBlog(id, title, content, image64)
    res.json(result)
    console.log('CHANGED ELEMENT')
    console.log(response)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
    console.log('Error la API',error)
  }
})

app.post('/login', async (req, res) => {
  const { user, password } = req.body

  try {
    const result = await login(user, password)
    res.json(result)
    console.log(result)
  } catch (error) {
    console.log('Error en el CATCH login', error)
    res.status(error.status || 500).json({ message: error.message })
  }
})



app.all('/blogs', (req, res) => {
  notImplemented()
})



app.listen(port, () => {
})
