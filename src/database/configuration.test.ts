import type { EntitySchemaOptions } from 'typeorm';
import type { WithKeyPrefix, WithoutKeyPrefix } from '../data/record.js';
import type { AsRelationIdentities, AsRelationRecord, ComposeDatabaseRecord, ComposeDatabaseRecordWithSuffix, ComposeDatabaseRecordWithVirtuals, DeclareDatabaseRelation, KeyCompound, MakeDatabaseColumns, MakeDatabaseRelations, MakeDatabaseVirtualColumns } from './configuration.js';
import { ensureSchemaColumns, ensureSchemaRelations, withKeyCompoundPrefix, withoutKeyCompoundPrefix } from './configuration.js';
import type { IdentityDatabaseValue } from './data/identity.js';

describe('type, ComposeDatabaseRecord', (): void => {
  it('with columns only', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    expect<ComposeDatabaseRecord<Columns>>({
      id: 'test:value',
      label: 'test:value',
    }).toBeTruthy();
  });

  it('with columns and relations', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    type Relations = MakeDatabaseRelations<(
      & DeclareDatabaseRelation<'user'>
    )>;

    expect<ComposeDatabaseRecord<Columns, Relations>>({
      id: 'test:value',
      label: 'test:value',
      user_id: 0 as unknown as IdentityDatabaseValue,
    }).toBeTruthy();
  });

  it('with columns and relations with compound key', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    type Relations = MakeDatabaseRelations<(
      & DeclareDatabaseRelation<KeyCompound<'user', 'owning'>>
    )>;

    expect<ComposeDatabaseRecord<Columns, Relations>>({
      id: 'test:value',
      label: 'test:value',
      user_owning_id: 0 as unknown as IdentityDatabaseValue,
    }).toBeTruthy();
  });

  it('with columns and relations, optional relation', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    type Relations = MakeDatabaseRelations<(
      & DeclareDatabaseRelation<'user', IdentityDatabaseValue | null>
    )>;

    expect<ComposeDatabaseRecord<Columns, Relations>>({
      id: 'test:value',
      label: 'test:value',
      user_id: null,
    }).toBeTruthy();
  });
});

describe('type, ComposeRawDatabaseRecord', (): void => {
  it('with columns only', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    expect<ComposeDatabaseRecordWithVirtuals<Columns>>({
      id: 'test:value',
      label: 'test:value',
    }).toBeTruthy();
  });

  it('with columns and virtuals', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    type Virtuals = MakeDatabaseVirtualColumns<{
      readonly session_count: number;
    }>;

    expect<ComposeDatabaseRecordWithVirtuals<Columns, Virtuals>>({
      id: 'test:value',
      label: 'test:value',
      session_count: 0,
    }).toBeTruthy();
  });

  it('with columns and relations with compound key', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    type Virtuals = MakeDatabaseVirtualColumns<{
      readonly session_count: number;
    }>;

    type Relations = MakeDatabaseRelations<(
      & DeclareDatabaseRelation<KeyCompound<'user', 'owning'>>
    )>;

    expect<ComposeDatabaseRecordWithVirtuals<Columns, Virtuals, Relations>>({
      id: 'test:value',
      label: 'test:value',
      session_count: 0,
      user_owning_id: 0 as unknown as IdentityDatabaseValue,
    }).toBeTruthy();
  });

  it('with columns, virtuals and relations', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    type Virtuals = MakeDatabaseVirtualColumns<{
      readonly session_count: number;
    }>;

    type Relations = MakeDatabaseRelations<(
      & DeclareDatabaseRelation<'user'>
    )>;

    expect<ComposeDatabaseRecordWithVirtuals<Columns, Virtuals, Relations>>({
      id: 'test:value',
      label: 'test:value',
      session_count: 0,
      user_id: 0 as unknown as IdentityDatabaseValue,
    }).toBeTruthy();
  });
});

describe('type, ComposeDatabaseRecordWithSuffix', (): void => {
  it('with record, attaches additional prefix', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    type Relations = MakeDatabaseRelations<(
      & DeclareDatabaseRelation<'user'>
    )>;

    type Record = ComposeDatabaseRecord<Columns, Relations>;

    expect<ComposeDatabaseRecordWithSuffix<'user', 'owning', Record>>({
      user_owning_id: 'test:value',
      user_owning_label: 'test:value',
      user_owning_user_id: 0 as unknown as IdentityDatabaseValue,
    }).toBeTruthy();
  });
});

describe('type, AsRelationIdentities', (): void => {
  it('with relations, converts to id suffixes', (): void => {
    type Relations = MakeDatabaseRelations<(
      & DeclareDatabaseRelation<'user'>
    )>;

    expect<AsRelationIdentities<Relations>>({
      user_id: 0 as unknown as IdentityDatabaseValue,
    }).toBeTruthy();
  });
});

describe('type, AsRelationRecord', (): void => {
  it('with record, converts to prefixed', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    type Relations = MakeDatabaseRelations<(
      & DeclareDatabaseRelation<'user'>
    )>;

    type Record = ComposeDatabaseRecord<Columns, Relations>;

    expect<AsRelationRecord<'project', Record>>({
      project_id: 'test:value',
      project_label: 'test:value',
      project_user_id: 0 as unknown as IdentityDatabaseValue,
    }).toBeTruthy();
  });
});

describe('ensureSchemaColumns()', (): void => {
  it('with columns, types enforced', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    expect(
      ensureSchemaColumns<Columns>({
        id: {
          type: 'uuid',
        },

        label: {
          type: 'varchar',
        },
      }),
    ).toStrictEqual<EntitySchemaOptions<unknown>['columns']>({
      id: {
        type: 'uuid',
      },

      label: {
        type: 'varchar',
      },
    });
  });

  it('with columns and relaions, types enforced', (): void => {
    type Columns = MakeDatabaseColumns<{
      readonly id: string;
      readonly label: string;
    }>;

    type Relations = MakeDatabaseRelations<(
      & DeclareDatabaseRelation<'user'>
    )>;

    expect(
      ensureSchemaColumns<Columns, Relations>({
        id: {
          type: 'uuid',
        },

        label: {
          type: 'varchar',
        },

        user_id: {
          type: 'uuid',
        },
      }),
    ).toStrictEqual<EntitySchemaOptions<unknown>['columns']>({
      id: {
        type: 'uuid',
      },

      label: {
        type: 'varchar',
      },

      user_id: {
        type: 'uuid',
      },
    });
  });
});

describe('ensureSchemaRelations()', (): void => {
  it('with relations, types enforced', (): void => {
    type Relations = MakeDatabaseRelations<(
      & DeclareDatabaseRelation<'user'>
    )>;

    expect(
      ensureSchemaRelations<Relations>({
        user: {
          type: 'many-to-one',
          target: 'user',
        },
      }),
    ).toStrictEqual<EntitySchemaOptions<unknown>['relations']>({
      user: {
        type: 'many-to-one',
        target: 'user',
      },
    });
  });
});

describe('withKeyCompoundPrefix()', (): void => {
  it('with values, prefixes with database style', (): void => {
    type TestCase = {
      readonly name: string;
      readonly age: number;
    };

    expect(
      withKeyCompoundPrefix<'foobar', TestCase>('foobar', {
        name: 'test:value',
        age: 43,
      }),
    ).toStrictEqual<WithKeyPrefix<'foobar_', TestCase>>({
      foobar_name: 'test:value',
      foobar_age: 43,
    });
  });
});

describe('withoutKeyCompoundPrefix()', (): void => {
  it('with values, removes prefixes with database style', (): void => {
    type TestCase = {
      readonly test_name: string;
      readonly test_age: number;
    };

    expect(
      withoutKeyCompoundPrefix<'test', TestCase>('test', {
        test_name: 'test:value',
        test_age: 43,
      }),
    ).toStrictEqual<WithoutKeyPrefix<'test_', TestCase>>({
      name: 'test:value',
      age: 43,
    });
  });
});
