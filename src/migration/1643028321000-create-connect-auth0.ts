import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class createConnectAuth01643028321000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['passwordHash']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'passwordHash',
        type: 'varchar(32)',
      }),
    );
  }
}
