import './memberIcon.scss';
import React from 'react';

interface MemberIconProps {
  isNew: boolean,
  isOwner: boolean,
  children?: React.ReactNode,
  label: string,
  onClick?: React.MouseEventHandler,
}

export const MemberIcon = ({ children, label, onClick, isNew, isOwner }: MemberIconProps) => {
  const addPlus = isNew ? 'plus' : 'member-icon__text';
  const owner = isOwner ? 'member-icon__owner-icon' : 'hidden';
  const contentClassNames = `member-icon__content ${isOwner ? 'member-icon__content_owner' : ''}`;

  return (
    <div className="member-icon" onClick={!isOwner ? onClick : () => null}>
      <div className={owner}></div>
      <div className={contentClassNames}>
        <p className={addPlus}>{children}</p>
      </div>
      <div className="member-icon__label">{label}</div>
    </div>
  );
};

MemberIcon.defaultProps = {
  isNew: false,
  isOwner: false,
  children: undefined,
};
