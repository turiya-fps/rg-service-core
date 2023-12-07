import type { EntitySchemaRelationOptions, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import type { DatabaseSchemaRelationOptions } from './configuration.js';

/**
 * Default relation settings for `many-to-one`.
 */
export const DATABASE_RELATION_MANY_TO_ONE_DEFAULT_OPTIONS: DatabaseSchemaRelationOptions = {
  lazy: false,
  eager: false,
  nullable: false,

  onUpdate: 'NO ACTION',
  onDelete: 'CASCADE',
};

/**
 * Automatically create a generic relationship mapping for the given {@link table} with optional {@link overrides}.
 */
export const createManyToOneRelation = <T extends string>(
  table: T,
  overrides?: DatabaseSchemaRelationOptions,
): Record<T, EntitySchemaRelationOptions> => {
  return {
    [table]: {
      type: 'many-to-one',
      target: table,

      joinColumn: {
        name: `${table}_id`,
        referencedColumnName: 'id',
      },

      ...DATABASE_RELATION_MANY_TO_ONE_DEFAULT_OPTIONS,
      ...overrides,
    },
  } as unknown as Record<T, EntitySchemaRelationOptions>;
};

/**
 * Automatically create a generic relationship mapping for the given {@link table} and {@link alias} with optional {@link overrides}.
 */
export const createManyToOneRelationWithAlias = <T extends string, A extends string>(
  table: T,
  alias: A,
  overrides?: DatabaseSchemaRelationOptions,
): Record<`${A}_${T}`, EntitySchemaRelationOptions> => {
  return {
    [`${alias}_${table}`]: {
      type: 'many-to-one',
      target: table,

      joinColumn: {
        name: `${alias}_${table}_id`,
        referencedColumnName: 'id',
      },

      ...DATABASE_RELATION_MANY_TO_ONE_DEFAULT_OPTIONS,
      ...overrides,
    },
  } as unknown as Record<`${A}_${T}`, EntitySchemaRelationOptions>;
};

export type JoinMappingData = {
  readonly table: string;
  readonly condition: string;
};

export const createJoinMappingData = (table: string, self: string): JoinMappingData => {
  return {
    table,
    condition: `${table}.id = ${self}.${table}_id`,
  };
};

export const applyLeftJoinForTable = <T extends ObjectLiteral>(qb: SelectQueryBuilder<T>, table: string, self: string) => {
  const mapping = createJoinMappingData(table, self);

  qb.leftJoinAndSelect(
    mapping.table,
    mapping.table,
    mapping.condition,
  );
};

export const createReverseJoinMappingData = (table: string, self: string): JoinMappingData => {
  return {
    table,
    condition: `${table}.${self}_id = ${self}.id`,
  };
};

export const applyReverseLeftJoinForTable = <T extends ObjectLiteral>(qb: SelectQueryBuilder<T>, table: string, self: string) => {
  const mapping = createReverseJoinMappingData(table, self);

  qb.leftJoinAndSelect(
    mapping.table,
    mapping.table,
    mapping.condition,
  );
};
