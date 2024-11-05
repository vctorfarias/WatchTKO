const circle_small_radius = 3;

//.data(chartData.filter(d => Number(d.question.value) !== 100))

export default class Marker {
    constructor(svg, index, x, y) {
        this.svg = svg;
        this.index = index;
        this.circles = undefined
        this.x = x;
        this.y = y;
    }

    setMarkerData(markerData) {
        this.circles = this.svg.selectAll("dot")
            .data(markerData)
            .enter().append("circle")
            .attr("class", "marker")
            .attr("class", "marker")
            .attr("data-student", this.index)
            .attr("cx", d => this.x(d.date))
            .attr("cy", d => this.y(d.value))
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

    hide() {
        this.circles.style("display", "none");
    }

    show() {
        this.circles.style("display", "block");
    }
}