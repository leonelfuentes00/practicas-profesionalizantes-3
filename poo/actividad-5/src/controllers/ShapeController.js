export class ShapeController {
    constructor() {
        this.shape = null;
        this.keys = {};
        this.speed = 5;

        window.addEventListener('keydown', e => this.keys[e.key] = true);
        window.addEventListener('keyup', e => this.keys[e.key] = false);
    }

    setTarget(shape) {
        this.shape = shape;
    }

    update() {
        if (!this.shape) return;

        if (this.keys['ArrowUp']) this.shape.move(0, -this.speed);
        if (this.keys['ArrowDown']) this.shape.move(0, this.speed);
        if (this.keys['ArrowLeft']) this.shape.move(-this.speed, 0);
        if (this.keys['ArrowRight']) this.shape.move(this.speed, 0);
    }
}
