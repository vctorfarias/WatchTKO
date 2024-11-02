import createLine from "./util/createLine.js";
import createLineCollision from "./util/createLineCollision.js"
import createChartData from "./util/createChartData.js";
import loadData from "./util/loadData.js"
import Student from "./classes/student.js"
import Line from "./classes/line.js"
import Tooltip from "./classes/tooltip.js";
import loadStudents from "./util/loadStudents.js";

async function main() {
    const container = document.getElementById("graph");
    const svg = d3.create("svg").attr("width", 1000).attr("height", 800);
    const margin = { top: 60, right: 0, bottom: 0, left: 0 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const stroke_line = 5.0;
    const circle_big_radius = 6.0;
    const circle_small_radius = 5.0;

    const tooltip = d3.select(container)
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid black")
        .style("padding", "5px");
        
    const students = await loadStudents();
    console.log(students)
    //const chartsData = []
    //datas.forEach(data => {
    //    chartsData.push(createChartData(data, "TEST"))
    //});

    //const aluno  = new Student("vctorfarias", "Victor Farias", "", chartsData[0]);
    //const aluno2  = new Student("joaofarias", "João Farias", "", chartsData[1]);
    // const chartData = createChartData(data, "SELF");
    
    // Configuração das escalas
    const x = d3.scaleTime()
        .domain(d3.extent(students[0].chartData, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(students[0].chartData, d => d.value) + 100])
        .range([height, 0]);
        
    // Criação dos eixos
    const xAxis = d3.axisBottom(x)
        .ticks(d3.timeDay.every(0.5)) // Define intervalos de 1 dia
        .tickFormat(d3.timeFormat("%d/%m %H:%M")) // Formata as datas
    
    const yAxis = d3.axisRight(y).ticks(10);
    
    svg.append("g")
        .attr("class", "axis-x")
        .attr("transform", `translate(0,${height})`);
    
    svg.append("g")
        .attr("class", "axis-y");
        
    // Adiciona o Grid (as linhas)
    const gGrid = svg.append("g");
    
    const gx = svg.append("g");
    const gy = svg.append("g");

    const lines = []
    students.forEach(student => {
        lines.push(new Line(svg, student, x, y));
    })

    /*
    svg.selectAll(".path-collision")
        .on("mouseover", () => tooltip.style("opacity", 1) )
        .on("mousemove", (event) => {
            // Obtenha a posição do mouse e converta em tempo
            const xPos = d3.pointer(event)[0];
            const date = x.invert(xPos);
        
            // Atualiza o conteúdo do tooltip
            tooltip.html(`Data: ${date.toLocaleString()}`) // Adicione mais informações conforme necessário
                .style("left", (event.pageX - 100) + "px")
                .style("top", (event.pageY - 50) + "px")
                .style("opacity", 1);
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        });

    svg.selectAll("dot")
        .data(chartData.filter(d => Number(d.question.value) === 100))
        .enter().append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", circle_big_radius)
        .attr("fill", "green")
        .on("click", (event, d) => {
            window.open("https://github.com/vctorfarias", "_blank");
        })
        .on("mouseover", (event, d) => {
            tooltip.html(`Github: vctorfarias<br>Questão: @${d.question.command}<br>Nota: ${d.question.value}<br>Data: ${d.date.toLocaleString()}`)
                .style("left", (event.pageX - 100) + "px")
                .style("top", (event.pageY - 150) + "px")
                .style("opacity", 1);
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX - 100) + "px")
                .style("top", (event.pageY - 150) + "px").style("opacity", 1);
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        });
    
    svg.selectAll("dot")
        .data(chartData.filter(d => Number(d.question.value) !== 100))
        .enter()
        .append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", circle_small_radius)
        .attr("fill", "green")
        .on("click", (event, d) => {
            window.open("https://github.com/vctorfarias", "_blank");
        })
        .on("mouseover", (event, d) => {
            tooltip.style("opacity", 1);
            tooltip.html(`Github: vctorfarias<br>Questão: @${d.question.command}<br>Nota: ${d.question.value}<br>Data: ${d.date.toLocaleString()}`)
                .style("left", (event.pageX - 100) + "px")
                .style("top", (event.pageY - 150) + "px");
        })
        .on("mousemove", (event) => {
            tooltip.style("opacity", 1);
            tooltip.style("left", (event.pageX - 100) + "px")
                .style("top", (event.pageY - 150) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        });

    */

    const zoom = d3.zoom()
        .scaleExtent([0.25, 150])
        .on("zoom", zoomed);

    let datasPath = []
    function zoomed({transform}) {
        requestAnimationFrame(() => {
            const zx = transform.rescaleX(x);
            const zy = transform.rescaleY(y);
            
            gGrid.call(d3.axisLeft(zy).tickSize(-width).tickFormat("")).selectAll("line")
                .attr("stroke", "rgba(200, 200, 200, 0.8)")
                .attr("stroke-width", 1);
            
            gy.call(yAxis.scale(zy))
            gx.call(xAxis.scale(zx))
                .attr("transform", `translate(0,${height})`); // Mantém gx fixo na base
            
            svg.selectAll("circle")
                .attr("cx", d => zx(d.date))
                .attr("cy", d => zy(d.value));

            lines.forEach(line => {
                line.update(zx, zy)
            })
        })
    }
        
    svg.call(zoom);

    svg.transition()
        .duration(0)
        .call(zoom.transform, d3.zoomIdentity);   

    container.appendChild(svg.node());
}

main()