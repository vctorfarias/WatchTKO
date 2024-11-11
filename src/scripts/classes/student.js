import createChartData from "../util/createChartData.js";
import createChartDataSelf from "../util/createChartDataSelf.js";
const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

export default class Student {
    constructor(index, nick, name, avatar, data) {
        this.index = index;
        this.nick = nick;
        this.name = name;
        this.avatar = avatar;
        this.color = colorScale(nick);
        this.data = data;
        this.chartData = createChartData(this.data);
    }
}