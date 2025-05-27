
import React from 'react';

function ProfileSection({ account }) {
  return (
    <div style={{ marginLeft: 'auto', padding: '10px', fontWeight: 'bold' }}>
      Wallet: {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not connected'}
    </div>
  );
}

export default ProfileSection;