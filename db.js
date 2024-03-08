import conn from './connection.js'

export async function getAllBlogs() {
    try {
        const [rows] = await conn.query('SELECT * FROM blogs')
        return rows

    } catch (e) {
        console.log(e)
        return e
    }
}


export async function getBlog(id) {
    try {
        const [result] = await conn.query(`SELECT * FROM blogs WHERE id = ${id}`)
        return result

    } catch (e) {
        console.log(e)
        return e
    }
}

export async function createBlog(title, content) {
    try {
        const [result] = await conn.query(`INSERT INTO blogs (title, content) VALUES ('${title}', '${content}')`)
        console.log(title, content)
        return result

    } catch (e) {
        console.log(e)
        return e
    }
}

export async function editBlog(id, newTitle, newContent) {
    try {
        const [result] = await conn.query(`UPDATE blogs SET title = '${newTitle}', content = '${newContent}' WHERE id = ${id}`);
        return result
        // Retorna un objeto con información sobre la operación (por ejemplo, éxito o error).
        // return { success: true, message: 'Blog actualizado correctamente' };
    } catch (e) {
        console.error(e);
        return {e};
    }
}



export async function deleteBlog(id) {
    try {
        const [result] = await conn.query(`DELETE FROM blogs WHERE id = ${id}`)
        return result

    } catch (e) {
        console.log(e)
        return e
    }
}