type ClassName = string | [string, boolean] | undefined;

const isString = (value: unknown): value is string => typeof value === 'string';

const isBooleanStringTuple = (value: unknown): value is [string, boolean] =>
  Array.isArray(value) &&
  value.length === 2 &&
  typeof value[0] === 'string' &&
  typeof value[1] === 'boolean';

const classNames = (..._classNames: ClassName[]) =>
  _classNames
    .map((className) => {
      if (isString(className)) {
        return className;
      }
      if (isBooleanStringTuple(className) && className[1] === true) {
        return className[0];
      }

      return undefined;
    })
    .filter((className) => className)
    .join(' ');

export default classNames;
