const API_URL = "https://todoapitest.juansegaliz.com/todos";

async function getTodos() {
  try {
    const res = await fetch(API_URL, {
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error("Error al obtener los todos: " + res.status);
    return await res.json(); 
  } catch (error) {
    console.error("Error en getTodos:", error);
    return { data: [] };
  }
}

async function getTodoById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error("Error getTodoById: " + res.status);
    return await res.json();
  } catch (err) {
    console.error("Error en getTodoById:", err);
    throw err;
  }
}

async function createTodo(todo) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || ("Error al crear: " + res.status));
    return data;
  } catch (error) {
    console.error("Error en createTodo:", error);
    throw error;
  }
}


async function deleteTodo(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

async function updateTodo(id, todo) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  });
  return res.json();
}
