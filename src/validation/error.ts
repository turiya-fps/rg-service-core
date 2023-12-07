export const enum ValidationErrorCode {
  StringLengthTooSmall = 'string.small',

  ArrayLengthTooSmall = 'array.small',

  DateFormatIsoLikeString = 'data.date.format.isolike',
  DateFormatIsoDateString = 'data.date.format.isodate',
  DateFormatIsoDateTimeString = 'data.date.format.isodatetime',

  NullLike = 'data.null.like',

  BooleanLike = 'data.boolean.like',

  IdentityLike = 'identity.like',

  PercentageTooSmall = 'data.percentage.small',
  PercentageTooBig = 'data.percentage.big',
}
