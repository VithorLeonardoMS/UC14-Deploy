"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teste1751571467603 = void 0;
class Teste1751571467603 {
    constructor() {
        this.name = 'Teste1751571467603';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`description\` \`description\` text NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
    }
}
exports.Teste1751571467603 = Teste1751571467603;
