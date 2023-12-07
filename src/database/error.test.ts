import { DatabaseError, DatabaseItemNotFound, DatabaseQueryError } from './error.js';

describe(DatabaseError.name, (): void => {
  it('has expected message', (): void => {
    expect(
      () => {
        throw new DatabaseError('example');
      },
    ).toThrowError('Database Error: example');
  });
});

describe(DatabaseQueryError.name, (): void => {
  it('has expected message', (): void => {
    expect(
      () => {
        throw new DatabaseQueryError('example');
      },
    ).toThrowError('Database Error: Query Error: example');
  });
});

describe(DatabaseItemNotFound.name, (): void => {
  it('has expected message', (): void => {
    expect(
      () => {
        throw new DatabaseItemNotFound('table-name', 'item-id');
      },
    ).toThrowError('Database Error: Item Not Found: item-id [table-name]');
  });
});
