import express from 'express'
import { getAllBlogs, getBlog  ,createBlog, deleteBlog, editBlog, notImplemented} from './db.js'




const app = express()
const port = 3000


app.use(express.json())


app.get('/blogs', async (req, res) => {
  try {
      const blogs = await getAllBlogs();
      res.json(blogs);
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
  }
});

app.get('/blogs/:id', async (req, res) => {
  const id = req.params.id;

  try {
      const blog = await getBlog(id);
      res.json(blog);
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
  }
});

app.post('/blogs', async (req, res) => {
  const { title, content } = req.body;

  try {
      const result = await createBlog(title, content);
      res.json(result);
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
  }
});

app.put('/blogs/:id', async (req, res) => {
  const id = req.params.id;
  const { newTitle, newContent } = req.body;

  try {
      const result = await editBlog(id, newTitle, newContent);
      res.json(result);
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
  }
});

app.delete('/blogs/:id', async (req, res) => {
  const id = req.params.id;

  try {
      const result = await deleteBlog(id);
      res.json(result);
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
  }
});

// Manejar métodos no implementados
app.all('/blogs', (req, res) => {
  notImplemented();
});

// Escuchar en el puerto
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});