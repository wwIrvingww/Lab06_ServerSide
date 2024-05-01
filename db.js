import conn from './connection.js'

export async function getAllBlogs() {
  try {
    const rows = await conn.query('SELECT * FROM blogs')
    return rows.rows
  } catch (e) {
    throw new Error('Error contacting the database or a code error occurred.')
  }
}

export async function getBlog(id) {
  try {
    const result = await conn.query('SELECT * FROM blogs WHERE id = $1', [id]);
    console.log(result.rows);
    if (result.rows.length === 0) {
      console.log('Blog not found')
      throw new Error('Bad Request: Blog not found.');
    }
    return result.rows;
  } catch (e) {
    if (e.status) {
      throw e;
    } else {
      throw new Error('Error contacting the database or a code error occurred.', e);
    }
  }
}


export async function createBlog(title, content, image64) {
  try {
    if (!title || !content) {
      throw new Error('Bad Request: Title and content are required.')
    }

    const query = 'INSERT INTO blogs (title, content, image64) VALUES ($1, $2, $3)';
    const result = await conn.query(query, [title, content, image64]);
    return result.rows[0];
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
  try {
    if (!newTitle || !newContent) {
      throw new Error('Bad Request: New title and content are required.');
    }

    const query = 'UPDATE blogs SET title = $1, content = $2, image64 = $3 WHERE id = $4 RETURNING *';
    const result = await conn.query(query, [newTitle, newContent, newImage, id]);

    if (result.rows.length === 0) {
      throw new Error('Bad Request: Blog not found.');
    }
    return result.rows[0];
  } catch (e) {
    if (e.status) {
      throw e;
    } else {
      throw new Error('Error contacting the database or a code error occurred.');
    }
  }
}


export async function deleteBlog(id) {
  try {
    const query = 'DELETE FROM blogs WHERE id = $1 RETURNING *';
    const result = await conn.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('Bad Request: Blog not found.');
    }
    return result.rows[0];
  } catch (e) {
    if (e.status) {
      throw e;
    } else {
      throw new Error('Error contacting the database or a code error occurred.');
    }
  }
}


export async function login(username, password) {
  try {
    const query = 'SELECT * FROM Usuarios WHERE username = $1 AND password = $2';
    const result = await conn.query(query, [username, password]);

    if (!result.rows || result.rows.length === 0) {
      throw new Error('Unauthorized: Invalid username or password.');
    }

    return result.rows;
  } catch (e) {
    throw new Error('Error contacting the database or a code error occurred.', e);
  }
}




export function notImplemented() {
  throw new Error('Not Implemented: This HTTP method is not supported.')
}
