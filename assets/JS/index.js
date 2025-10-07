document.addEventListener("DOMContentLoaded", async () => {
  const todosBody = document.getElementById("todosBody");

  try {
    const response = await getTodos();
    const tasks = response?.data || [];

    if (tasks.length === 0) {
      todosBody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:20px;color:rgba(255,255,255,0.7)">No hay tareas disponibles</td></tr>`;
      return;
    }

    todosBody.innerHTML = "";

    tasks.forEach(task => {
      const row = document.createElement("tr");

      const fecha = task.dueAt && task.dueAt !== "0001-01-01T00:00:00+00:00"
        ? new Date(task.dueAt).toLocaleDateString("es-ES")
        : "—";

      row.innerHTML = `
        <td>${task.id}</td>
        <td>${escapeHtml(task.title || "—")}</td>
        <td>${escapeHtml(task.description || "—")}</td>
        <td>${task.isCompleted ? "S" : "X"}</td>
        <td>${Number.isFinite(task.priority) ? task.priority : "—"}</td>
        <td>
          <button class="action-btn" onclick="editTask(${task.id})">Editar</button>
          <button class="action-btn delete" onclick="deleteTask(${task.id})">Eliminar</button>
        </td>
      `;

      todosBody.appendChild(row);
    });
  } catch (err) {
    console.error("Error al cargar tareas:", err);
    todosBody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:20px;color:red">Error cargando tareas</td></tr>`;
  }
});


function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}


async function deleteTask(id) {
  if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return;
  try {
    await deleteTodo(id);
    alert("Tarea eliminada correctamente");
    location.reload();
  } catch (err) {
    console.error("Error al eliminar:", err);
    alert("⚠️ No se pudo eliminar la tarea.");
  }
}

function editTask(id) {
  window.location.href = `create.html?id=${id}`;
}
