import { Rectangle } from '../components/Shapes/Rectangle.js';
import { Circle } from '../components/Shapes/Circle.js';
import { Triangle } from '../components/Shapes/Triangle.js';

export class ShapeFactory {
    static createShape(type, config, ctx) {
        const { id, x, y, color } = config;
        switch (type) {
            case 'rectangle':
                return new Rectangle(id, x, y, config.width, config.height, color, ctx);
            case 'circle':
                return new Circle(id, x, y, config.radius, color, ctx);
            case 'triangle':
                return new Triangle(id, x, y, config.base, config.height, color, ctx);
            default:
                throw new Error(`tipo de figura no: ${type}`);
        }
    }
}