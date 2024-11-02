import Markers from "./markers.js";

export default class Line {
    constructor(svg, student, x, y) {
        this.svg = svg;
        this.student = student;
        this.chartData = student.chartData;
        this.x = x;
        this.y = y;
        this.linePath = this.createLinePath(svg, student.color);
        this.linePathCollision = this.createLineCollision(svg);
        this.markers = [];
        this.addMarkerQuestionNotComplete()
        console.log(this.markers)
    }

    addMarkerQuestionNotComplete() {
        let marker = new Markers(this.svg, this.x, this.y)
        marker.setMarkerData(this.chartData.filter(d => Number(d.question.value) !== 100))
            .setRadius(4)
            .setColor("green");

        this.markers.push(marker);
    }

    attrPathData(linePath, x, y) {
        linePath.attr("d", this.chartData.map((d, i) => {
            const xPos = x(d.date);
            const yPos = y(d.value);

            if (i === 0) return `M ${xPos} ${yPos}`;
            const prevY = y(this.chartData[i - 1].value);
            return `V ${prevY} H ${xPos} V ${yPos}`;
        }).join(" "));
    }

    createLinePath(svg, options = {}) {
        const { color = "green", stroke = 3 } = options;
    
        const linePath = svg.append("path")
            .datum(this.chartData)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", stroke);
    
        this.attrPathData(linePath, this.x, this.y);

        return linePath;
    }

    createLineCollision(svg, options = {}) {
        const { color = "rgba(0,0,0,0)", stroke = 20 } = options;
    
        const linePath = svg.append("path")
            .datum(this.chartData)
            .attr("class", "path-collision")
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", stroke)
        
        this.attrPathData(linePath, this.x, this.y)
    
        return linePath;
    }

    update(x, y) {
        this.attrPathData(this.linePathCollision, x, y)
        this.attrPathData(this.linePath, x, y)
    }
}