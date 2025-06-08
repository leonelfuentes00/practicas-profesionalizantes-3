import { Car } from './Car.js';
import { RectangleController } from './RectangleController.js';
import { Track } from './Track.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const track = new Track(canvas.width, canvas.height, ctx);

const car1 = new Car(500, 650, 40, 20, ctx, 'magenta');
const car2 = new Car(500, 680, 40, 20, ctx, 'cyan');

const controller1 = new RectangleController(car1, {
    forward: 'ArrowUp',
    backward: 'ArrowDown',  
    left: 'ArrowLeft',
    right: 'ArrowRight'
});

const controller2 = new RectangleController(car2, {
    forward: 'w',
    backward: 's',
    left: 'a',
    right: 'd'
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    track.draw();

    controller1.update();
    controller2.update();

    if (!track.isOutOfBounds(car1)) {
        car1.draw();
        track.checkLap(car1);
    }

    if (!track.isOutOfBounds(car2)) {
        car2.draw();
        track.checkLap(car2);
    }

    requestAnimationFrame(loop);
}

loop();
