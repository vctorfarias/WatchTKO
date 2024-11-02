import Tooltip from "./tooltip";

export default class Render {
    constructor(students, svg) {
        this.svg = svg
        this.students = students;
        this.lines = this.students.map(student => new Line(student, this.svg));
        this.tooltip = new Tooltip(this.svg);
    }
}