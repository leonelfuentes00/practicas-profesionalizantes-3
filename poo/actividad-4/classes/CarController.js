export class CarController {
    constructor(car, keys) {
        this.car = car;
        this.keys = keys;
        this.pressed = {};

        window.addEventListener('keydown', (e) => this.pressed[e.key] = true);
        window.addEventListener('keyup', (e) => this.pressed[e.key] = false);
    }

    update() {
        if (this.pressed[this.keys.forward]) this.car.moveForward();
        if (this.pressed[this.keys.backward]) this.car.moveBackward();
        if (this.pressed[this.keys.left]) this.car.rotateLeft();
        if (this.pressed[this.keys.right]) this.car.rotateRight();
    }
}
