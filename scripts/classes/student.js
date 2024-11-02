import createChartData from "../util/createChartData.js";

export default class Student {
    constructor(nick, name, avatar, data) {
        this.nick = nick;
        this.name = name;
        this.avatar = avatar;
        this.color = "green";
        this.data = data;
        this.chartData = createChartData(this.data);
    }
}