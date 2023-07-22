import React from 'react';
import { getFroshGroupSchedule } from '../../pages/Profile/functions';
import { Document, Page, Text, View, Svg, Line, Font, StyleSheet } from '@react-pdf/renderer';
import MainFroshLogo from '../../assets/logo/frosh-main-logo-with-bg.svg';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
  },
  eventBubble: {
    backgroundColor: '#58458f', 
    borderRadius: '10px', 
    padding: '10px', 
    margin: '10px'
  },
  eventName: {
    fontSize: 12, 
    fontWeight: 'bold',
    padding: '10px 0', 
    color: '#fff'
  },
  eventLoc: {
    fontSize: 12, 
    padding: '10px 0', 
    color: '#fff'
  },
  eventDate: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#fff',
    padding: '5px 0'
  },
  eventDesc: {
    fontSize: 12, 
    color: '#fff',
    padding: '10px 0'
  }
});

const MakeSchedulePDF = (froshObject) => {
  const froshGroup = froshObject?.froshGroup;
  const scheduleData = getFroshGroupSchedule(froshGroup);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ padding: '30px' }}>
          <Text style={{ fontSize: 16, color: '#2c1370', padding: '20px 0', fontWeight: 'bold' }}>
            F!rosh Schedule 2T3
          </Text>
          <Svg height="10" width="500">
            <Line x1="0" y1="0" x2="500" y2="0" strokeWidth={4} stroke="rgb(49,25,87)" />
          </Svg>
          {Object.keys(scheduleData).map((day) => (
            <div key={day}>
              <Text style={{ fontSize: 14, padding: '20px 0', color: '#2c1370', fontWeight: 'bold' }}>
                {day}
              </Text>
              {scheduleData[day].map((scheduleDay, index) => (
                <div key={scheduleDay} style={styles.eventBubble}>
                  <Text style={styles.eventName}>
                    {scheduleDay['Event Name']}
                  </Text>
                  <Text style={styles.eventDate}>
                    {scheduleDay['Start Time']} - {scheduleDay['End Time']}
                  </Text>
                  {scheduleDay['Event Location'] ? 
                    <Text style={styles.eventLoc}>
                      {scheduleDay['Event Location']}
                    </Text> : <></>
                  }
                  {scheduleDay['Event Description'] ? 
                    <Text style={styles.eventDesc}>
                      {scheduleDay['Event Description']}
                    </Text> : <></>
                  }
                </div>
              ))}
            </div>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export { MakeSchedulePDF };