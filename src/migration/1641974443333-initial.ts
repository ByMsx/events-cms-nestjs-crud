import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initial1641974443333 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'email',
            type: 'varchar(64)',
            isUnique: true,
          },
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'passwordHash',
            type: 'varchar(32)',
          },
        ],
      }),
      true,
      false,
    );

    await queryRunner.createTable(
      new Table({
        name: 'content',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'href',
            type: 'varchar(256)',
            isUnique: true,
          },
          {
            name: 'ownerId',
            type: 'int',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['video', 'audio', 'img', 'html'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['ownerId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'event',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'varchar(32)',
          },
          {
            name: 'datetime',
            type: 'timestamp',
          },
          {
            name: 'ownerId',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['ownerId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'playlist',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'ownerId',
            type: 'int',
          },

          {
            name: 'title',
            type: 'varchar(32)',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['ownerId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'screen',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'eventId',
            type: 'int',
          },
          {
            name: 'playlistId',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['eventId'],
            referencedTableName: 'event',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['playlistId'],
            referencedTableName: 'playlist',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'playlist_content',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'playlistId',
            type: 'int',
          },
          {
            name: 'contentId',
            type: 'int',
          },
          {
            name: 'duration',
            type: 'int',
          },
          {
            name: 'order',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['contentId'],
            referencedTableName: 'content',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['playlistId'],
            referencedTableName: 'playlist',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
    await queryRunner.dropTable('content');
    await queryRunner.dropTable('event');
    await queryRunner.dropTable('playlist');
    await queryRunner.dropTable('screen');
    await queryRunner.dropTable('playlist_content');
  }
}
