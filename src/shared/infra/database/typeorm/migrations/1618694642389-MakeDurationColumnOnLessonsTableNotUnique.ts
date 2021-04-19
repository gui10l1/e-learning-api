import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class MakeDurationColumnOnLessonsTableNotUnique1618694642389
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('lessons', 'duration');

    await queryRunner.addColumn(
      'lessons',
      new TableColumn({
        name: 'duration',
        type: 'int',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('lessons', 'duration');

    await queryRunner.addColumn(
      'lessons',
      new TableColumn({
        name: 'duration',
        type: 'int',
        isUnique: true,
        isNullable: false,
      }),
    );
  }
}
