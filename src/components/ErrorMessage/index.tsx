import type { FieldErrors } from 'react-hook-form';

import { get, useFormContext } from 'react-hook-form';

interface IErrorMessageProps {
  errors: FieldErrors<any>;
  name: string;
}

export function ErrorMessage({ errors, name }: IErrorMessageProps) {
  const methods = useFormContext();
  const error = get(errors || methods.formState.errors, name);

  if (!error) {
    return null;
  }

  const { message } = error;

  return (
    <span role="alert" style={{ color: 'red' }}>
      {message}
    </span>
  );
}
