import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, Svg, Circle, StyleSheet } from '@react-pdf/renderer';
import { QRNormal } from 'react-qrbtf';
import ReactDOMServer from 'react-dom/server';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
  },
  qrcode: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  section: {
    margin: 2,
    padding: 5,
  },
});

const MakeReceipt = (froshObject) => {
  const qr = (
    <QRNormal
      value={froshObject.id}
      type="round"
      opacity={100}
      posType="round"
      otherColor="#320846"
      posColor="#28093A"
      backgroundColor="white"
    />
  );

  const qr64 = ReactDOMServer.renderToString(qr);
  // create dummy element to hold the children
  const svgg = document.createElement('div');
  svgg.innerHTML = qr64;
  const svg = svgg.childNodes[0];

  let currKey = 1,
    t1 = [],
    t2 = [];

  svg.childNodes.forEach((node, key, parent) => {
    t1.push(
      <Circle
        key={currKey}
        cx={Number.parseFloat(node.getAttribute('cx')) * 10}
        cy={Number.parseFloat(node.getAttribute('cy')) * 10}
        r={Number.parseFloat(node.getAttribute('r')) * 10}
        fill={node.getAttribute('fill')}
        stroke={node.getAttribute('stroke')}
        strokeWidth={Number.parseFloat(node.getAttribute('stroke-width')) * 10}
      />,
    );
    currKey++;
  });

  [
    // All nonintrusive displayable form information
    'accessibility',
    'accommodation',
    'accommodationContact',
    'accommodationOther',
    'allergies',
    'birthDate',
    'bursaryRequested',
    'discipline',
    'email',
    'emergencyContactName',
    'emergencyContactNumber',
    'emergencyContactNumberAreaCode',
    'emergencyContactRelationship',
    'firstName',
    'froshGroup',
    'instagram',
    'lastName',
    'legalName',
    'medicalInfo',
    'medication',
    'phoneNumber',
    'phoneNumberAreaCode',
    'photograph',
    'preferredName',
    'pronouns',
    'shirtSize',
    'userType',
    'utorid',
  ].forEach((x, i, a) => {
    t2.push(
      <Text style={{ fontSize: 11 }} key={currKey++}>
        {x}= {Array.isArray(x) ? Array.toString(froshObject[x]) : JSON.stringify(froshObject[x])}
      </Text>,
    );
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.qrcode}>
          <Svg fill="white" style={{ width: '250px' }}>
            {t1}
          </Svg>
          <Text style={{ fontSize: 18, padding: '20px 0' }} key={currKey++}>
            Your Unique QRCode
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={{ fontSize: 18, padding: '20px 0' }} key={currKey++}>
            Please check all of your information to ensure it is correct. If you need to make any
            changes, please email us at{' '}
            <Link src={'mailto:tech@orientation.skule.ca'}>tech@orientation.skule.ca</Link> or reach
            out to us on our Instagram page{' '}
            <Link src={'https://www.instagram.com/froshweek'}>@froshweek</Link>.
          </Text>
          {t2}
        </View>
      </Page>
    </Document>
  );
};

MakeReceipt.propTypes = {
  froshObject: PropTypes.object,
};

export { MakeReceipt };
