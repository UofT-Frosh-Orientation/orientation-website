import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../state/user/userSlice';
import { getDaysSchedule, getFroshGroupSchedule } from '../../pages/Profile/functions';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
  },
});

const MakeSchedulePDF = () => {
  const { user } = useSelector(userSelector);
  const [froshGroup, setFroshGroup] = useState(user?.froshGroup);
  const scheduleData = getFroshGroupSchedule(froshGroup);
  const days = getDaysSchedule(scheduleData);
  
  return (
    <Document>
      <Page size="A4">
        <View style={{ padding: '0 10px' }}>
          <Text style={{ fontSize: 16, padding: '20px 0' }}>
            F!rosh Schedule 2T3
          </Text>
          {scheduleData.map(day => (
            <>
              <Text style={{ fontSize: 14, padding: '20px 0' }}>
                {day[0]}
              </Text>
              {day.map(event => (
                <>
                  <Text style={{ fontSize: 12, padding: '20px 0' }}>
                    {event['Event Name']}
                  </Text>
                  <Text style={{ fontSize: 10, padding: '20px 0' }}>
                    {event['Start Time']} - {event['End Time']}
                  </Text>
                  {event['Event Location'] ? 
                    <Text style={{ fontSize: 12, padding: '20px 0' }}>
                      {event['Event Location']}
                    </Text> :
                    <> </>
                  }
                  {event['Event Description'] ? 
                    <Text style={{ fontSize: 12, padding: '20px 0' }}>
                      {event['Event Description']}
                    </Text> :
                    <> </>
                  }
                </>
              ))}
            </>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export { MakeSchedulePDF };