import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const container = document.getElementById("graph");
const svg = d3.create("svg").attr("width", 800).attr("height", 600);
const margin = { top: 60, right: 0, bottom: 0, left: 0 };
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;

const tooltip = d3.select(container)
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background", "white")
    .style("border", "1px solid black")
    .style("padding", "5px");

d3.csv("./scripts/data/history-vctorfarias.csv").then(data => {
    // Filtra apenas as linhas com "TEST" no tipo
    const testData = data.filter(d => d.type === "TEST");

    let accumulative = 0
    let question_acc = {}

    const chartData = Object.entries(testData).map(([question_id, question]) => {

        question_acc[question.command] = question.value;
        accumulative = Object.values(question_acc).reduce((total, value ) => total + Number(value), 0)
        
        return {
            question_id,
            value: accumulative,
            date: new Date(question.date),
            question,
        };
    });

    console.log(chartData)

    // Configuração das escalas
    const x = d3.scaleTime()
        .domain(d3.extent(chartData, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.value) + 100])
        .range([height, 0]);
        
    // Criação dos eixos
    const xAxis = d3.axisBottom(x)
        .ticks(d3.timeDay.every(0.5)) // Define intervalos de 1 dia
        .tickFormat(d3.timeFormat("%d/%m %H:%M")) // Formata as datas

    const yAxis = d3.axisRight(y).ticks(10);

    svg.append("g")
        .attr("class", "axis-x")
        .attr("transform", `translate(0,${height})`)

    svg.append("g")
        .attr("class", "axis-y") // Classe para estilização, se necessário

    let pathData = "";
    for (let i = 0; i < chartData.length; i++) {
        const xPos = x(chartData[i].date);
        const yPos = y(chartData[i].value);

        if (i === 0) {
            pathData += `M ${xPos} ${yPos} `;
        } else {
            const prevY = y(chartData[i - 1].value);
            // Linha vertical até o ponto anterior
            pathData += `V ${prevY} `;
            // Linha horizontal até o ponto atual
            pathData += `H ${xPos} `;
            // Linha vertical até o valor atual
            pathData += `V ${yPos} `;
        }
    }

    // Adiciona a linha ao SVG

    const linePath = svg.append("path")
        .datum(chartData)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", pathData);

    linePath.on("mouseover", () => {
        tooltip.transition().duration(200).style("opacity", 1);
    })
    .on("mousemove", (event) => {
        // Obtenha a posição do mouse e converta em tempo
        const xPos = d3.pointer(event)[0];
        const date = x.invert(xPos);
    
        // Atualiza o conteúdo do tooltip
        tooltip.html(`Data: ${date.toLocaleString()}`) // Adicione mais informações conforme necessário
            .style("left", (event.pageX + 50) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
        tooltip.style("opacity", 0);
    });

    svg.selectAll("dot")
        .data(chartData.filter(d => Number(d.question.value) === 100))
        .enter().append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 3)
        .attr("fill", "green")
        .on("click", (event, d) => {
            window.open("https://github.com/vctorfarias", "_blank");
        })
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html(`Github: vctorfarias<br>Questão: @${d.question.command}<br>Nota: ${d.question.value}<br>Data: ${d.date.toLocaleString()}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition().duration(500).style("opacity", 0);
        });
    
    svg.selectAll("dot")
        .data(chartData.filter(d => Number(d.question.value) !== 100))
        .enter().append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 2)
        .attr("fill", "green")
        .on("click", (event, d) => {
            window.open("https://github.com/vctorfarias", "_blank");
        })
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html(`Github: vctorfarias<br>Questão: @${d.question.command}<br>Nota: ${d.question.value}<br>Data: ${d.date.toLocaleString()}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition().duration(500).style("opacity", 0);
        });

        const zoom = d3.zoom()
            .scaleExtent([0.5, 150])
            .on("zoom", zoomed);

        const gGrid = svg.append("g");

        const gx = svg.append("g");
        const gy = svg.append("g");

        svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

        function zoomed({transform}) {
            const zx = transform.rescaleX(x);
            const zy = transform.rescaleY(y);
            
            gy.call(yAxis.scale(zy))
            gx.call(xAxis.scale(zx))
            .attr("transform", `translate(0,${height})`); // Mantém gx fixo na base
            
                svg.selectAll("circle")

                .attr("cx", d => zx(d.date))
                .attr("cy", d => zy(d.value));

                linePath.attr("d", chartData.map((d, i) => {
                    const xPos = zx(d.date);
                    const yPos = zy(d.value);

                    if (i === 0) return `M ${xPos} ${yPos}`;
                    const prevY = zy(chartData[i - 1].value);
                    return `V ${prevY} H ${xPos} V ${yPos}`;
                }).join(" "));

                gGrid.call(d3.axisLeft(zy).tickSize(-width).tickFormat("")).selectAll("line")
                    .attr("stroke", "rgba(200, 200, 200, 0.5)")
                    .attr("stroke-width", 1);
        }

        svg.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity);   
});

d3.csv("./scripts/data/history-vctorfarias2.csv").then(data => {
    // Filtra apenas as linhas com "TEST" no tipo
    const testData = data.filter(d => d.type === "TEST");

    let accumulative = 0
    let question_acc = {}

    const chartData = Object.entries(testData).map(([question_id, question]) => {

        question_acc[question.command] = question.value;
        accumulative = Object.values(question_acc).reduce((total, value ) => total + Number(value), 0)
        
        return {
            question_id,
            value: accumulative,
            date: new Date(question.date),
            question,
        };
    });

    console.log(chartData)

    // Configuração das escalas
    const x = d3.scaleTime()
        .domain(d3.extent(chartData, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.value) + 100])
        .range([height, 0]);
        
    // Criação dos eixos
    const xAxis = d3.axisBottom(x)
        .ticks(d3.timeDay.every(0.5)) // Define intervalos de 1 dia
        .tickFormat(d3.timeFormat("%d/%m %H:%M")) // Formata as datas

    const yAxis = d3.axisRight(y).ticks(10);

    svg.append("g")
        .attr("class", "axis-x")
        .attr("transform", `translate(0,${height})`)

    svg.append("g")
        .attr("class", "axis-y") // Classe para estilização, se necessário

    let pathData = "";
    for (let i = 0; i < chartData.length; i++) {
        const xPos = x(chartData[i].date);
        const yPos = y(chartData[i].value);

        if (i === 0) {
            pathData += `M ${xPos} ${yPos} `;
        } else {
            const prevY = y(chartData[i - 1].value);
            // Linha vertical até o ponto anterior
            pathData += `V ${prevY} `;
            // Linha horizontal até o ponto atual
            pathData += `H ${xPos} `;
            // Linha vertical até o valor atual
            pathData += `V ${yPos} `;
        }
    }

    // Adiciona a linha ao SVG

    const linePath = svg.append("path")
        .datum(chartData)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("d", pathData);

    linePath.on("mouseover", () => {
        tooltip.transition().duration(200).style("opacity", 1);
    })
    .on("mousemove", (event) => {
        // Obtenha a posição do mouse e converta em tempo
        const xPos = d3.pointer(event)[0];
        const date = x.invert(xPos);
    
        // Atualiza o conteúdo do tooltip
        tooltip.html(`Data: ${date.toLocaleString()}`) // Adicione mais informações conforme necessário
            .style("left", (event.pageX + 50) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
        tooltip.style("opacity", 0);
    });

    svg.selectAll("dot")
        .data(chartData.filter(d => Number(d.question.value) === 100))
        .enter().append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 3)
        .attr("fill", "green")
        .on("click", (event, d) => {
            window.open("https://github.com/vctorfarias", "_blank");
        })
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html(`Github: vctorfarias<br>Questão: @${d.question.command}<br>Nota: ${d.question.value}<br>Data: ${d.date.toLocaleString()}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition().duration(500).style("opacity", 0);
        });
    
    svg.selectAll("dot")
        .data(chartData.filter(d => Number(d.question.value) !== 100))
        .enter().append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 2)
        .attr("fill", "green")
        .on("click", (event, d) => {
            window.open("https://github.com/vctorfarias", "_blank");
        })
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html(`Github: vctorfarias<br>Questão: @${d.question.command}<br>Nota: ${d.question.value}<br>Data: ${d.date.toLocaleString()}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition().duration(500).style("opacity", 0);
        });

        const zoom = d3.zoom()
            .scaleExtent([0.5, 150])
            .on("zoom", zoomed);

        const gGrid = svg.append("g");

        const gx = svg.append("g");
        const gy = svg.append("g");

        svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

        function zoomed({transform}) {
            const zx = transform.rescaleX(x);
            const zy = transform.rescaleY(y);
            
            gy.call(yAxis.scale(zy))
            gx.call(xAxis.scale(zx))
            .attr("transform", `translate(0,${height})`); // Mantém gx fixo na base
            
                svg.selectAll("circle")

                .attr("cx", d => zx(d.date))
                .attr("cy", d => zy(d.value));

                linePath.attr("d", chartData.map((d, i) => {
                    const xPos = zx(d.date);
                    const yPos = zy(d.value);

                    if (i === 0) return `M ${xPos} ${yPos}`;
                    const prevY = zy(chartData[i - 1].value);
                    return `V ${prevY} H ${xPos} V ${yPos}`;
                }).join(" "));

                gGrid.call(d3.axisLeft(zy).tickSize(-width).tickFormat("")).selectAll("line")
                    .attr("stroke", "rgba(200, 200, 200, 0.5)")
                    .attr("stroke-width", 1);
        }

        svg.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity);   
});

// Append the SVG element to the container
container.appendChild(svg.node());
