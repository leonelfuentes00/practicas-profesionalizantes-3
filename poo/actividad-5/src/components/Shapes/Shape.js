export class Shape {
    constructor(id, x, y, color, ctx) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.ctx = ctx;
        this.angle = 0;
        this.speed = 5;
        this.rotationSpeed = 0.075;
    }

    draw() {
        throw new Error("");
    }

    moveForward() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    }

    moveBackward() {
    this.x -= Math.cos(this.angle) * this.speed;
    this.y -= Math.sin(this.angle) * this.speed;
    }

    rotateLeft() {
    this.angle -= this.rotationSpeed;
    }

    rotateRight() {
    this.angle += this.rotationSpeed;
    }
}
