function createChartData(data, type = "TEST") {
    // Filtra apenas as linhas com type no tipo
    const testData = data.filter(d => d.type === type);

    let accumulative = 0;
    let question_acc = {};

    // Precisa otimizar essa parte
    const chartData = Object.entries(testData).map(([question_id, question]) => {
        question_acc[question.command] = question.value;
        accumulative = Object.values(question_acc).reduce((total, value ) => total + Number(value), 0);
        
        return {
            value: accumulative,
            date: new Date(question.date),
            question,
        };
    });
    
    return chartData;
}

export default createChartData;