import * as bracket from './bracket.js';
import * as quote from './quote.js';

/**
 * Generate the syntax for a PostgreSQL short-form cast.
 */
export const cast = (node: string, type: string): string => `${bracket.parenthesis(node)}::${type}`;

/**
 * Generate syntax to cast to a `uuid` column type.
 *
 * For strings ensure you have manually quote the value.
 * For database columns the identifier can be used directly.
 */
export const uuid = (node: string): string => cast(node, 'uuid');

/**
 * Generate syntax to cast to a `integer` column type.
 */
export const integer = (node: string): string => cast(node, 'integer');

/**
 * Generate syntax to cast to a `decimal` column type.
 */
export const decimal = (node: string): string => cast(node, 'decimal');

/**
 * Generate syntax to cast to a `timestamp` column type.
 *
 * For iso dates (as strings) ensure you have manually quoted the value.
 * For database columns the identifier can be used directly.
 */
export const timestamp = (node: string): string => cast(node, 'timestamp');

/**
 * Generate syntax to cast to `jsonb` column type.
 *
 * The value given is always quoted due to the requirement for the cast.
 */
export const jsonb = (value: string): string => cast(quote.single(value), 'jsonb');

/**
 * Generate syntax to cast to a `point` column type.
 *
 * The value given is always quoted due to the requirement for the cast.
 */
export const point = (value: string): string => cast(quote.single(value), 'point');

/**
 * Generate syntax to cast to a `polygon` column type.
 *
 * The value given is always quoted due to the requirement for the cast.
 */
export const polygon = (value: string): string => cast(quote.single(value), 'polygon');
