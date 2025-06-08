import { ShapeFactory } from './utils/ShapeFactory.js';
import { ShapeController } from './controllers/ShapeController.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInput = document.getElementById('colorInput');
const figureList = document.getElementById('figureList');
const activeLabel = document.getElementById('activeLabel');

const figures = [];
let activeFigure = null;
const controller = new ShapeController();

function createShape(type) {
  const config = {
    id: `${type}${figures.length + 1}`,
    x: 100 + Math.random() * 400,
    y: 100 + Math.random() * 300,
    color: colorInput.value,
    width: 80,
    height: 50,
    radius: 40,
    base: 60
  };
  const shape = ShapeFactory.createShape(type, config, ctx);
  figures.push(shape);
  setActiveFigure(shape);
  updateFigureList();
}

document.querySelector("[data-shape='rectangle']").addEventListener("click", () => createShape("rectangle"));
document.querySelector("[data-shape='circle']").addEventListener("click", () => createShape("circle"));
document.querySelector("[data-shape='triangle']").addEventListener("click", () => createShape("triangle"));

function setActiveFigure(shape) {
  activeFigure = shape;
  controller.setTarget(shape);
  activeLabel.textContent = `Figura activa seleccionada actual: ${shape.id}`;
  updateFigureList();
}

function updateFigureList() {
  figureList.innerHTML = '';
  for (const shape of figures) {
    const row = document.createElement('tr');
    if (shape === activeFigure) row.classList.add('active');

    const tipo = document.createElement('td');
    tipo.textContent = shape.constructor.name[0].toUpperCase();
    const nombre = document.createElement('td');
    nombre.textContent = shape.id;

    row.onclick = () => setActiveFigure(shape);
    row.appendChild(tipo);
    row.appendChild(nombre);
    figureList.appendChild(row);
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  controller.update();
  for (const fig of figures) {
    fig.draw();
  }
  requestAnimationFrame(loop);
}

loop();