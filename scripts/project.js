const searchInput = document.getElementById("project-search");
        const categoryButtons = document.querySelectorAll(".category-btn");
        const projectCards = document.querySelectorAll(".project-card");
        const categoryTitle = document.getElementById("category-title");
        const noResults = document.getElementById("no-results");

        let selectedCategory = "home";

        function filterProjects() {
            const searchText = searchInput.value.toLowerCase();
            let visibleCount = 0;

            projectCards.forEach(function(card) {
                const projectName = card.querySelector("h3").textContent.toLowerCase();
                const projectCategory = card.dataset.category;

                const matchesSearch = projectName.includes(searchText);
                const matchesCategory =
                    selectedCategory === "all" ||
                    selectedCategory === projectCategory;

                if (matchesSearch && matchesCategory) {
                    card.hidden = false;
                    visibleCount++;
                } else {
                    card.hidden = true;
                }
            });

            noResults.hidden = visibleCount > 0;
        }

        categoryButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                categoryButtons.forEach(function(btn) {
                    btn.classList.remove("active");
                });

                button.classList.add("active");
                selectedCategory = button.dataset.category;

                if (selectedCategory === "all") {
                    categoryTitle.textContent = "All Projects";
                } else if (selectedCategory === "home") {
                    categoryTitle.textContent = "Home Improvement";
                } else if (selectedCategory === "garden") {
                    categoryTitle.textContent = "Garden Projects";
                } else {
                    categoryTitle.textContent = "Home Repairs";
                }

                filterProjects();
            });
        });

        searchInput.addEventListener("input", filterProjects);

        filterProjects();
