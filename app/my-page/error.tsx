'use client';

import { FC } from 'react';

interface Props {
  error: string;
  reset: () => void;
}

const Error: FC<Props> = ({ error, reset }) => {
  return <div>ERROR</div>;
};

export default Error;
