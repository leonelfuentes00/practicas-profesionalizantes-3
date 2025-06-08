import { Shape } from './Shape.js';

export class Triangle extends Shape {
    constructor(id, x, y, base, height, color, ctx) {
        super(id, x, y, color, ctx);
        this.base = base;
        this.height = height;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.base / 2, this.y - this.height);
        this.ctx.lineTo(this.x - this.base / 2, this.y - this.height);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}