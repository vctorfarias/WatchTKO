import Student from "../classes/student.js";

export default async function loadStudents() {
    const students = [];
    
    const response = await fetch("./scripts/data/data.json");
    const data = await response.json();

    for (let i = 0; i < data.students.length; i++) {
        const student = data.students[i];
        const csvPath = `./scripts/data/${student.nick}/.tko/history.csv`;
        const csvText = await d3.text(csvPath);
        
        // Divide as linhas do CSV
        const rows = csvText.trim().split("\n");

        // Define as chaves que você quer
        const keys = ["hash", "date", "type", "command", "value"];

        // Mapeia as linhas para objetos
        const csvData = rows.map(row => {
            const values = row.split(",").map(value => value.trim());
            return keys.reduce((obj, key, index) => {
                obj[key] = values[index];
                return obj;
            }, {});
        });

        students.push(new Student(i, student.nick, student.name, student.avatar, csvData))
        console.log(`Aluno carregado: ${student.name}\npath: ${csvPath}`);
    }

    return students;
}