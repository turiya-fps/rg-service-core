import { fromIsoString } from './date.js';
import { Timestamp, TimestampFactory } from './timestamp.js';

describe(Timestamp.name, (): void => {
  describe('static', (): void => {
    describe('from()', (): void => {
      it('with string, empty, return error', (): void => {
        expect(
          () => Timestamp.from('').unwrap(),
        ).toThrowError('Tried to unwrap: Error');
      });

      it('with string, invalid, return error', (): void => {
        expect(
          () => Timestamp.from('invalid-string').unwrap(),
        ).toThrowError('Tried to unwrap: Error');
      });

      it('with string, iso compliant, return success', (): void => {
        expect(
          Timestamp.from('2023-11-03T09:43:24Z')
            .unwrap()
            .toString(),
        ).toStrictEqual('2023-11-03T09:43:24.000Z');
      });
    });

    describe('must()', (): void => {
      it('with string, empty, return error', (): void => {
        expect(
          () => Timestamp.must(''),
        ).toThrowError('Tried to unwrap: Error');
      });

      it('with string, invalid, return error', (): void => {
        expect(
          () => Timestamp.must('invalid-string'),
        ).toThrowError('Tried to unwrap: Error');
      });

      it('with string, iso compliant, return success', (): void => {
        expect(
          Timestamp.must('2023-11-03T09:43:24Z')
            .toString(),
        ).toStrictEqual('2023-11-03T09:43:24.000Z');
      });
    });

    describe('fromDate()', (): void => {
      it('with date, invalid, return error', (): void => {
        expect(
          () => Timestamp.fromDate(new Date(NaN)).unwrap(),
        ).toThrowError('Tried to unwrap: Error');
      });

      it('with date, valid, return success', (): void => {
        expect(
          Timestamp.fromDate(fromIsoString('2023-11-20T00:00:00Z'))
            .unwrap()
            .toString(),
        ).toStrictEqual('2023-11-20T00:00:00.000Z');
      });
    });

    describe('fromMilliseconds()', (): void => {
      it('with milliseconds, invalid, return error', (): void => {
        expect(
          () => Timestamp.fromMilliseconds(NaN).unwrap(),
        ).toThrowError('Tried to unwrap: Error');
      });

      it('with milliseconds, valid, return success', (): void => {
        expect(
          Timestamp.fromMilliseconds(1699004604000)
            .unwrap()
            .toString(),
        ).toStrictEqual('2023-11-03T09:43:24.000Z');
      });
    });
  });

  describe('isEqual()', (): void => {
    it('with timestamps, different, return false', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-12-20T00:00:00Z').unwrap();

      expect(
        a.isEqual(b),
      ).toStrictEqual(false);
    });

    it('with timestamps, equal, return true', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-11-20T00:00:00Z').unwrap();

      expect(
        a.isEqual(b),
      ).toStrictEqual(true);
    });
  });

  describe('isGreaterThan()', (): void => {
    it('with timestamps, lesser, return true', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-10-20T00:00:00Z').unwrap();

      expect(
        a.isGreaterThan(b),
      ).toStrictEqual(true);
    });

    it('with timestamps, greater, return false', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-12-20T00:00:00Z').unwrap();

      expect(
        a.isGreaterThan(b),
      ).toStrictEqual(false);
    });

    it('with timestamps, equal, return false', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-11-20T00:00:00Z').unwrap();

      expect(
        a.isGreaterThan(b),
      ).toStrictEqual(false);
    });
  });

  describe('isGreaterThanOrEqual()', (): void => {
    it('with timestamps, lesser, return true', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-10-20T00:00:00Z').unwrap();

      expect(
        a.isGreaterThanOrEqual(b),
      ).toStrictEqual(true);
    });

    it('with timestamps, greater, return false', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-12-20T00:00:00Z').unwrap();

      expect(
        a.isGreaterThanOrEqual(b),
      ).toStrictEqual(false);
    });

    it('with timestamps, equal, return true', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-11-20T00:00:00Z').unwrap();

      expect(
        a.isGreaterThanOrEqual(b),
      ).toStrictEqual(true);
    });
  });

  describe('isLessThan()', (): void => {
    it('with timestamps, lesser, return false', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-10-20T00:00:00Z').unwrap();

      expect(
        a.isLessThan(b),
      ).toStrictEqual(false);
    });

    it('with timestamps, greater, return true', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-12-20T00:00:00Z').unwrap();

      expect(
        a.isLessThan(b),
      ).toStrictEqual(true);
    });

    it('with timestamps, equal, return false', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-11-20T00:00:00Z').unwrap();

      expect(
        a.isLessThan(b),
      ).toStrictEqual(false);
    });
  });

  describe('isLessThanOrEqual()', (): void => {
    it('with timestamps, lesser, return false', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-10-20T00:00:00Z').unwrap();

      expect(
        a.isLessThanOrEqual(b),
      ).toStrictEqual(false);
    });

    it('with timestamps, greater, return true', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-12-20T00:00:00Z').unwrap();

      expect(
        a.isLessThanOrEqual(b),
      ).toStrictEqual(true);
    });

    it('with timestamps, equal, return true', (): void => {
      const a = Timestamp.from('2023-11-20T00:00:00Z').unwrap();
      const b = Timestamp.from('2023-11-20T00:00:00Z').unwrap();

      expect(
        a.isLessThanOrEqual(b),
      ).toStrictEqual(true);
    });
  });

  describe('toString()', (): void => {
    it('with timestamp, returns string, iso compliant', (): void => {
      expect(
        Timestamp.from('2023-11-03T09:43:24Z')
          .unwrap()
          .toString(),
      ).toStrictEqual('2023-11-03T09:43:24.000Z');
    });
  });

  describe('toDate()', (): void => {
    it('with timestamp, returns string, iso compliant', (): void => {
      expect(
        Timestamp.from('2023-11-03T09:43:24Z')
          .unwrap()
          .toDate(),
      ).toStrictEqual(fromIsoString('2023-11-03T09:43:24Z'));
    });
  });

  describe('toMilliseconds()', (): void => {
    it('with timestamp, returns string, iso compliant', (): void => {
      expect(
        Timestamp.from('2023-11-03T09:43:24Z')
          .unwrap()
          .toMilliseconds(),
      ).toStrictEqual(1699004604000);
    });
  });

  describe('toUnixTimestamp()', (): void => {
    it('with timestamp, returns string, iso compliant', (): void => {
      expect(
        Timestamp.from('2023-11-03T09:43:24Z')
          .unwrap()
          .toUnixTimestamp(),
      ).toStrictEqual(1699004604);
    });
  });
});

describe(TimestampFactory.name, (): void => {
  describe('create()', (): void => {
    it('can create timestamps', (): void => {
      const factory = new TimestampFactory();

      expect(
        factory.create(),
      ).toBeTypeOf('object');
    });
  });
});
