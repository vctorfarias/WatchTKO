function drawStackedAreaChart(data, svg, x, y) {
    // Define as chaves para o gráfico empilhado
    const keys = Array.from(new Set(data.flatMap(d => Object.keys(d).filter(k => k !== "date"))));

    // Cria o empilhamento dos dados
    const stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    const stackedData = stack(data);

    // Define as cores
    const color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeCategory10);

    // Seleciona ou cria grupos de caminhos para atualizar com zoom
    const areas = svg.selectAll(".area")
        .data(stackedData)
        .join("path")
        .attr("class", "area")
        .attr("fill", d => color(d.key))
        .attr("d", d3.area()
            .x(d => x(d.data.date))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]))
        );

    // Função de atualização de zoom para as áreas
    function updateZoomedAreas(newX, newY) {
        areas.attr("d", d3.area()
            .x(d => newX(d.data.date))
            .y0(d => newY(d[0]))
            .y1(d => newY(d[1]))
        );
    }

    return updateZoomedAreas; // Retorna a função de atualização para o zoom
}

export default drawStackedAreaChart;
