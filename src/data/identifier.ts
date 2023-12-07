import { v4 as uuid, validate } from 'uuid';
import { SmartError } from '../error/smart.js';
import type { Result } from '../result.js';
import { Err, Ok } from '../result.js';

/**
 * An error thrown when {@link UniqueIdentifier} is constructed with an invalid value.
 */
export class InvalidUniqueIdentifierValueError extends SmartError {
  public constructor(value: string) {
    const type = value === ''
      ? '[empty]'
      : value;

    super(`Invalid unique identifier value: ${type}`);
  }
}

/**
 * A string representation of {@link UniqueIdentifier}.
 *
 * This is currently a `uuid@v4` standard string.
 */
export type UniqueIdentifierStringValue = string;

/**
 * Validate the given {@link value} is a valid {@link UniqueIdentifierStringValue}.
 */
export const isIdentifierValueValid = (value: UniqueIdentifierStringValue): boolean => {
  return validate(value);
};

/**
 * A representation of a unique identifier that is used across projects.
 */
export class UniqueIdentifier {
  /**
   * Attempt to create an {@link UniqueIdentifier} from the given {@link value}.
   *
   * The accepted values are documented against {@link UniqueIdentifierStringValue} which is an alias type for the string representation.
   * Should validation fail the result will contain a {@link InvalidUniqueIdentifierValueError}.
   */
  public static from(value: UniqueIdentifierStringValue): Result<UniqueIdentifier, InvalidUniqueIdentifierValueError> {
    if (isIdentifierValueValid(value) === false) {
      return Err(new InvalidUniqueIdentifierValueError(value));
    }

    return Ok(new this(value));
  }

  /**
   * Shortcut for {@link from()} and calling unwrap instantly.
   */
  public static must(value: UniqueIdentifierStringValue): UniqueIdentifier {
    return this.from(value).unwrap();
  }

  protected constructor(
    protected readonly value: UniqueIdentifierStringValue,
  ) { }

  /**
   * Check {@link target} matches this identifier.
   */
  public isEqual(target: UniqueIdentifier): boolean {
    return target.value === this.value;
  }

  /**
   * Convert to {@link UniqueIdentifierStringValue}.
   */
  public toString(): UniqueIdentifierStringValue {
    return this.value;
  }

  /**
   * Convert to a directory path for use within blob storage.
   *
   * This essentially splits the uuid into smaller chunks.
   * This is done to reduce the load on interfaces when listing files.
   */
  public toDirectoryPath(): string {
    return this.value.replace(
      /(([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2}))-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{12})/u,
      '$2/$3/$4/$5/$6/$7/$8/$9',
    );
  }
}

/**
 * A factory for creating instances of {@link UniqueIdentifier} use the `uuid` package.
 */
export class UniqueIdentifierFactory {
  /**
   * Create a new {@link UniqueIdentifier}.
   */
  public create(): UniqueIdentifier {
    return UniqueIdentifier.from(uuid()).unwrap();
  }
}
