import { Rectangle } from './Rectangle.js';
import { RectangleController } from './RectangleController.js';
import { loadTrackImage, drawTrack } from './Track.js';

let trackImage;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const trackSelector = document.getElementById('trackSelector');

function loadAndStartTrack(path) {
    loadTrackImage(path, (img) => {
        trackImage = img;
    });
}

loadAndStartTrack(trackSelector.value);

trackSelector.addEventListener('change', (e) => {
    loadAndStartTrack(e.target.value);
});

const car1 = new Rectangle(500, 650, 40, 20, ctx, 'magenta');
const controller1 = new RectangleController(car1, {
    forward: 'ArrowUp',
    backward: 'ArrowDown',  
    left: 'ArrowLeft',
    right: 'ArrowRight'
});

const car2 = new Rectangle(500, 680, 40, 20, ctx, 'cyan');
const controller2 = new RectangleController(car2, {
    forward: 'w',
    backward: 's',
    left: 'a',
    right: 'd'
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (trackImage) drawTrack(ctx, trackImage);

    controller1.update();
    controller2.update();

    car1.drawRectangle();
    car2.drawRectangle();

    requestAnimationFrame(loop);
}

loop();