window.mapaEss = (function () {

    let dotNetRef = null;
    let selectedPath = null;

    function init(ref) {
        dotNetRef = ref;

        const container = document.querySelector(".map-container");
        if (!container) return;

        const svg = container.querySelector("svg");
        if (!svg) return;

        const states = svg.querySelectorAll('path[id^="MX"]');

        states.forEach(path => {
            // guarda el color original una sola vez
            if (!path.dataset.originalFill) {
                const attrFill = path.getAttribute("fill");
                const cssFill = getComputedStyle(path).fill;
                path.dataset.originalFill = attrFill || cssFill || "#5f8764";
            }

            path.addEventListener("click", () => {

                // Quitar resaltado previo
                if (selectedPath && selectedPath !== path) {
                    const original = selectedPath.dataset.originalFill;
                    selectedPath.style.fill = original;
                }

                // Aplicar color de selección al nuevo
                path.style.fill = "#0e4a36"; // el verde oscuro de tu marca
                selectedPath = path;

                // Avisar a Blazor
                if (dotNetRef) {
                    dotNetRef.invokeMethodAsync("OnEstadoClick", path.id);
                }
            });
        });
    }

    return {
        init
    };
})();
