import express from 'express'
import cors from 'cors'
import {
  getAllBlogs, getBlog, createBlog, deleteBlog, editBlog, notImplemented,
} from './db.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

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
  const { title, content, image64 } = req.body

  try {
    const result = await createBlog(title, content, image64)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

app.put('/blogs/:id', async (req, res) => {
  const { id } = req.params
  const { newTitle, newContent } = req.body

  try {
    const result = await editBlog(id, newTitle, newContent)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
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

app.all('/blogs', (req, res) => {
  notImplemented()
})

app.listen(port, () => {
})
