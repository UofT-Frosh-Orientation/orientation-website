import React from 'react';
const { Document, Page, Text, View, StyleSheet } = import('@react-pdf/renderer');

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
  },
});

const MakeSchedulePDF = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ padding: '0 10px' }}>
          <Text style={{ fontSize: 16, padding: '20px 0' }}>
            F!rosh Schedule 2T3
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export { MakeSchedulePDF };