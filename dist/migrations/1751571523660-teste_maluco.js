"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TesteMaluco1751571523660 = void 0;
class TesteMaluco1751571523660 {
    constructor() {
        this.name = 'TesteMaluco1751571523660';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`description\` \`description\` text NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
    }
}
exports.TesteMaluco1751571523660 = TesteMaluco1751571523660;
