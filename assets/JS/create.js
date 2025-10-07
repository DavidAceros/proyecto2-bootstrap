const form = document.getElementById("todoForm");
const titleEl = document.getElementById("title");
const descEl = document.getElementById("description");
const priorityEl = document.getElementById("priority");
const dateEl = document.getElementById("date");
const completedEl = document.getElementById("isCompleted") || document.getElementById("completed");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dateVal = dateEl.value && String(dateEl.value).trim();
  const dueAt = dateVal
    ? new Date(dateVal + "T00:00:00").toISOString()
    : null;

  const todo = {
    title: titleEl.value.trim() || null,
    description: descEl.value.trim() || null,
    priority: Number.parseInt(priorityEl.value, 10) || 1,
    dueAt, 
    isCompleted: !!completedEl.checked
  };

  console.log("Payload (create):", todo);

  try {
    let serverResponse;
    if (typeof createTodo === "function") {
      serverResponse = await createTodo(todo);
      console.log("Respuesta createTodo:", serverResponse);
    } else {
      const res = await fetch("https://todoapitest.juansegaliz.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo)
      });

      const text = await res.text();
      try { serverResponse = JSON.parse(text); } catch { serverResponse = text; }

      console.log("Fetch status:", res.status, "body:", serverResponse);
      if (!res.ok) throw new Error("Status " + res.status);
    }

    alert("Tarea creada con éxito");
    window.location.href = "index.html";
  } catch (err) {
    console.error("Error al crear tarea:", err);
    alert("Error al crear la tarea");
  }
});
