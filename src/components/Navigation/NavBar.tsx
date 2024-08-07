import { AppShell, NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function Navbar({ close }: any) {
  const navigate = useNavigate();

  return (
    <AppShell.Navbar p="md" style={{ gap: '10px' }}>
      <NavLink
        label="Donate"
        onClick={() => { close(); navigate('/'); }}
        style={{ margin: '5px' }}
      />
      {/* <NavLink
        label="History"
        onClick={() => { close(); navigate('/history')}}
        style={{ margin: '5px' }}
      />
      <NavLink
        label="Settings"
        onClick={() => { close(); navigate('/settings')}}
        style={{ margin: '5px' }}
      /> */}
    </AppShell.Navbar>
  );
};