export class Car {
    constructor(x, y, width, height, ctx, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0;
        this.ctx = ctx;
        this.speed = 7;
        this.rotationSpeed = 0.075;
        this.color = color;
        this.laps = 0;
        this.checkpointPassed = false;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.restore();
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

    getBoundingBox() {
        return {
            left: this.x - this.width / 2,
            right: this.x + this.width / 2,
            top: this.y - this.height / 2,
            bottom: this.y + this.height / 2
        };
    }
}
