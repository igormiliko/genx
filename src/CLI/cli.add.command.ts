import { writeFile, readFile } from "fs";
import { argv } from "process";
import commandTemplate from "./Templates/command.template";


function main() {
    const [_, __, commandName] = argv

    if (!commandName.includes('.')) {
        throw new Error('Please add an action to the command, like: DOMAIN.ADD')
    }

    readFile('package.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error while loading package.json:', err);
            return;
        }

        try {
            // Converte o conteúdo do arquivo para um objeto JSON
            const packageJson = JSON.parse(data);
            const commandFileName = `${commandName}.command.ts`

            if (!packageJson.scripts[commandName]) {
                packageJson.scripts[commandName] = `ts-node src/CLI/${commandFileName}`;
            } else {
                console.log('Command already exist')
            }

            writeFile(`./src/CLI/${commandFileName}`, commandTemplate ,'utf8', (err) => {
                if (err) {
                    console.error('Error while create command:', err);
                    return;
                }
                console.log('Command file created!');
            })

            // Converte o objeto de volta para JSON
            const novoConteudo = JSON.stringify(packageJson, null, 2);

            // Escreve o novo conteúdo de volta para o arquivo package.json
            writeFile('package.json', novoConteudo, 'utf8', (err) => {
                if (err) {
                    console.error('Error while update package.json:', err);
                    return;
                }
                console.log('package.json updated with success!');
            });
        } catch (error) {
            console.error('Error while analyzing the package.json content:', error);
        }
    });
}

export default main()