document.addEventListener("DOMContentLoaded", function () {
    const shapes = ['landscape-rectangle', 'portrait-rectangle', 'square', 'circle'];
    const colors = ['color-red', 'color-orange', 'color-yellow', 'color-green', 'color-blue', 'color-indigo', 'color-violet'];

    const rowsInput = document.getElementById('rows');
    const columnsInput = document.getElementById('columns');
    const filledInput = document.getElementById('filled');
    const gridContainer = document.querySelector('.grid-container');
    const generateGridButton = document.getElementById('generate-grid');

    // set the max for the input field to avoid overflow
    function updateFilledMax() {
        const numRows = parseInt(rowsInput.value) || 0;
        const numCols = parseInt(columnsInput.value) || 0;
        const maxFilled = numRows * numCols;
        filledInput.max = maxFilled;
        if (filledInput.value > maxFilled) {
            filledInput.value = maxFilled;
        }
    }

    function updateGridDimensions(heightInPx) {
        const numRows = parseInt(rowsInput.value) || 1;
        const numCols = parseInt(columnsInput.value) || 1;
        
        // max height is given
        const height = heightInPx || 200;
        gridContainer.style.height = `${height}px`;
        
        // width is calculated from height/numRows * numCols
        const width = height/numRows * numCols;
        gridContainer.style.width = `${width}px`;
        console.log("width: " + width);
        
        gridContainer.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
    }

    rowsInput.addEventListener('input', () => {
        generateGrid();
    });

    columnsInput.addEventListener('input', () => {
        generateGrid();
    });

    filledInput.addEventListener('input', () => {
        generateGrid();
    });

    generateGridButton.addEventListener('click', function () {
        generateGrid();
    });

    function generateGrid() {
        const numRows = parseInt(rowsInput.value) || 0;
        const numCols = parseInt(columnsInput.value) || 0;
        const numFilled = parseInt(filledInput.value) || 0;

        const gridContainer = document.querySelector('.grid-container');
        gridContainer.innerHTML = ''; // Clear previous grid
        
        updateFilledMax();
        updateGridDimensions(100);

        const totalCells = numRows * numCols;
        const filledCells = Math.min(numFilled, totalCells);

        for (let i = totalCells; i > 0; i--) {
            const shapeDiv = document.createElement('div');
            shapeDiv.classList.add('shape');

            if (i <= filledCells) {
                // Randomly select a shape class for the first 20 cells
                const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
                shapeDiv.classList.add(randomShape);

                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                shapeDiv.classList.add(randomColor);

            } else {
                // Apply grey background for the remaining cells
                shapeDiv.classList.add('border-cell');
            }

            // Append the shape to the grid container
            gridContainer.appendChild(shapeDiv);
        }
    }


    document.getElementById('generate-grid').addEventListener('click', function () {
        generateGrid();

//        const numRows = parseInt(rowsInput.value) || 0;
//        const numCols = parseInt(columnsInput.value) || 0;
//        const numFilled = parseInt(filledInput.value) || 0;
//
//        const gridContainer = document.querySelector('.grid-container');
//        gridContainer.innerHTML = ''; // Clear previous grid
//
//        updateGridDimensions();
//
//        const totalCells = numRows * numCols;
//        const filledCells = Math.min(numFilled, totalCells);
//
//        for (let i = totalCells; i > 0; i--) {
//            const shapeDiv = document.createElement('div');
//            shapeDiv.classList.add('shape');
//
//            if (i <= filledCells) {
//                // Randomly select a shape class for the first 20 cells
//                const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
//                shapeDiv.classList.add(randomShape);
//
//                const randomColor = colors[Math.floor(Math.random() * colors.length)];
//                shapeDiv.classList.add(randomColor);
//
//            } else {
//                // Apply grey background for the remaining cells
//                shapeDiv.classList.add('border-cell');
//            }
//
//            // Append the shape to the grid container
//            gridContainer.appendChild(shapeDiv);
//        }

    });
    // Initial call to set the max value based on initial input values
    updateFilledMax();
    updateGridDimensions();
});