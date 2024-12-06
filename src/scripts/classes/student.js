import createHistoryChartData from "../util/createHistoryChartData.js";
import createDailyChartData from "../util/createDailyChartData.js";

const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

export default class Student {
    constructor(index, nick, name, avatar, data) {
        this.index = index;
        this.nick = nick;
        this.name = name;
        this.avatar = avatar;
        this.color = colorScale(nick);
        this.historyChartData = createHistoryChartData(data.history);
        this.dailyChartData = createDailyChartData(data.daily);
    }
}