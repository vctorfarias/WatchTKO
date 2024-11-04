import Tooltip from "./tooltip.js";

export default class Render {
    constructor(students, svg) {
        this.svg = svg
        this.students = students;
        this.lines = this.students.map(student => new Line(this.svg, student, x, y));
        this.tooltip = new Tooltip(this.svg);
    }
}