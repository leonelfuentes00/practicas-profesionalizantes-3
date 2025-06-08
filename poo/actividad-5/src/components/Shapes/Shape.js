export class Shape {
    constructor(id, x, y, color, ctx) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.ctx = ctx;
    }

    draw() {
        throw new Error("");
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}
