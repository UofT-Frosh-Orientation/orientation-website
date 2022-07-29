import QrScanner from 'qr-scanner';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ButtonOutlined } from '../button/ButtonOutlined/ButtonOutlined';
import PropTypes from 'prop-types';
import { SnackbarContext } from '../../util/SnackbarProvider';

export const QRScannerDisplay = ({ setScannedData }) => {
  const [isScanned, setIsScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef();
  const { setSnackbar } = useContext(SnackbarContext);

  let qrScanner = null;

  let scannedResults = '';

  useEffect(() => {
    if (isScanning) {
      const videoElement = videoRef.current;
      qrScanner = new QrScanner(
        videoElement,
        (qrCode) => {
          if (qrCode) {
            if (scannedResults !== qrCode.data) {
              setIsScanned(!isScanned);
              setScannedData(qrCode.data);
              setSnackbar('Scanned QR Code', false);
              scannedResults = qrCode.data;
            }
          }
        },
        {
          onDecodeError: (error) => {},
          highlightScanRegion: true,
          highlightCodeOutline: true,
        },
      );
      qrScanner.setInversionMode('both');
      qrScanner.start();
    }
  }, [isScanning]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ButtonOutlined
        label={isScanning ? 'Stop Scanning' : 'Start Scanning'}
        onClick={() => {
          if (isScanning) {
            qrScanner?.stop();
            qrScanner?.destroy();
            qrScanner = null;
            document.getElementsByClassName('scan-region-highlight-svg')[0].style.display = 'none';
            document.getElementsByClassName('scan-region-highlight')[0].style.display = 'none';
            setIsScanning(false);
          } else {
            setIsScanning(true);
          }
        }}
      />
      <video
        ref={videoRef}
        style={{
          width: '100%',
          borderRadius: '10px',
          height: isScanning ? '100%' : '0px',
          marginBottom: isScanning ? '20px' : '0px',
        }}
      ></video>
    </div>
  );
};

QRScannerDisplay.propTypes = {
  setScannedData: PropTypes.func,
};
