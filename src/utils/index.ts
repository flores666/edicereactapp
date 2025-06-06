import { isNil, isEmpty, isObject, isString } from 'lodash';

export const isNullOrEmpty = (value: any): value is null | undefined => {
  if (isNil(value)) return true;
  if (isString(value)) return value === '';
  if (isObject(value)) return isEmpty(value);

  return false;
};
