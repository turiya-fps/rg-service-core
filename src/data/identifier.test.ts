import { UniqueIdentifier, UniqueIdentifierFactory } from './identifier.js';

describe(UniqueIdentifier.name, (): void => {
  describe('static', (): void => {
    describe('from()', (): void => {
      it('with string, empty, result in error', (): void => {
        expect(
          () => UniqueIdentifier.from('').unwrap(),
        ).toThrowError('Tried to unwrap: InvalidUniqueIdentifierValueError');
      });

      it('with string, invalid, result in error', (): void => {
        expect(
          () => UniqueIdentifier.from('invalid-uuid').unwrap(),
        ).toThrowError('Tried to unwrap: InvalidUniqueIdentifierValueError');
      });

      it('with string, uuid, result in success', (): void => {
        expect(
          UniqueIdentifier.from('b8734b0b-07a4-43b4-89d8-b8eec9c91fa8')
            .unwrap()
            .toString(),
        ).toStrictEqual('b8734b0b-07a4-43b4-89d8-b8eec9c91fa8');
      });
    });

    describe('must()', (): void => {
      it('with string, empty, result in error', (): void => {
        expect(
          () => UniqueIdentifier.must(''),
        ).toThrowError('Tried to unwrap: InvalidUniqueIdentifierValueError');
      });

      it('with string, invalid, result in error', (): void => {
        expect(
          () => UniqueIdentifier.must('invalid-uuid'),
        ).toThrowError('Tried to unwrap: InvalidUniqueIdentifierValueError');
      });

      it('with string, uuid, result in success', (): void => {
        expect(
          UniqueIdentifier.must('b8734b0b-07a4-43b4-89d8-b8eec9c91fa8')
            .toString(),
        ).toStrictEqual('b8734b0b-07a4-43b4-89d8-b8eec9c91fa8');
      });
    });
  });

  describe('isEqual()', (): void => {
    it('with identity, different, return false', (): void => {
      const a = UniqueIdentifier.from('41f1b8d4-91ec-4e38-8a7d-f932265d00c0').unwrap();
      const b = UniqueIdentifier.from('b2ce8caf-e60e-4aea-8bab-671732b276cf').unwrap();

      expect(
        a.isEqual(b),
      ).toStrictEqual(false);
    });

    it('with identity, same, return true', (): void => {
      const a = UniqueIdentifier.from('41f1b8d4-91ec-4e38-8a7d-f932265d00c0').unwrap();
      const b = UniqueIdentifier.from('41f1b8d4-91ec-4e38-8a7d-f932265d00c0').unwrap();

      expect(
        a.isEqual(b),
      ).toStrictEqual(true);
    });
  });

  describe('toString()', (): void => {
    it('with identity, returns string, uuid', (): void => {
      expect(
        UniqueIdentifier.from('41f1b8d4-91ec-4e38-8a7d-f932265d00c0')
          .unwrap()
          .toString(),
      ).toStrictEqual('41f1b8d4-91ec-4e38-8a7d-f932265d00c0');
    });
  });

  describe('toDirectoryPath()', (): void => {
    it('with identity, returns string, uuid', (): void => {
      expect(
        UniqueIdentifier.from('41f1b8d4-91ec-4e38-8a7d-f932265d00c0')
          .unwrap()
          .toDirectoryPath(),
      ).toStrictEqual('41/f1/b8/d4/91ec/4e38/8a7d/f932265d00c0');
    });
  });
});

describe(UniqueIdentifierFactory.name, (): void => {
  describe('create()', (): void => {
    it('creates uuid', (): void => {
      const factory = new UniqueIdentifierFactory();

      expect(
        factory.create().toString(),
      ).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/);
    });
  });
});
