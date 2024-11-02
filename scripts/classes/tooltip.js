export default class Tooltip {
    constructor(container) {
        this.nick = "";
        this.name = "";
        this.avatar = "";

        this.tip = d3.select(container)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background", "white")
            .style("border", "1px solid black")
            .style("padding", "5px");
    }

    setUser(student) {
        this.nick = student.nick;
        this.name = student.name;
        this.avatar = student.avatar;
        return this;
    }

    tooptipUpdateContent(data) {
        this.tip.html(`${this.name}<br>@${this.nick}<br>Questão: @${data.question}<br>Nota: ${data.value}<br>Data: ${data.date}`)
        return this;
    }

    tooltipMove(x, y, data) {
       /**
         * Move the tooltip to a specified position and updates its content.
         * 
         * @param {number} x - The x-coordinate for the tooltip's position.
         * @param {number} y - The y-coordinate for the tooltip's position.
         * @param {Object} data - The data object containing information for the tooltip.
         * @param {string} data.question - The question associated with the tooltip.
         * @param {number} data.value - The score or value related to the question.
         * @param {string} data.date - The date associated with the score.
         * 
         * @returns {this} - Returns the instance for method chaining.
         */
        this.tip.html(`${this.name}<br>@${this.nick}<br>Questão: @${data.question}<br>Nota: ${data.value}<br>Data: ${data.date}`)
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