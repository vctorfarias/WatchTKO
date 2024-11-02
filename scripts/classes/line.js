import createLine from "../util/createLine";
import Markers from "./markers";

export default class Line {
    constructor(svg, student, x, y) {
        this.student = student;
        this.chartData = student.chartData;
        this.x = x;
        this.y = y;
        this.linePath = this.createLinePath(student.color)
        this.linePath = this.createLinePath()
        this.markers = [];
    }

    createLinePath(chartData, options = {}) {
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
    
        return linePath;
    }

    update(x, y) {
        attrPathData(linePathCollision, x, y)
        attrPathData(linePath, x, y)

        this.linePathCollision;
    }

    static attrPathData(linePath, x, y) {
        linePath.attr("d", this.chartData.map((d, i) => {
            const xPos = x(d.date);
            const yPos = y(d.value);

            if (i === 0) return `M ${xPos} ${yPos}`;
            const prevY = y(this.chartData[i - 1].value);
            return `V ${prevY} H ${xPos} V ${yPos}`;
        }).join(" "));
    }
}