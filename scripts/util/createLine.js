function createLine(chartData, svg, x, y, options = {}) {
    const { color = "green", stroke = 3 } = options;
    let pathData = "";
    for (let i = 0; i < chartData.length; i++) {
        const xPos = x(chartData[i].date);
        const yPos = y(chartData[i].value);

        if (i === 0) {
            pathData += `M ${xPos} ${yPos} `;
        } else {
            const prevY = y(chartData[i - 1].value);
            pathData += `V ${prevY} H ${xPos} V ${yPos} `;
        }
    }

    const linePath = svg.append("path")
        .datum(chartData)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", stroke)
        .attr("d", pathData);

    return linePath;
}

export default createLine;