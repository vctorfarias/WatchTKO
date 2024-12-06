import Marker from "./marker.js";

export default class Line {
    constructor(svg, student, x, y) {
        this.svg = svg;
        this.student = student;
        this.chartData = student.dailyChartData;
        this.x = x;
        this.y = y;
        this.linePath = this.createLinePath(svg, student.color);
        this.linePathCollision = this.createLineCollision(svg);
        this.markers = [];
        this.addMarkerQuestionComplete()
        this.addMarkerQuestionNotComplete()
    }

    addMarkerQuestionNotComplete() {
        let marker = new Marker(this.svg, this.student.index, this.x, this.y)
        marker.setMarkerData(this.chartData)
            .setRadius(4)
            .setColor(this.student.color);

        this.markers.push(marker);
    }

    addMarkerQuestionComplete() {
        let marker = new Marker(this.svg, this.student.index, this.x, this.y)
        console.log("b", this.chartData)
        marker.setMarkerData(this.chartData)
            .setRadius(5)
            .setColor(this.student.color);
        
        this.markers.push(marker);
    }

    attrPathData(linePath, x, y) {
        const lineGenerator = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value))
            .curve(d3.curveLinear);
    
        linePath.attr("d", lineGenerator(this.chartData));
    }

    createLinePath(svg, options = {}) {
        const { color = "green", stroke = 3 } = options;
        const linePath = svg.append("path")
            .datum(this.chartData)
            .attr("fill", "none")
            .attr("stroke", this.student.color)
            .attr("stroke-width", stroke)
    
        this.attrPathData(linePath, this.x, this.y);

        return linePath;
    }

    createLineCollision(svg, options = {}) {
        const { color = "rgba(0,0,0,0)", stroke = 13 } = options;
        const linePath = svg.append("path")
            .datum(this.chartData)
            .attr("class", "path-collision")
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", stroke)
            .attr("data-student", this.student.index);
        
        this.attrPathData(linePath, this.x, this.y)
    
        return linePath;
    }

    update(x, y) {
        this.attrPathData(this.linePathCollision, x, y)
        this.attrPathData(this.linePath, x, y)
    }

    hide() {
        this.linePath.style("display", "none");
        this.linePathCollision.style("display", "none");
        this.markers.forEach(marker => {
            marker.hide();
        })
    }
    
    show() {
        this.linePath.style("display", "block");
        this.linePathCollision.style("display", "block");
        this.markers.forEach(marker => {
            marker.show();
        })
    }
}