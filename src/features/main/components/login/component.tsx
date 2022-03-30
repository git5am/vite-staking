import { Dialog, DialogContent, DialogTitle, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { getViteClient } from '../../../../clients/vite.client';
import { getEmitter } from '../../../../util/emitter.util';
import { GlobalEvent } from '../../../../util/types';
import { QrCode } from '../qrcode';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

export const LoginDialog: React.FC<Props> = (props: Props) => {
  const { onClose, open, setOpen } = props;
  const viteClient = getViteClient();
  const emitter = getEmitter();

  useEffect(() => {
    const handleEvent = (open: boolean) => {
      setOpen(open)
    }
    emitter.on(GlobalEvent.ConnectWalletDialog, handleEvent)
    return () => {
      emitter.off(GlobalEvent.ConnectWalletDialog, handleEvent)
    };
  }, [emitter, setOpen]);

  const handleClose = () => {
    onClose();
  };

  if (!viteClient.connector) {
    return (
      <>
      </>
    )
  }

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xs">
      <Grid container justifyContent="center" alignItems="center" color="text.primary">
      <DialogTitle>Connect Wallet</DialogTitle>
      <Typography sx={{ mb: 2}}>Scan the QR code via Vite Wallet App</Typography>
      </Grid>
      <DialogContent sx={{ textAlign: "center", background: "white" }}>
        <Box sx={{ m: 2, textAlign: "center", background: "white" }}>
          <QrCode text={viteClient.connector?.uri}></QrCode>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
