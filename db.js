import conn from './connection.js'

export async function getAllBlogs() {
  try {
    const [rows] = await conn.query('SELECT * FROM blogs')
    return rows
  } catch (e) {
    throw new Error('Error contacting the database or a code error occurred.')
  }
}

export async function getBlog(id) {
  try {
    const [result] = await conn.query(`SELECT * FROM blogs WHERE id = ${id}`)
    if (!result) {
      throw new Error('Bad Request: Blog not found.')
    }
    return result
  } catch (e) {
    if (e.status) {
      throw e
    } else {
      throw new Error('Error contacting the database or a code error occurred.')
    }
  }
}

export async function createBlog(title, content, image64) {
  try {
    if (!title || !content) {
      throw new Error('Bad Request: Title and content are required.')
    }

    const query = 'INSERT INTO blogs (title, content, image64) VALUES (?, ?, ?)';
    const [result] = await conn.query(query, [title, content, image64]);
    return result;
  } catch (e) {
    console.error('FUNCTION createBlog in CATCH', e)
    if (e.status) {
      throw e;
    } else {
      
      throw new Error('Error contacting the database or a code error occurred.');
    }
  }
}


export async function editBlog(id, newTitle, newContent, newImage) {
  console.log (id, newTitle, newContent, newImage);

  try {
    if (!newTitle || !newContent) {
      throw new Error('Bad Request: New title and content are required.')
    }

    console.log (id, newTitle, newContent, newImage);
    const [result] = await conn.query(`UPDATE blogs SET title = '${newTitle}', content = '${newContent}', image64 = '${newImage}' WHERE id = ${id}`);

    if (result.affectedRows === 0) {
      throw new Error('Bad Request: Blog not found.')
    }
    return result
  } catch (e) {
    if (e.status) {
      throw e
    } else {
      throw new Error('Error contacting the database or a code error occurred.')
    }
  }
}

export async function deleteBlog(id) {
  try {
    const [result] = await conn.query(`DELETE FROM blogs WHERE id = ${id}`)
    if (result.affectedRows === 0) {
      throw new Error('Bad Request: Blog not found.')
    }
    return result
  } catch (e) {
    if (e.status) {
      throw e
    } else {
      throw new Error('Error contacting the database or a code error occurred.')
    }
  }
}

export async function login(user, password) {
  try {
    const [result] = await conn.query(`SELECT * FROM Usuarios WHERE user = ? AND password = ?`, [user, password]);
    
    if (!result || result.length == 0) {
      throw new Error('Unauthorized: Invalid username or password.');
      console.log(result);
    }

    return result;
    
  } catch (e) {
    throw new Error('Error contacting the database or a code error occurred.', e);
  }
}



export function notImplemented() {
  throw new Error('Not Implemented: This HTTP method is not supported.')
}
