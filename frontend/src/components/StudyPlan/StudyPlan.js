document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");

    // Add Classification Section dynamically
    const classificationSection = document.createElement("div");
    classificationSection.id = "classificationSection";
    container.appendChild(classificationSection);

    // Add "Add Classification" button dynamically
    const addClassificationButton = document.createElement("button");
    addClassificationButton.className = "add-classification";
    addClassificationButton.textContent = "Add Classification";
    container.appendChild(addClassificationButton);

    // Add the "Sort by" options
    const sortBySection = document.createElement("div");
    sortBySection.id = "sort-by-section";
    container.appendChild(sortBySection);

    // Create buttons for sorting options (factor buttons)
    const dueDateFactorButton = document.createElement("button");
    dueDateFactorButton.id = "dueDate-factor";
    dueDateFactorButton.textContent = "Sort by Due Date";
    const pointsFactorButton = document.createElement("button");
    pointsFactorButton.id = "points-factor";
    pointsFactorButton.textContent = "Sort by Points";
    const durationFactorButton = document.createElement("button");
    durationFactorButton.id = "duration-factor";
    durationFactorButton.textContent = "Sort by Duration";

    sortBySection.appendChild(dueDateFactorButton);
    sortBySection.appendChild(pointsFactorButton);
    sortBySection.appendChild(durationFactorButton);

    // Add "Generate Plan" button dynamically
    const generatePlanButton = document.createElement("button");
    generatePlanButton.id = "generate-plan";
    generatePlanButton.textContent = "Generate Plan";
    generatePlanButton.disabled = true; // Initially disabled
    container.appendChild(generatePlanButton);

    // Add Output Section dynamically
    const outputSection = document.createElement("div");
    outputSection.id = "output-section";
    container.appendChild(outputSection);

    // Selected Variables for sorting
    let selectedVariables = [];

    // Add Classification logic
    function addClassification() {
        const classificationDiv = document.createElement("div");
        classificationDiv.classList.add("classification");
        classificationDiv.innerHTML = `
            <div class="classification-item">
                <div class="classification-header">
                    <div class="classification-input">
                        <input type="text" placeholder="Classification Name" class="classification-name">
                        <input type="number" placeholder="Weight (%)" class="classification-weight">
                        <button class="minus-classification">-</button>
                    </div>
                </div>
                <div class="coursework-section">
                    <!-- Coursework will be added here -->
                </div>
                <button class="add-coursework">+ Add Coursework</button>
            </div>
        `;
        classificationSection.appendChild(classificationDiv);

        // Add event listener to the minus classification button
        const minusBtn = classificationDiv.querySelector(".minus-classification");
        minusBtn.addEventListener("click", () => {
            classificationDiv.remove();
        });

        // Add event listener to the add coursework button
        const plusClassificationBtn = classificationDiv.querySelector(".add-coursework");
        plusClassificationBtn.addEventListener("click", () => {
            addCoursework(classificationDiv);
            plusClassificationBtn.style.display = "none";
        });
    }

    // Function to add coursework dynamically
    function addCoursework(classificationDiv) {
        const courseworkSection = classificationDiv.querySelector(".coursework-section");

        let courseworkTable = courseworkSection.querySelector(".coursework-table");
        if (!courseworkTable) {
            courseworkTable = document.createElement("table");
            courseworkTable.classList.add("coursework-table");
            courseworkTable.innerHTML = `
                <thead>
                    <tr>
                        <th></th>
                        <th>Coursework Name</th>
                        <th>Due in (days)</th>
                        <th>Course Points</th>
                        <th>Description</th>
                        <th>Duration (hrs)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            courseworkSection.appendChild(courseworkTable);
        }

        const tbody = courseworkTable.querySelector("tbody");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><button class="plus-coursework">+</button></td>
            <td><input type="text" placeholder="Coursework Name"></td>
            <td><input type="number" placeholder="Due in (days)"></td>
            <td><input type="number" placeholder="Points"></td>
            <td><input type="text" placeholder="Description"></td>
            <td><input type="number" placeholder="Duration (hrs)"></td>
            <td><button class="remove-coursework">-</button></td>
        `;
        tbody.appendChild(newRow);

        // Add event listener to the plus button
        newRow.querySelector(".plus-coursework").addEventListener("click", () => {
            addCoursework(classificationDiv);
        });

        // Add event listener to the minus button
        newRow.querySelector(".remove-coursework").addEventListener("click", () => {
            newRow.remove();
        });
    }

    // Handle "Stick and Click" method (button background toggle for factor buttons)
    function handleFactorButtonClick(button, factor) {
        button.classList.toggle("selected");
        if (button.classList.contains("selected")) {
            if (!selectedVariables.includes(factor)) {
                selectedVariables.push(factor);
            }
        } else {
            selectedVariables = selectedVariables.filter((item) => item !== factor);
        }
        generatePlanButton.disabled = selectedVariables.length === 0; // Enable if at least one factor is selected
    }

    // Sorting logic for coursework
    function generatePlan() {
        const rows = Array.from(document.querySelectorAll(".coursework-table tbody tr"));
        if (rows.length === 0) {
            alert("No coursework to generate plan.");
            return;
        }

        // Determine which algorithm to use
        let sortingAlgorithm;
        if (selectedVariables.length === 3) {
            sortingAlgorithm = timSort;
        } else if (selectedVariables.length === 2) {
            sortingAlgorithm = mergeSort;
        } else {
            sortingAlgorithm = insertionSort;
        }

        // Sort rows based on selected variables
        const sortedRows = sortingAlgorithm(rows, selectedVariables);

        let outputTable = document.getElementById("sorted-coursework");
        if (!outputTable) {
            outputTable = document.createElement("table");
            outputTable.id = "sorted-coursework";
            outputTable.innerHTML = `
                <thead>
                    <tr>
                        <th>Coursework Name</th>
                        <th>Due in (days)</th>
                        <th>Course Points</th>
                        <th>Description</th>
                        <th>Duration (hrs)</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            outputSection.appendChild(outputTable);
        }

        const outputBody = outputTable.querySelector("tbody");
        outputBody.innerHTML = ""; // Clear existing rows

        sortedRows.forEach((row) => {
            const outputRow = document.createElement("tr");
            outputRow.innerHTML = `
                <td>${row.querySelector("td:nth-child(2) input").value}</td>
                <td>${row.querySelector("td:nth-child(3) input").value}</td>
                <td>${row.querySelector("td:nth-child(4) input").value}</td>
                <td>${row.querySelector("td:nth-child(5) input").value}</td>
                <td>${row.querySelector("td:nth-child(6) input").value}</td>
            `;
            outputBody.appendChild(outputRow);
        });
    }

    // Insertion Sort Algorithm
    function insertionSort(rows, selectedVariables) {
        return rows.sort((a, b) => {
            for (let variable of selectedVariables) {
                let comparison = 0;
                const aValue = getValue(a, variable);
                const bValue = getValue(b, variable);

                if (aValue > bValue) {
                    comparison = 1;
                } else if (aValue < bValue) {
                    comparison = -1;
                }
                if (comparison !== 0) return comparison;
            }
            return 0;
        });
    }

    // Merge Sort Algorithm
    function mergeSort(rows, selectedVariables) {
        if (rows.length <= 1) return rows;

        const middle = Math.floor(rows.length / 2);
        const left = mergeSort(rows.slice(0, middle), selectedVariables);
        const right = mergeSort(rows.slice(middle), selectedVariables);

        return merge(left, right, selectedVariables);
    }

    function merge(left, right, selectedVariables) {
        const result = [];
        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
            let comparison = 0;
            const leftValue = getValue(left[i], selectedVariables[0]);
            const rightValue = getValue(right[j], selectedVariables[0]);

            if (leftValue > rightValue) {
                comparison = 1;
            } else if (leftValue < rightValue) {
                comparison = -1;
            }

            if (comparison <= 0) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }

        return result.concat(left.slice(i), right.slice(j));
    }

    // Tim Sort Algorithm (simplified for this case)
    function timSort(rows, selectedVariables) {
        return rows.sort((a, b) => {
            for (let variable of selectedVariables) {
                let comparison = 0;
                const aValue = getValue(a, variable);
                const bValue = getValue(b, variable);

                if (aValue > bValue) {
                    comparison = 1;
                } else if (aValue < bValue) {
                    comparison = -1;
                }
                if (comparison !== 0) return comparison;
            }
            return 0;
        });
    }

    // Helper function to get the value based on the variable
    function getValue(row, variable) {
        switch (variable) {
            case "dueDate":
                return parseInt(row.querySelector("td:nth-child(3) input").value) || 0;
            case "points":
                return parseInt(row.querySelector("td:nth-child(4) input").value) || 0;
            case "duration":
                return parseInt(row.querySelector("td:nth-child(6) input").value) || 0;
            default:
                return 0;
        }
    }

    // Add event listeners for sorting factor buttons with "Stick and Click"
    dueDateFactorButton.addEventListener("click", () => handleFactorButtonClick(dueDateFactorButton, "dueDate"));
    pointsFactorButton.addEventListener("click", () => handleFactorButtonClick(pointsFactorButton, "points"));
    durationFactorButton.addEventListener("click", () => handleFactorButtonClick(durationFactorButton, "duration"));

    // Add event listener to "Add Classification" button
    addClassificationButton.addEventListener("click", addClassification);

    // Add event listener to "Generate Plan" button
    generatePlanButton.addEventListener("click", generatePlan);
});
