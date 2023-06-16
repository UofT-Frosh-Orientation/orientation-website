import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, Svg, Circle, StyleSheet } from '@react-pdf/renderer';
import { QRNormal } from 'react-qrbtf';
import ReactDOMServer from 'react-dom/server';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MakeReceipt = (froshObject) => {
  console.log(froshObject);
  const qr = (
    <QRNormal
      value={froshObject.id}
      styles={{ svg: { width: '120%', margin: '-10%' } }}
      type="round"
      opacity={100}
      posType="round"
      otherColor="#320846"
      posColor="#28093A"
      backgroundColor="white"
    />
  );

  const qr64 = ReactDOMServer.renderToString(qr);
  console.log(qr64);
  // create dummy element to hold the children
  const svgg = document.createElement('div');
  svgg.innerHTML = qr64;
  const svg = svgg.childNodes[0];

  let currKey = 1,
    t1 = [],
    t2 = [];

  svg.childNodes.forEach((node, key, parent) => {
    if (key === 0) {
      console.log(qr64);
      console.log(node.getAttribute('cx'));
      console.log(node.getAttribute('cy'));
      console.log(node.getAttribute('r'));
    }
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
        <View style={styles.section}>
          <Svg fill="white">{t1}</Svg>
          <Text style={{ fontSize: 11 }} key={currKey++}>
            Your Unique QRCode
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
