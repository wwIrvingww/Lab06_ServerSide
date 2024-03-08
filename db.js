import conn from './connection.js'

export async function getAllBlogs() {
  try {
    const [rows] = await conn.query('SELECT * FROM blogs')
    return rows
  } catch (e) {
    console.error(e)
    throw { status: 500, message: 'Error contacting the database or a code error occurred.' }
  }
}

export async function getBlog(id) {
  try {
    const [result] = await conn.query(`SELECT * FROM blogs WHERE id = ${id}`)
    if (!result) {
      throw { status: 400, message: 'Bad Request: Blog not found.' }
    }
    return result
  } catch (e) {
    console.error(e)
    if (e.status) {
      throw e
    } else {
      throw { status: 500, message: 'Error contacting the database or a code error occurred.' }
    }
  }
}

export async function createBlog(title, content) {
  try {
    if (!title || !content) {
      throw { status: 400, message: 'Bad Request: Title and content are required.' }
    }

    const [result] = await conn.query(`INSERT INTO blogs (title, content) VALUES ('${title}', '${content}')`)
    console.log(title, content)
    return result
  } catch (e) {
    console.error(e)
    if (e.status) {
      throw e
    } else {
      throw { status: 500, message: 'Error contacting the database or a code error occurred.' }
    }
  }
}

export async function editBlog(id, newTitle, newContent) {
  try {
    if (!newTitle || !newContent) {
      throw { status: 400, message: 'Bad Request: New title and content are required.' }
    }

    const [result] = await conn.query(`UPDATE blogs SET title = '${newTitle}', content = '${newContent}' WHERE id = ${id}`)
    if (result.affectedRows === 0) {
      throw { status: 400, message: 'Bad Request: Blog not found.' }
    }
    return result
  } catch (e) {
    console.error(e)
    if (e.status) {
      throw e
    } else {
      throw { status: 500, message: 'Error contacting the database or a code error occurred.' }
    }
  }
}

export async function deleteBlog(id) {
  try {
    const [result] = await conn.query(`DELETE FROM blogs WHERE id = ${id}`)
    if (result.affectedRows === 0) {
      throw { status: 400, message: 'Bad Request: Blog not found.' }
    }
    return result
  } catch (e) {
    console.error(e)
    if (e.status) {
      throw e
    } else {
      throw { status: 500, message: 'Error contacting the database or a code error occurred.' }
    }
  }
}

export function notImplemented() {
  throw { status: 501, message: 'Not Implemented: This HTTP method is not supported.' }
}
