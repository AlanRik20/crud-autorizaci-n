export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );

  btnHome.textContent = "Home";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const btnAaddTask = document.createElement("button");
  btnAaddTask.classList.add("bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-red-600",
    "mb-4")
  btnAaddTask.textContent="añadir"
  
  const title = document.createElement("h1");

  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");

  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  container.appendChild(btnAaddTask);
  
  fetch("http://localhost:4000/todos", {
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => {
      data.todos.forEach(todo => {
        if (todo.id === 0) return;

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2");
        td4.textContent = todo.owner;

        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        const btnDelete = document.createElement("button");
        const btnModify = document.createElement("button");

        btnDelete.classList.add(
          "bg-red-500",
          "text-white",
          "p-2",
          "rounded",
          "hover:bg-red-600",
          "mb-4"
        );

        btnModify.classList.add(
          "bg-green-500",
          "text-white",
          "p-2",
          "rounded",
          "hover:bg-green-600",
          "mb-4"
        );

        btnDelete.textContent = "Eliminar";
        btnModify.textContent = "Modificar";

        btnDelete.addEventListener("click", () => {
          fetch(`http://localhost:4000/todos/${todo.id}`, {
            method: 'DELETE',
            credentials: 'include'
          }).then(() => {
            tr.remove();
          });
        });

        btnModify.addEventListener("click", () => {
          const newTitle = prompt("Ingrese el nuevo título:", todo.title);
          const newCompleted = confirm("¿Está completada la tarea?");

          if (newTitle !== null) {
            fetch(`http://localhost:4000/todos/${todo.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title: newTitle,
                completed: newCompleted
              }),
              credentials: 'include'
            }).then(response => response.json())
              .then(updatedTodo => {
                td2.textContent = updatedTodo.todo.title;
                td3.textContent = updatedTodo.todo.completed ? "Sí" : "No";
              });
          }
        });

        btnAaddTask.addEventListener("click", () => {
          const newTitle = prompt("Ingrese el nuevo título:");
          const newCompleted = confirm("¿Está completada la tarea?");
        
          if (newTitle !== null) {
            fetch(`http://localhost:4000/todos/agregar`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title: newTitle,
                completed: newCompleted
              }),
              credentials: 'include'
            })
            .then(response => response.json())
            .then(result => {
              if (result.message === "Tarea agregada correctamente") {
                // Aquí puedes manejar la visualización de la nueva tarea en la interfaz
                console.log("Nueva tarea agregada:", result.todo);
                // Actualizar la UI o hacer alguna acción después de agregar la tarea
              } else {
                console.error("Error al agregar tarea:", result.message);
              }
            })
            .catch(error => {
              console.error("Error en la solicitud:", error);
            });
          }
        });
        

        td5.appendChild(btnDelete);
        td5.appendChild(btnModify);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
      });
    });

  container.appendChild(title);
  container.appendChild(table);

  return container;
};
