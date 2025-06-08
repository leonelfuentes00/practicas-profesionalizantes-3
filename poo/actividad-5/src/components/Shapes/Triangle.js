import { Shape } from './Shape.js';

export class Triangle extends Shape {
    constructor(id, x, y, base, height, color, ctx) {
        super(id, x, y, color, ctx);
        this.base = base;
        this.height = height;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.base / 2, -this.height);
        this.ctx.lineTo(-this.base / 2, -this.height);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();
    }
}