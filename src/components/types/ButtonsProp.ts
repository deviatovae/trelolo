import React, { ReactElement } from 'react';

export interface ButtonProp {
    isRound: boolean,
    children?: ReactElement | string,
    onclick?: React.MouseEventHandler,
}
