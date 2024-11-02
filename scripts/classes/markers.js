const circle_small_radius = 3;

//.data(chartData.filter(d => Number(d.question.value) !== 100))

export default class Markers {
    constructor(svg, x, y) {
        this.svg = svg;
        this.circles = undefined
        this.x = x;
        this.y = y;
    }

    setMarkerData(markerData) {
        this.circles = this.svg.selectAll("dot")
            .data(markerData)
            .enter().append("circle")
            .attr("cx", d => this.x(d.date))
            .attr("cy", d => this.y(d.value));
        return this;
    }

    setRadius(radius) {
        this.circles.attr("r", radius);
        return this;
    }

    setColor(color) {
        this.circles.attr("fill", color);
        return this;
    }
}