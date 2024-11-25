"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const patchService_1 = require("../services/patchService");
async function main() {
    try {
        console.log('Obteniendo la información de los últimos parches...\n');
        const patchUrls = [
            'https://www.dota2.com/datafeed/patchnotes?version=7.37e',
            'https://www.dota2.com/datafeed/patchnotes?version=7.37d',
            'https://www.dota2.com/datafeed/patchnotes?version=7.37c',
            'https://www.dota2.com/datafeed/patchnotes?version=7.37b',
            'https://www.dota2.com/datafeed/patchnotes?version=7.37',
        ];
        const patches = await Promise.all(patchUrls.map((url) => patchService_1.PatchService.fetchPatchData(url)));
        const validPatches = patches.filter((patch) => patch !== null);
        if (validPatches.length > 0) {
            console.log('Parches encontrados:');
            console.log('------------------------');
            validPatches.forEach((patch, index) => {
                console.log(`Parche ${index + 1}:`);
                console.log(`- Versión: ${patch === null || patch === void 0 ? void 0 : patch.version}`);
                console.log(`- Fecha: ${patch === null || patch === void 0 ? void 0 : patch.date.toLocaleString()}`);
                console.log('------------------------');
            });
        }
        else {
            console.log('No se encontró información válida de parches');
        }
    }
    catch (error) {
        console.error('Error al obtener información de parches:');
        console.error('----------------------------');
        if (error instanceof Error) {
            console.error(`Tipo de error: ${error.name}`);
            console.error(`Mensaje: ${error.message}`);
        }
        else {
            console.error('Error desconocido:', error);
        }
        console.error('----------------------------');
        process.exit(1);
    }
}
main()
    .then(() => console.log('Proceso completado'))
    .catch((error) => {
    console.error('Error fatal:', error);
    process.exit(1);
});
