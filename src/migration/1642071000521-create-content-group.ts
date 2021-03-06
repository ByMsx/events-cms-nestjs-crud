import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableUnique,
} from 'typeorm';
import { ContentType } from '../content-group/dto/content-type.enum';

export class CreateContentGroup1642071000521 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'content_groups',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isGenerated: true,
            type: 'int',
          },
          {
            name: 'title',
            type: 'varchar(32)',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: [
              ContentType.HTML,
              ContentType.AUDIO,
              ContentType.IMAGE,
              ContentType.VIDEO,
            ],
          },
          {
            name: 'ownerId',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            name: 'content_groups',
            columnNames: ['ownerId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
      true,
    );

    await queryRunner.query(
      'INSERT INTO "content_groups" (id, "type", "ownerId")  SELECT id, "type"::text::content_groups_type_enum AS "type", "ownerId" FROM "content";',
    );

    await queryRunner.addColumns('content', [
      new TableColumn({
        name: 'groupId',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'extra',
        type: 'varchar(64)',
        isNullable: true,
      }),
    ]);
    await queryRunner.query('UPDATE content SET "groupId" = id;');
    await queryRunner.changeColumn(
      'content',
      'groupId',
      new TableColumn({
        name: 'groupId',
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'content',
      new TableForeignKey({
        name: 'content',
        columnNames: ['groupId'],
        referencedTableName: 'content_groups',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.dropColumns('content', ['type', 'ownerId']);
    await queryRunner.addColumn(
      'playlist_content',
      new TableColumn({
        name: 'contentGroupId',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.query(
      'UPDATE playlist_content SET "contentGroupId" = "contentId"',
    );
    await queryRunner.dropColumn('playlist_content', 'contentId');
    await queryRunner.createForeignKey(
      'playlist_content',
      new TableForeignKey({
        name: 'playlist_content',
        columnNames: ['contentGroupId'],
        referencedTableName: 'content_groups',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.addColumn(
      'content',
      new TableColumn({
        isUnique: true,
        isNullable: false,
        name: 'fileKey',
        type: 'varchar(64)',
      }),
    );
    await queryRunner.dropColumn('content', 'href');

    await queryRunner.createUniqueConstraint(
      'content',
      new TableUnique({
        columnNames: ['groupId', 'extra'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      'Not implemented. There is no way to revert migration without loosing data',
    );
  }
}
