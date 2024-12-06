import Student from "../classes/student.js";

export default async function loadStudents() {
    const students = [];
    
    const data = await d3.json("./scripts/data/data.json");

    for (let i = 0; i < data.students.length; i++) {
        const student = data.students[i];
        const path = `./scripts/data/${student.nick}/.tko`;
        const historyPath = path + `/history.csv`;
        const dailyPath = path + `/daily.json`;
        const historyText = await d3.text(historyPath);
        
        // Divide as linhas do CSV
        const rows = historyText.trim().split("\n");

        // Define as chaves que você quer
        const keys = ["hash", "date", "type", "command", "value"];

        // Mapeia as linhas para objetos
        const historyData = rows.map(row => {
            const values = row.split(",").map(value => value.trim());
            return keys.reduce((obj, key, index) => {
                obj[key] = values[index];
                return obj;
            }, {});
        });

        
        const dailyData = await d3.json(dailyPath);

        student.data = {
            history: historyData,
            daily: dailyData
        }

        console.log(`Aluno carregado: ${student.name}\npath: ${path}`);
        students.push(new Student(i, student.nick, student.name, student.avatar, student.data));
    }

    return students;
}