import { Shape } from './Shape.js';

export class Circle extends Shape {
    constructor(id, x, y, radius, color, ctx) {
        super(id, x, y, color, ctx);
        this.radius = radius;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
