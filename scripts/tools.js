const searchInput = document.getElementById("tool-search");
        const categoryButtons = document.querySelectorAll(".category-btn");
        const toolCards = document.querySelectorAll(".tool-card");
        const toolCount = document.getElementById("tool-count");
        const noResults = document.getElementById("no-results");

        let selectedCategory = "all";

        function filterTools() {
            const searchText = searchInput.value.toLowerCase();
            let visibleCount = 0;

            toolCards.forEach(function(card) {
                const toolName = card.querySelector("h3").textContent.toLowerCase();
                const toolDescription = card.querySelector(".card-content p").textContent.toLowerCase();

                const matchesSearch =
                    toolName.includes(searchText) ||
                    toolDescription.includes(searchText);

                const matchesCategory =
                    selectedCategory === "all" ||
                    card.dataset.category === selectedCategory;

                if (matchesSearch && matchesCategory) {
                    card.hidden = false;
                    visibleCount++;
                } else {
                    card.hidden = true;
                }
            });

            toolCount.textContent = visibleCount + " tools found";
            noResults.hidden = visibleCount !== 0;
        }

        searchInput.addEventListener("input", filterTools);

        categoryButtons.forEach(function(button) {
            button.addEventListener("click", function() {

                categoryButtons.forEach(function(btn) {
                    btn.classList.remove("active");
                });

                button.classList.add("active");
                selectedCategory = button.dataset.category;

                filterTools();
            });
        });

// Sprint 1: Show tools relevant to the selected project.
const projectTools = {
    shelves: ["drill", "level", "tape"],
    painting: ["level", "tape"],
    planter: ["drill", "tape", "hammer"],
    faucet: ["tape"]
};
const selectedProject = new URLSearchParams(window.location.search).get("project");
const toolIds = ["drill", "level", "tape", "hammer"];
if (selectedProject && projectTools[selectedProject]) {
    const allowedTools = projectTools[selectedProject];
    toolCards.forEach(function(card, index) {
        card.dataset.projectVisible = allowedTools.includes(toolIds[index]) ? "yes" : "no";
    });
    // Apply project selection even when search or category filters change.
    const originalFilterTools = filterTools;
    filterTools = function() {
        originalFilterTools();
        let visible = 0;
        toolCards.forEach(function(card) {
            if (card.dataset.projectVisible === "no") card.style.display = "none";
            if (card.style.display !== "none") visible++;
        });
        toolCount.textContent = visible;
        noResults.hidden = visible > 0;
    };
    filterTools();
}
