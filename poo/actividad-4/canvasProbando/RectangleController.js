export class RectangleController {
    constructor(rectangle, keyMap) {
        this.rectangle = rectangle;
        this.keys = {};
        this.keyMap = keyMap;

        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    update() {
        if (this.keys[this.keyMap.forward]) this.rectangle.moveForward();
        if (this.keys[this.keyMap.backward]) this.rectangle.moveBackward();
        if (this.keys[this.keyMap.left]) this.rectangle.rotateLeft();
        if (this.keys[this.keyMap.right]) this.rectangle.rotateRight();
    }
}