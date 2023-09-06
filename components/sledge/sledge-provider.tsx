'use client';

import { SledgeProvider } from '@sledge-app/core';
import '@sledge-app/core/style.css';
import { ReactNode } from 'react';

type IProvider = {
  children: ReactNode;
  sledgeSession?: any;
  sledgeSettings?: any;
};

export default function SledgeProviderComponent({
  children,
  sledgeSession,
  sledgeSettings
}: IProvider) {
  return (
    <SledgeProvider
      userId={undefined}
      userEmail={undefined}
      userFullname={undefined}
      sledgeSession={sledgeSession}
      sledgeSettings={sledgeSettings}
    >
      {children}
    </SledgeProvider>
  );
}
