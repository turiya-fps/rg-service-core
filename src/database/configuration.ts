import type { Grok } from '@matt-usurp/grok';
import type { EntitySchemaOptions, EntitySchemaRelationOptions } from 'typeorm';
import type { WithKeyPrefix, WithoutKeyPrefix } from '../data/record.js';
import { withKeyPrefix, withoutKeyPrefix } from '../data/record.js';
import type { IdentityDatabaseValue } from './data/identity.js';

export type DatabaseSchemaColumns<T> = EntitySchemaOptions<T>['columns'];
export type DatabaseSchemaRelations<T> = EntitySchemaOptions<T>['relations'];
export type DatabaseSchemaRelationOptions = Omit<EntitySchemaRelationOptions, 'type' | 'target'>;

export type ColumnsLike = Record<string, unknown>;

export type RelationValueLike = IdentityDatabaseValue | null;
export type RelationsLike = Record<string, RelationValueLike>;

/**
 * Create a compound key of {@link A} and {@link B}.
 */
export type KeyCompound<A extends string, B extends string> = `${A}_${B}`;

/**
 * Enforce the definitions of database columns.
 */
export type MakeDatabaseColumns<T extends ColumnsLike> = T;

/**
 * Enforce the defintions of virtual database columns.
 */
export type MakeDatabaseVirtualColumns<T extends ColumnsLike> = T;

/**
 * Enforce the definitions of database relations.
 */
export type MakeDatabaseRelations<T extends RelationsLike> = T;

/**
 * Declare a generic database relation using the given {@link TableName}.
 */
export type DeclareDatabaseRelation<
  TableName extends string,
  Value extends RelationValueLike = IdentityDatabaseValue,
> = Record<TableName, Value>;

/**
 * Composes a database record from the given {@link Columns} and optional {@link Relations}.
 */
export type ComposeDatabaseRecord<
  Columns extends ColumnsLike,
  Relations extends RelationsLike = never,
> = (
  & Grok.If.IsNever<Columns, unknown, Columns>
  & Grok.If.IsNever<Relations, unknown, AsRelationIdentities<Relations>>
);

/**
 * Composes a database record from the given {@link Columns} and optional {@link Virtuals} and {@link Relations}.
 */
export type ComposeDatabaseRecordWithVirtuals<
  Columns extends ColumnsLike,
  Virtuals extends ColumnsLike = never,
  Relations extends RelationsLike = never,
> = (
  & ComposeDatabaseRecord<Columns, Relations>
  & Grok.If.IsNever<Virtuals, unknown, Virtuals>
);

/**
 * Compose a database record much like {@link ComposeDatabaseRecord} but also use the given {@link Suffix}.
 */
export type ComposeDatabaseRecordWithSuffix<
  TableName extends string,
  Suffix extends string,
  Columns extends ColumnsLike,
> = {
  [K in keyof Columns as K extends string
    ? KeyCompound<KeyCompound<TableName, Suffix>, K>
    : never
  ]: Columns[K];
};

/**
 * Convert the given {@link Relations} to their column representation.
 */
export type AsRelationIdentities<Relations extends RelationsLike> = {
  [K in keyof Relations as K extends string
    ? KeyCompound<K, 'id'>
    : never
  ]: Relations[K];
};

/**
 * Covert the given {@link Columns} to be prefixed by the given {@link TableName}.
 */
export type AsRelationRecord<TableName extends string, Columns extends ColumnsLike> = {
  [K in keyof Columns as K extends string
    ? KeyCompound<TableName, K>
    : never
  ]: Columns[K];
};

/**
 * Enforce the definition of all {@link Columns} and optional {@link Relations} identities.
 */
export const ensureSchemaColumns = <
  Columns extends ColumnsLike,
  Relations extends RelationsLike = never,
>(columns: Required<DatabaseSchemaColumns<ComposeDatabaseRecord<Columns, Relations>>>): DatabaseSchemaColumns<ComposeDatabaseRecord<Columns, Relations>> => {
  return columns as DatabaseSchemaColumns<ComposeDatabaseRecord<Columns, Relations>>;
};

/**
 * Enforce the definitions of all {@link Relations}.
 */
export const ensureSchemaRelations = <
  Relations extends RelationsLike,
>(relations: Required<DatabaseSchemaRelations<Relations>>): DatabaseSchemaRelations<AsRelationIdentities<Relations>> => {
  return relations as DatabaseSchemaRelations<AsRelationIdentities<Relations>>;
};

/**
 * Apply the given {@link prefix} to the given {@link value}.
 */
export const withKeyCompoundPrefix = <
  Prefix extends string,
  Value extends ColumnsLike,
>(prefix: Prefix, value: Value): WithKeyPrefix<KeyCompound<Prefix, ''>, Value> => {
  return withKeyPrefix<KeyCompound<Prefix, ''>, Value>(`${prefix}_`, value);
};

/**
 * Remove the given {@link prefix} to the given {@link value}.
 */
export const withoutKeyCompoundPrefix = <
  Prefix extends string,
  Value extends ColumnsLike,
>(prefix: Prefix, value: Value): WithoutKeyPrefix<KeyCompound<Prefix, ''>, Value> => {
  return withoutKeyPrefix<KeyCompound<Prefix, ''>, Value>(`${prefix}_`, value);
};
