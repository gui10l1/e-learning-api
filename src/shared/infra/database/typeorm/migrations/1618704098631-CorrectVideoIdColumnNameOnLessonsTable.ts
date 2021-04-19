import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CorrectVideoIdColumnNameOnLessonsTable1618704098631
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('lessons', 'video_id ');

    await queryRunner.addColumn(
      'lessons',
      new TableColumn({
        name: 'video_id',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('lessons', 'video_id ');

    await queryRunner.addColumn(
      'lessons',
      new TableColumn({
        name: 'video_id ',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
