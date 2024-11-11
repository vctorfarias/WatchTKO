function createChartDataSelf(data) {
    // Filtra apenas as entradas do tipo SELF
    let testData = data.filter(d => d.type === "SELF");

    const self_acc = {};
    let accumulative = Array(11).fill(0);

    // Precisa otimizar essa parte
    testData = Object.entries(testData).map(([question_id, question]) => {
        self_acc[question.command] = question.value;
        accumulative = Object.values(self_acc);

        let newArray = Array(11).fill(0);

        // Contagem das ocorrências de cada número no array original
        accumulative.forEach(num => {
            let index = parseInt(num);
            newArray[index] += 1;
        });
        
        return {
            value: newArray,
            date: new Date(question.date),
            question,
        };
    });
    
    return testData;
}

export default createChartDataSelf;