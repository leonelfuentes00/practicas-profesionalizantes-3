import { Shape } from './Shape.js';

export class Rectangle extends Shape {
    constructor(id, x, y, width, height, color, ctx) {
        super(id, x, y, color, ctx);
        this.width = width;
        this.height = height;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.restore();
    }
}