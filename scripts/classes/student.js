import createChartData from "../util/createChartData.js";
const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

export default class Student {
    constructor(nick, name, avatar, data) {
        this.nick = nick;
        this.name = name;
        this.avatar = avatar;
        this.color = colorScale(nick);
        this.data = data;
        this.chartData = createChartData({nick: this.nick, name: this.name, avatar: this.avatar}, this.data);
    }
}