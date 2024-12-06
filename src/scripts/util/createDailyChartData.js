function fillingMissingDays(data, days, startDate, endDate) {
    let daily_filled = [];

    while (startDate <= endDate) {
        const dateStr = startDate.toISOString().split('T')[0];
        
        if (!days.includes(dateStr)) {
            daily_filled.push([dateStr, []]);
        } else {
            daily_filled.push([dateStr, data[dateStr]]);
        }

        startDate.setDate(startDate.getDate() + 1);
    }

    return daily_filled;
}

function  createDailyChartData(data) {
    let days = Object.keys(data)
    let startDate = new Date(days[0]);
    let endDate = new Date(days[days.length - 1]);
    let daily_filled = [];
    let daily_i = {};
    let result = {};

    daily_filled = fillingMissingDays(data, days, startDate, endDate);

    for (let i = 0; i < daily_filled.length; i++) {
        const date = daily_filled[i][0];
        const stringifyTask = daily_filled[i][1];

        if (stringifyTask !== undefined) {
            for (let j = 0; j < daily_filled[i][1].length; j++) {
                let splited = daily_filled[i][1][j].split(":")
                daily_i[splited[0]] = {test: splited[1], self: splited[2]};
            }
        }

        result[date] = Object.assign({}, daily_i);
    }
    console.log("A", data)

    const chartDataArray = Object.entries(result).map(([date, values]) => ({
        date: new Date(date),
        tasks: values,
        evalute: []
    }));

    console.log(chartDataArray)
    return result;
}

export default createDailyChartData;