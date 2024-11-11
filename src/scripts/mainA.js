import Student from "./classes/student.js"
import Line from "./classes/line.js"
import Tooltip from "./classes/tooltip.js";
import loadStudents from "./util/loadStudents.js";
import drawStackedAreaChart from "./classes/stack.js";

async function main() {
    const container = document.getElementById("graph");
    const svg = d3.create("svg").attr("width", 1000).attr("height", 800);
    const margin = { top: 43, right: 0, bottom: 0, left: 0 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const tooltip = d3.select(container)
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid black")
        .style("padding", "5px")
        .style("opacity", 1)
        .style("display", "none");
        
    const students = await loadStudents();

    console.log(students[0].chartData)
    // Configuração das escalas
    const x = d3.scaleTime()
    .domain(d3.extent(students[0].chartData, d => d.date))
        .range([0, width]);
        
    const y = d3.scaleLinear()
    .domain([0, 70])
    .range([height, 0]);
        
    // Criação dos eixos
    const xAxis = d3.axisTop(x)
        .ticks(d3.timeDay.every(0.8)) // Define intervalos de 1 dia
        .tickFormat(d3.timeFormat("%d/%m %H:%M")) // Formata as datas
        
        const yAxis = d3.axisRight(y).ticks(3);
        
        // Adiciona o Grid (as linhas)
        const gGrid = svg.append("g");
        
        const lines = []
        //students.forEach(student => {
        //    lines.push(new Line(svg, student, x, y));
        //})
        
        const gx = svg.append("g");
        const gy = svg.append("g");
        let isFocus = false;
        // Tooltip de informações
        svg.on("mouseout", (event) => {
            tooltip.style("display", "none")
        })
        .on("click", (event) => {
            const target = d3.select(event.target);
            const studentIndex = target.attr("data-student");
            
            if (target.classed("marker") && isFocus) {
                window.open(`https://github.com/${students[studentIndex].nick}`, "_blank");
            }
            
            if (target.classed("path-collision") || target.classed("marker")) {
                lines.forEach(line => line.hide())
            lines[studentIndex].show()
            isFocus = true;
        } else if (isFocus){
            lines.forEach(line => line.show())
            isFocus = false;
        }
        
    });
    
    // Zoom
    const zoom = d3.zoom()
    .scaleExtent([0.0001, 20])
    .on("zoom", zoomed);

    const updateZoomedAreas = drawStackedAreaChart(students[0].chartData, svg, x, y);
    function zoomed({transform}) {
        let zx = transform.rescaleX(x);
        let zy = transform.rescaleY(y);

        svg.selectAll("circle")
            .attr("cy", d => zy(d.value))
            .attr("cx", d => zx(d.date));

        gGrid.call(d3.axisLeft(zy).tickSize(-width).tickSizeOuter(0).tickFormat("")).selectAll("line")
            .attr("stroke", "rgba(200, 200, 200, 0.8)")
            .attr("stroke-width", 1);
        
        gy.call(yAxis.scale(zy))
        gx.call(xAxis.scale(zx))
            .attr("transform", `translate(0,${height})`);

        //lines.forEach(line => line.update(zx, zy))
        updateZoomedAreas(zx, zy);
        // Tooltip de informações
        svg.on("mousemove", event => {
            const target = d3.select(event.target);
            let studentIndex, d;

            if (target.classed("path-collision")) {
                studentIndex = target.attr("data-student");
                const xPos = d3.pointer(event)[0];

                const transformedXPos = (xPos - transform.x) / transform.k;
                const date = x.invert(transformedXPos);

                tooltip.html(`${students[studentIndex].name}<br>@${students[studentIndex].nick}<br>Data: ${date.toLocaleString('pt-BR')}`)
                    .style("display", "block")
                    .style("left", (event.pageX - 100) + "px")
                    .style("top", (event.pageY - 120) + "px");
            } else if (target.classed("marker")) {
                studentIndex = target.attr("data-student");
                d = target.datum();
                
                tooltip.html(`${students[studentIndex].name}<br>@${students[studentIndex].nick}<br>Questão: @${d.question.command}:${d.question.value}<br>Data: ${d.date.toLocaleString('pt-BR')}`)
                .style("left", (event.pageX - 100) + "px")
                .style("top", (event.pageY - 120) + "px")
                .style("display", "block")
            }
            
        });
    }
    
    svg.call(zoom);
        
    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);   

    container.appendChild(svg.node());
}

main()