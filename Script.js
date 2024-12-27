// script.js

// DOM Elements
const throatRadiusInput = document.getElementById('throatRadius');
const exitRadiusInput = document.getElementById('exitRadius');
const nozzleLengthInput = document.getElementById('nozzleLength');
const throatRadiusValue = document.getElementById('throatRadiusValue');
const exitRadiusValue = document.getElementById('exitRadiusValue');
const nozzleLengthValue = document.getElementById('nozzleLengthValue');
const volumeOutput = document.getElementById('volume');
const thrustOutput = document.getElementById('thrust');

// Nozzle Graph
function updateNozzleGraph(throatRadius, exitRadius, nozzleLength) {
  const x = [0, nozzleLength / 2, nozzleLength]; // Length segments
  const y = [throatRadius, (throatRadius + exitRadius) / 2, exitRadius]; // Radius at each segment

  Plotly.newPlot('nozzleGraph', [{
    x,
    y,
    mode: 'lines+markers',
    line: { shape: 'spline', color: '#007acc' },
    marker: { size: 8, color: '#007acc' }
  }], {
    margin: { t: 0 },
    xaxis: { title: 'Length (cm)' },
    yaxis: { title: 'Radius (cm)' }
  });
}

// Calculations
function calculateVolume(throatRadius, exitRadius, nozzleLength) {
  // Approximate volume using the formula for a truncated cone
  const throatArea = Math.PI * throatRadius ** 2;
  const exitArea = Math.PI * exitRadius ** 2;
  return ((throatArea + exitArea) / 2) * nozzleLength;
}

function calculateThrust(volume) {
  // Simplistic model: thrust proportional to volume
  return volume * 0.1; // Arbitrary factor for demonstration
}

// Event Listeners
function updateValues() {
  const throatRadius = parseFloat(throatRadiusInput.value);
  const exitRadius = parseFloat(exitRadiusInput.value);
  const nozzleLength = parseFloat(nozzleLengthInput.value);

  // Update displayed values
  throatRadiusValue.textContent = throatRadius;
  exitRadiusValue.textContent = exitRadius;
  nozzleLengthValue.textContent = nozzleLength;

  // Update graph
  updateNozzleGraph(throatRadius, exitRadius, nozzleLength);

  // Update calculations
  const volume = calculateVolume(throatRadius, exitRadius, nozzleLength);
  const thrust = calculateThrust(volume);
  volumeOutput.textContent = volume.toFixed(2);
  thrustOutput.textContent = thrust.toFixed(2);
}

// Attach listeners
[throatRadiusInput, exitRadiusInput, nozzleLengthInput].forEach(input => {
  input.addEventListener('input', updateValues);
});

// Initialize
updateValues();

