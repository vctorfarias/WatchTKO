export default class Tooltip {
    constructor(container) {
        this.student = undefined;

        this.tip = d3.select(container)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background", "white")
            .style("border", "1px solid black")
            .style("padding", "5px");
    }

    setStudent(student) {
        this.student = student;
        return this;
    }

    updateContent(data) {
        this.tip.html(`${this.student.name}<br>@${this.student.nick}<br>Questão: @${data.question}<br>Nota: ${data.value}<br>Data: ${data.date}`);
        return this;
    }

    move(x, y) {
        this.tip
            .style("left", (x - 100) + "px")
            .style("top", (y - 150) + "px")
            .style("opacity", 1);
        
        return this;
    }

    hide() {
        this.tip.style("opacity", 1);
    
        return this;
    }

    show() {
        this.tip.style("opacity", 0);
    
        return this;
    }
}