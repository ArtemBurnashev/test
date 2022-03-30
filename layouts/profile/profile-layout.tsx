import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { ProfileLayoutLink } from './profile-layout.styles';
import profileLinks from './profile-links';

const ProfileLayout: React.FC<{
  loading: boolean;
  loadingFallBack?: React.ReactNode;
}> = ({ children, loading, loadingFallBack }) => (
  <Grid container columnSpacing={12}>
    <Grid item xs={4}>
      <Stack gap="2rem">
        {profileLinks.map((link, i) => (
          <ProfileLayoutLink isActive={i === 2} key={link.label}>
            {<link.icon />}{' '}
            <Typography variant="subtitle2">{link.label}</Typography>
          </ProfileLayoutLink>
        ))}
      </Stack>
    </Grid>
    <Grid item xs={8}>
      {loading ? loadingFallBack : children}
    </Grid>
  </Grid>
);

export default ProfileLayout;
