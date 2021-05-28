import React from 'react';
import { init, destroy } from '.';

interface IProps {
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
}
/**
 *  React wrapper
 */
export function TsdxThreejsTemplate(props: IProps) {
  // --->>>

  const { width, height, backgroundColor } = {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    ...props,
  };
  const id = 'this-id-will-never-be-duplicated-says-007';

  React.useEffect(() => {
    init(id);
    return () => {
      destroy();
      console.log('Widget app removed!!!');
    };
  }, []);

  return (
    <div
      id={id}
      style={{
        width,
        height,
        backgroundColor,
      }}
    />
  );
}
