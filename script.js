document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    const templates = [
        // Define your resume templates here
    ];

    let currentTemplate = templates[0]; // Default template

    // Function to render the form based on the selected template
    function renderForm() {
        const formHTML = currentTemplate.fields.map(field => `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <input type="${field.type}" id="${field.id}" placeholder="${field.placeholder}">
            </div>
        `).join('');

        app.innerHTML = `
            <div class="container">
                <h2>Resume Builder</h2>
                <select id="templateSelector">
                    ${templates.map((template, index) => `<option value="${index}">${template.name}</option>`).join('')}
                </select>
                ${formHTML}
                <button onclick="previewResume()">Preview</button>
                <div class="preview-container" id="previewContainer"></div>
            </div>
        `;

        document.getElementById('templateSelector').addEventListener('change', function () {
            currentTemplate = templates[this.value];
            renderForm();
        });
    }

    // Function to preview the resume
    window.previewResume = function () {
        const formInputs = Array.from(document.querySelectorAll('input')).map(input => ({ [input.id]: input.value }));
        const previewContainer = document.getElementById('previewContainer');

        // Clear previous preview
        previewContainer.innerHTML = '';

        // Render preview
        formInputs.forEach(input => {
            const key = Object.keys(input)[0];
            const value = input[key];

            previewContainer.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        });
    };

    // Initial render
    renderForm();
});
