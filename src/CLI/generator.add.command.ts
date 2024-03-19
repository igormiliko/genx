
import { argv } from "process";
import generatorTemplate from "./Templates/generator.template";
import fs from 'fs'
import interpolatePattern from "../Utils/interpolatePattern";

function main() {
    let [_, __, 
        generatorName
    ] = argv

    let template = generatorTemplate
        .replace(interpolatePattern('generatorName'), generatorName)

    fs.writeFile(`./src/Generators/Components/Pistons/${generatorName.toLowerCase()}.generator.ts`, template, 'utf8', (err) => {
        if (err) {
            console.error('❌ Error while create generator file:', err);
            return;
        }
        console.log('✅ Generator file created!');
    })
    
    const defaultTemplateTemplate = `export default \`\`` 

    fs.writeFile(`./src/Generators/Templates/${generatorName.toLowerCase()}.template.ts`, defaultTemplateTemplate, 'utf8', (err) => {
        if (err) {
            console.error('❌ Error while create generator file:', err);
            return;
        }
        console.log('✅ Template file created!');
    })
}

export default main()
