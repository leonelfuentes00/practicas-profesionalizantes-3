export class Track {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.borderColor = 'gray';
        this.startLine = { x: width / 2 - 50, y: 50, width: 100, height: 5 };
    }

    draw() {
        // Borde de pista
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.strokeRect(0, 0, this.width, this.height);

        // Línea de salida/meta
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.startLine.x, this.startLine.y, this.startLine.width, this.startLine.height);
    }

    isOutOfBounds(car) {
        const box = car.getBoundingBox();
        return (
            box.left < 0 ||
            box.right > this.width ||
            box.top < 0 ||
            box.bottom > this.height
        );
    }

    checkLap(car) {
        const box = car.getBoundingBox();
        const sl = this.startLine;

        const crossed = (
            box.bottom >= sl.y &&
            box.top <= sl.y + sl.height &&
            box.right >= sl.x &&
            box.left <= sl.x + sl.width
        );

        if (crossed && !car.checkpointPassed) {
            car.laps += 1;
            car.checkpointPassed = true;
        } else if (!crossed) {
            car.checkpointPassed = false;
        }
    }
}
