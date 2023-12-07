import { instance } from '@matt-usurp/grok/testing.js';
import type { EntitySchemaRelationOptions, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import type { JoinMappingData } from './relation.js';
import { applyLeftJoinForTable, applyReverseLeftJoinForTable, createJoinMappingData, createManyToOneRelation, createManyToOneRelationWithAlias, createReverseJoinMappingData } from './relation.js';

describe('createManyToOneRelation()', (): void => {
  it('with relation data, creates mapping data', (): void => {
    expect(
      createManyToOneRelation('user'),
    ).toStrictEqual<Record<string, EntitySchemaRelationOptions>>({
      user: {
        type: 'many-to-one',
        target: 'user',

        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },

        lazy: false,
        eager: false,
        nullable: false,

        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
    });
  });

  it('with relation data, with overrides, creates mapping data', (): void => {
    expect(
      createManyToOneRelation('user', {
        onDelete: 'SET NULL',
      }),
    ).toStrictEqual<Record<string, EntitySchemaRelationOptions>>({
      user: {
        type: 'many-to-one',
        target: 'user',

        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },

        lazy: false,
        eager: false,
        nullable: false,

        onUpdate: 'NO ACTION',
        onDelete: 'SET NULL',
      },
    });
  });
});

describe('createManyToOneRelationWithAlias()', (): void => {
  it('with relation data, creates mapping data', (): void => {
    expect(
      createManyToOneRelationWithAlias('user', 'owning'),
    ).toStrictEqual<Record<'owning_user', EntitySchemaRelationOptions>>({
      owning_user: {
        type: 'many-to-one',
        target: 'user',

        joinColumn: {
          name: 'owning_user_id',
          referencedColumnName: 'id',
        },

        lazy: false,
        eager: false,
        nullable: false,

        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
    });
  });

  it('with relation data, with overrides, creates mapping data', (): void => {
    expect(
      createManyToOneRelationWithAlias('user', 'owning', {
        onDelete: 'SET NULL',
      }),
    ).toStrictEqual<Record<'owning_user', EntitySchemaRelationOptions>>({
      owning_user: {
        type: 'many-to-one',
        target: 'user',

        joinColumn: {
          name: 'owning_user_id',
          referencedColumnName: 'id',
        },

        lazy: false,
        eager: false,
        nullable: false,

        onUpdate: 'NO ACTION',
        onDelete: 'SET NULL',
      },
    });
  });
});

describe('createJoinMappingData()', (): void => {
  it('can create data mapping for left join', (): void => {
    expect(
      createJoinMappingData('user', 'project'),
    ).toStrictEqual<JoinMappingData>({
      table: 'user',
      condition: 'user.id = project.user_id',
    });
  });
});

describe('applyLeftJoinForTable()', (): void => {
  it('can create data mapping, applies to query builder', (): void => {
    const qb = instance<SelectQueryBuilder<ObjectLiteral>>([
      'leftJoinAndSelect',
    ]);

    applyLeftJoinForTable(qb, 'user', 'project');

    expect(qb.leftJoinAndSelect).toBeCalledTimes(1);
    expect(qb.leftJoinAndSelect).toBeCalledWith<[string, string, string]>(
      'user',
      'user',
      'user.id = project.user_id',
    );
  });
});

describe('createReverseJoinMappingData()', (): void => {
  it('can create data mapping for left join', (): void => {
    expect(
      createReverseJoinMappingData('user', 'project'),
    ).toStrictEqual<JoinMappingData>({
      table: 'user',
      condition: 'user.project_id = project.id',
    });
  });
});

describe('applyReverseLeftJoinForTable()', (): void => {
  it('can create data mapping, applies to query builder', (): void => {
    const qb = instance<SelectQueryBuilder<ObjectLiteral>>([
      'leftJoinAndSelect',
    ]);

    applyReverseLeftJoinForTable(qb, 'user', 'project');

    expect(qb.leftJoinAndSelect).toBeCalledTimes(1);
    expect(qb.leftJoinAndSelect).toBeCalledWith<[string, string, string]>(
      'user',
      'user',
      'user.project_id = project.id',
    );
  });
});
