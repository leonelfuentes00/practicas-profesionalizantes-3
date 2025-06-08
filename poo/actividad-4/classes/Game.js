import { Car } from './Car.js';
import { CarController } from './CarController.js';
import { Track } from './Track.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.track = new Track(this.ctx, canvas.width, canvas.height);

        this.car1 = new Car(200, 300, 'magenta', this.ctx);
        this.car2 = new Car(800, 300, 'cyan', this.ctx);

        this.controller1 = new CarController(this.car1, {
            forward: 'ArrowUp',
            backward: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight'
        });

        this.controller2 = new CarController(this.car2, {
            forward: 'w',
            backward: 's',
            left: 'a',
            right: 'd'
        });
    }

    update() {
        this.controller1.update();
        this.controller2.update();

        this.car1.update();
        this.car2.update();

        if (this.track.isOutOfBounds(this.car1)) {
            console.log('Car 1 fuera de pista!');
        }

        if (this.track.isOutOfBounds(this.car2)) {
            console.log('Car 2 fuera de pista!');
        }

        if (this.checkCollision(this.car1, this.car2)) {
            console.log('¡Colisión entre autos!');
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.track.draw();
        this.car1.draw();
        this.car2.draw();
    }

    checkCollision(carA, carB) {
        const a = carA.getBounds();
        const b = carB.getBounds();

        return (
            a.left < b.right &&
            a.right > b.left &&
            a.top < b.bottom &&
            a.bottom > b.top
        );
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    start() {
        this.loop();
    }
}
