"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchService = void 0;
// src/services/patchService.ts
const axios_1 = __importDefault(require("axios"));
class PatchService {
    static async fetchPatchData(url) {
        try {
            const response = await axios_1.default.get(url);
            const data = response.data;
            // Imprime el JSON completo para depuración, si es necesario.
            console.log(`Datos obtenidos de ${url}:`, JSON.stringify(data, null, 2));
            // Ajusta el mapeo de las propiedades relevantes.
            return {
                version: data.patch_number, // Extraer versión desde patch_number.
                date: new Date(data.patch_timestamp * 1000), // Convertir timestamp a milisegundos.
            };
        }
        catch (error) {
            console.error(`Error al obtener datos del parche desde ${url}:`, error);
            return null;
        }
    }
    static async getLatestPatchData() {
        const patchUrls = [
            'https://www.dota2.com/datafeed/patchnotes?version=7.37e',
            'https://www.dota2.com/datafeed/patchnotes?version=7.37d',
            'https://www.dota2.com/datafeed/patchnotes?version=7.37c',
            'https://www.dota2.com/datafeed/patchnotes?version=7.37b',
            'https://www.dota2.com/datafeed/patchnotes?version=7.37',
        ];
        for (const url of patchUrls) {
            const patchData = await this.fetchPatchData(url);
            if (patchData) {
                return patchData;
            }
        }
        return null;
    }
}
exports.PatchService = PatchService;
