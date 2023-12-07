import { v4 as uuid, validate } from 'uuid';

/**
 * The data type for identities.
 *
 * > As an implementation detail, our current standard dictates that all identities are `uuid@v4` formatted strings.
 *
 * @deprecated use `identifier` module instead, to be remove in ^2.0
 */
export type IdentityValue = string;

/**
 * An object that has a {@link IdentityValue}.
 *
 * @deprecated use `identifier` module instead, to be remove in ^2.0
 */
export type ObjectWithIdentity = {
  readonly id: IdentityValue;
};

/**
 * A factory function that creates instances of {@link IdentityValue}.
 *
 * > As an implementation detail, our current standard dictates that all identities are `uuid@v4` formatted strings.
 *
 * @deprecated use `identifier` module instead, to be remove in ^2.0
 */
export type IdentityFactory = () => IdentityValue;

/**
 * An implementation of {@link IdentityFactory} using the {@link uuid} package.
 *
 * > As an implementation detail, our current standard dictates that all identities are `uuid@v4` formatted strings.
 *
 * @deprecated use `identifier` module instead, to be remove in ^2.0
 */
export const identity: IdentityFactory = (): string => uuid();

/**
 * Check the {@link identity} is a valid identity value.
 *
 * @deprecated use `identifier` module instead, to be remove in ^2.0
 */
export type IdentityValidator = (identity: string) => boolean;

/**
 * An impleemntation of {@link IdentityValidator} using {@link uuid}.
 *
 * @deprecated use `identifier` module instead, to be remove in ^2.0
 */
export const isIdentityValid: IdentityValidator = (identity: string): boolean => validate(identity);

/**
 * Convert a given {@link uuid} identity into a safe directory path.
 *
 * This essentially splits the uuid into smaller chunks.
 * This is done to reduce the load on interfaces when listing files.
 *
 * @deprecated use `identifier` module instead, to be remove in ^2.0
 */
export const toDirectoryPath = (id: string): string => {
  return id.replace(
    /(([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2}))-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{12})/u,
    '$2/$3/$4/$5/$6/$7/$8/$9',
  );
};
