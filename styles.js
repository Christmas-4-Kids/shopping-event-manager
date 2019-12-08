import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  button: {
    backgroundColor: '#112430',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  },
  closeButton: {
    backgroundColor: '#D02B42', //'#EF334C',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  nativeCloseContainer: {
    alignItems: 'flex-end',
    right: 1,
  },
  nativeClose: {
    marginRight: 30,
    marginTop: 10,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#FFF',
  },
  textInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
    color: '#000',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  goodScan: {
    textAlign: 'center',
    color: '#32CD32',
    fontSize: 60,
    fontWeight: '800',
    padding: 20,
  },
  badScan: {
    textAlign: 'center',
    color: '#EF334C',
    fontSize: 40,
    fontWeight: '700',
    padding: 20,
  },
  member: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  memberRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  memberPhone: {
    alignItems: 'flex-end',
    right: 1,
  },
  memberName: {
    fontSize: 16,
  },
  memberVerified: {
    fontSize: 16,
  },
  memberNotVerified: {
    fontSize: 16,
  },
  memberAddress: {
    color: '#898989',
  },
});
