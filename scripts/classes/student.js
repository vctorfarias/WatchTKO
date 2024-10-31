import Line from "./line"

export default class Student {
    constructor(name, avatar, chartData) {
        this.name = name;
        this.avatar = avatar;
        this.color = colorScale(this.name);
        this.chartData = chartData;
        this.line = new Line(this.chartData);
        this.markers = new Markers(this.chartData);
    }
}