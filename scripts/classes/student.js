import Line from "./line"
import Github from "./github";

export default class Student {
    constructor(nick, chartData) {
        this.nick = nick;
        this.color = colorScale(this.name);
        this.chartData = chartData;
    }
}