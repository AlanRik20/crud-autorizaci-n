export function Header() {
    const header = document.createElement('header');

    header.classList.add(
        "bg-black",
        "text-black",
        "py-3",
        "shadow-lg",
        "flex",
        "justify-between", // Distribuye los botones a los extremos
        "items-center", // Alinea los botones verticalmente en el centro
        "px-6",
        "w-full"    
    );

    const btnHome = document.createElement("button");

    btnHome.classList.add(
        "bg-green-300",
        "text-black",
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
    btnAaddTask.classList.add(
        "bg-gray-500",
        "text-white",
        "p-2",
        "rounded",
        "hover:bg-green-600",
        "mb-4"
    );
    btnAaddTask.textContent = "Añadir +";
    btnAaddTask.addEventListener("click", () => {
        window.location.pathname = "/agregar";
    });

    const btnLogout = document.createElement("button");

    btnLogout.classList.add(
        "bg-gray-500",
        "text-white",
        "p-2",
        "rounded",
        "hover:bg-red-600",
    );

    btnLogout.textContent = "Logout";

    btnLogout.addEventListener("click", async () => {
        const response = await fetch("http://localhost:4000/auth/sign-out", {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            window.location.pathname = "/";
        }
    });

    // Crea un div para agrupar los botones a la izquierda (btnHome y btnAaddTask)
    const leftGroup = document.createElement("div");
    leftGroup.classList.add("flex", "gap-4"); // flex para agrupar y gap para espacio entre botones
    leftGroup.appendChild(btnHome);
    leftGroup.appendChild(btnAaddTask);

    // Agrega los botones a los extremos
    header.appendChild(leftGroup);
    header.appendChild(btnLogout);

    return header;
}
