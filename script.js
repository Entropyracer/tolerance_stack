document.addEventListener("DOMContentLoaded", () => {
    const addRowButton = document.getElementById("add-row");
    const resetTableButton = document.getElementById("reset-table");
    const savePdfButton = document.getElementById("save-pdf");
    const tableBody = document.querySelector("tbody");
    const featureDescriptionBase = "Feature ";
    let featureCounter = 1;

    // Initialize the table with Row 1 only
    initializeTable();

    // Add Feature Row
    addRowButton.addEventListener("click", () => {
        const newRow = createFeatureRow();
        tableBody.appendChild(newRow);
        updateRowNumbers();
    });

    // Reset Table
    resetTableButton.addEventListener("click", () => {
        initializeTable();
    });

    // Save Table as PDF
    savePdfButton.addEventListener("click", () => {
        const element = document.querySelector(".table-wrapper");
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * pageWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
            pdf.save("ToleranceStackAnalysis.pdf");
        });
    });

    // Create Feature Row
    function createFeatureRow() {
        const row = document.createElement("tr");

        // Row Number Column
        const rowNumberCell = document.createElement("td");

        // Feature Description Column
        const featureDescriptionCell = document.createElement("td");
        const descriptionInput = document.createElement("input");
        descriptionInput.type = "text";
        descriptionInput.value = `${featureDescriptionBase}${String.fromCharCode(64 + featureCounter)}`;
        descriptionInput.addEventListener("input", () => {
            descriptionInput.style.color = "black"; // Turn text black on edit
        });
        descriptionInput.style.color = "grey"; // Default text is grey
        featureDescriptionCell.appendChild(descriptionInput);

        // Direction Column
        const directionCell = document.createElement("td");
        const directionSelect = document.createElement("select");
        ["+", "-"].forEach((optionValue) => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.textContent = optionValue;
            directionSelect.appendChild(option);
        });
        directionCell.appendChild(directionSelect);

        // Displacement Column
        const displacementCell = document.createElement("td");
        const displacementInput = document.createElement("input");
        displacementInput.type = "number";
        displacementInput.value = "0.000";
        displacementInput.step = "0.001";
        displacementCell.appendChild(displacementInput);

        // Symmetrical Tolerance Column
        const toleranceCell = document.createElement("td");
        const toleranceInput = document.createElement("input");
        toleranceInput.type = "number";
        toleranceInput.value = "0.000";
        toleranceInput.step = "0.001";
        toleranceCell.appendChild(toleranceInput);

        // Distribution Column
        const distributionCell = document.createElement("td");
        const distributionSelect = document.createElement("select");
        ["Normal", "Uniform"].forEach((optionValue) => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.textContent = optionValue;
            distributionSelect.appendChild(option);
        });
        distributionCell.appendChild(distributionSelect);

        // Accumulated Displacement Column
        const accumulatedDisplacementCell = document.createElement("td");
        accumulatedDisplacementCell.textContent = "0.000";

        // Accumulated Symmetrical Tolerance Column
        const accumulatedToleranceCell = document.createElement("td");
        accumulatedToleranceCell.textContent = "0.000";

        // Actions Column
        const actionsCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            row.remove();
            updateRowNumbers();
        });
        actionsCell.appendChild(deleteButton);

        // Append all cells to the row
        row.appendChild(rowNumberCell);
        row.appendChild(featureDescriptionCell);
        row.appendChild(directionCell);
        row.appendChild(displacementCell);
        row.appendChild(toleranceCell);
        row.appendChild(distributionCell);
        row.appendChild(accumulatedDisplacementCell);
        row.appendChild(accumulatedToleranceCell);
        row.appendChild(actionsCell);

        featureCounter++;
        return row;
    }

    // Update Row Numbers
    function updateRowNumbers() {
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row, index) => {
            row.cells[0].textContent = index; // Update row number
        });
    }

    // Initialize Table
    function initializeTable() {
        tableBody.innerHTML = ""; // Clear all rows
        featureCounter = 1; // Reset counter
        const initialRow = createFeatureRow(); // Create Row 1
        tableBody.appendChild(initialRow);
        updateRowNumbers();
    }
});