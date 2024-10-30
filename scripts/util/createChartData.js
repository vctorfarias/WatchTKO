function createChartData(data) {
    // Filtra apenas as linhas com "TEST" no tipo
    const testData = data.filter(d => d.type === "TEST");

    let accumulative = 0;
    let question_acc = {};

    const chartData = Object.entries(testData).map(([question_id, question]) => {
        question_acc[question.command] = question.value;
        accumulative = Object.values(question_acc).reduce((total, value ) => total + Number(value), 0);
        
        return {
            question_id,
            value: accumulative,
            date: new Date(question.date),
            question,
        };
    });
    
    return chartData;
}

export default createChartData;