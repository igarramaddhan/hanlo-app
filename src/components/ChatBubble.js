import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { color } from '../libs/metrics';

// need to define months and weekdays because moment bug, their locale is bugged
// moment.updateLocale('id', {
//   months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split(
//     '_'
//   ),
//   weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
//   calendar: {
//     lastDay: '[Kemarin]',
//     sameDay: '[Hari Ini]',
//     nextDay: '[Besok]',
//     lastWeek: 'dddd, D MMMM',
//     nextWeek: 'dddd, D MMMM',
//     sameElse: 'dddd, D MMMM YYYY'
//   }
// });

type Props = {
  message: string,
  time: Date,
  isMe?: boolean,
  isOtherDay?: boolean,
  sending?: boolean,
  failed?: boolean
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginRight: 70,
    marginBottom: 3
  },
  message: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 5
  },
  messageText: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 16
  },
  datetime: {
    marginLeft: 2,
    fontSize: 10
  },
  day: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 100,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginVertical: 5,
    fontSize: 12
  },
  failed: {
    color: 'pink'
  }
});

const stylesAlt = StyleSheet.create({
  content: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginLeft: 30,
    marginBottom: 3,
    justifyContent: 'flex-end'
  },
  message: {
    backgroundColor: color.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 20
  },
  messagePadding: {
    marginTop: 10,
    marginRight: 5
  },
  messageText: {
    color: 'white',
    fontSize: 16
  },
  datetime: {
    marginRight: 2,
    fontSize: 10
  }
});

const ChatBubble = ({
  message,
  time,
  isMe,
  isOtherDay,
  sending,
  failed
}: Props) => (
  <View>
    {isOtherDay && <Text style={styles.day}>{moment(time).calendar()}</Text>}
    {isMe ? (
      <View style={stylesAlt.content}>
        {!sending && (
          <Text style={stylesAlt.datetime}>{moment(time).format('HH:mm')}</Text>
        )}
        <View style={stylesAlt.message}>
          <Text selectable style={stylesAlt.messageText}>
            {message}
          </Text>
          {failed && (
            <Text style={styles.failed}>
              Pesan tidak terkirim! Tekan untuk mengirim ulang
            </Text>
          )}
        </View>
      </View>
    ) : (
      <View style={styles.content}>
        <View style={styles.message}>
          <Text selectable style={styles.messageText}>
            {message}
          </Text>
        </View>
        <Text style={styles.datetime}>{moment(time).format('HH:mm')}</Text>
      </View>
    )}
  </View>
);

ChatBubble.defaultProps = {
  isMe: false,
  isOtherDay: false,
  sending: false,
  failed: false
};

export default ChatBubble;
