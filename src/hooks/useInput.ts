import type { ChangeEvent } from 'react';

import { useState } from 'react';

export function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return {
    value,
    onChange,
  };
}
