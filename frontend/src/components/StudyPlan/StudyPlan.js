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

  // Add "Generate Plan" button dynamically
  const generatePlanButton = document.createElement("button");
  generatePlanButton.id = "generate-plan";
  generatePlanButton.textContent = "Generate Plan";
  container.appendChild(generatePlanButton);

  // Add Output Section dynamically
  const outputSection = document.createElement("div");
  outputSection.id = "output-section";
  container.appendChild(outputSection);

  // Function to add a classification dynamically
  function addClassification() {
    const classificationDiv = document.createElement("div");
    classificationDiv.classList.add("classification");
    classificationDiv.innerHTML = `
      <div class="classification-item">
        <div class="classification-header">
          <h1>Classification</h1>
          <input type="text" placeholder="Classification Name" class="classification-name">
          <input type="number" placeholder="Weight (%)" class="classification-weight">
          <button class="minus-classification">-</button>
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

  // Sorting logic for coursework
  function generatePlan() {
    const rows = Array.from(document.querySelectorAll(".coursework-table tbody tr"));
    if (rows.length === 0) {
      alert("No coursework to generate plan.");
      return;
    }

    const sortBy = "due-date"; // Example, sort by due date

    let sortedRows;
    if (sortBy === "due-date") {
      sortedRows = rows.sort((a, b) => {
        const aDueDate = parseInt(a.querySelector("td:nth-child(3) input").value) || 0;
        const bDueDate = parseInt(b.querySelector("td:nth-child(3) input").value) || 0;
        return aDueDate - bDueDate;
      });
    }

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

  // Add event listener to "Add Classification" button
  addClassificationButton.addEventListener("click", addClassification);

  // Add event listener to "Generate Plan" button
  generatePlanButton.addEventListener("click", generatePlan);
});
