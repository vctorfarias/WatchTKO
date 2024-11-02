export default async function loadData() {
    const result = [];

    try {
        const response = await fetch("./scripts/data/files.json");
        const data = await response.json();

        // Agora você pode usar os nomes das pastas
        for (const folder of data.filenames) {
            const csvPath = `./scripts/data/${folder}/.tko/history.csv`;
            const csvText = await d3.text(csvPath);  // Aguarda o carregamento do CSV
            
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

            result.push(csvData);
            console.log(`Dados do arquivo ${csvPath}:`, csvData);
        }
    } catch (error) {
        console.error("Erro ao carregar os nomes das pastas:", error);
    }

    return result;
}