const circle_small_radius = 3;

//.data(chartData.filter(d => Number(d.question.value) !== 100))

export default class Markers {
    constructor(svg) {
        this.svg = svg;
    }

    setMarkerData(markerData) {
        this.svg.selectAll("dot")
            .data(markerData)
            .enter().append("circle")
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.value));
        return this;
    }

    setRadius(radius) {
        this.svg.attr("r", radius);
        return this;
    }

    setColor(color) {
        this.svg.attr("fill", color);
        return this;
    }
}