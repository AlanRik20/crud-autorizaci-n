export const addPage = () => {
    const container = document.createElement("div");

    container.classList.add(
        "flex",
        "items-center",
        "justify-center",
        "h-screen",
        "bg-gray-200"
    );

    const form = document.createElement("form");

    form.classList.add(
        "flex",
        "flex-col",
        "w-1/6",
        "gap-4",
        "bg-white",
        "p-8",
        "rounded",
        "shadow-md"
    );

    const title = document.createElement("h2");

    title.classList.add("text-2xl", "font-bold", "mb-4");
    title.textContent = "Añadir Tarea";

    const taskInput = document.createElement("input");

    taskInput.type = "text";
    taskInput.id = "task";
    taskInput.name = "task";
    taskInput.required = true;
    taskInput.classList.add(
        "w-full",
        "p-2",
        "border",
        "border-gray-300",
        "rounded"
    );
    taskInput.placeholder = "Título de la tarea";

    const completedCheckbox = document.createElement("input");

    completedCheckbox.type = "checkbox";
    completedCheckbox.id = "completed";
    completedCheckbox.name = "completed";
    
    const completedLabel = document.createElement("label");
    completedLabel.htmlFor = "completed";
    completedLabel.textContent = "¿Está completada?";
    completedLabel.classList.add("ml-2");

    const submitButton = document.createElement("button");

    submitButton.type = "submit";
    submitButton.classList.add(
        "w-full",
        "bg-blue-500",
        "hover:bg-blue-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded"
    );
    submitButton.textContent = "Agregar Tarea";

    form.appendChild(title);
    form.appendChild(taskInput);
    form.appendChild(completedCheckbox);
    form.appendChild(completedLabel);
    form.appendChild(submitButton);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const task = taskInput.value;
        const completed = completedCheckbox.checked;

        // Validación básica
        if (!task) {
            document.getElementById("message").innerText =
                "Por favor, completa todos los campos.";
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/todos/agregar", {
                method: "POST",
                credentials: "include", // Importante para enviar las cookies de sesión
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: task, completed }),
            });

            if (!response.ok) {
                const divError = document.createElement("div");
                divError.innerText = "Error al agregar la tarea";
                divError.classList.add(
                    "bg-danger",
                    "text-white",
                    "text-center",
                    "rounded",
                    "p-2",
                    "mt-3"
                );

                setTimeout(() => {
                    divError.hidden = true;
                }, 3500);

                container.appendChild(divError);
                return;
            }

            const data = await response.json();
            console.log("Nueva tarea agregada:", data.todo);
            window.location.pathname = "/home";
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    });

    container.appendChild(form);

    return container;
};
