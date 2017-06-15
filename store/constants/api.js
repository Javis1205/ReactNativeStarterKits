import { Platform } from 'react-native'

// 10.0.2.2 for default Android Simulator
const LOCAL_IP = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.3.2'

export const API_BASE = 'http://novame.net:3000'
export const API_TIMEOUT = 10000

export const SOCIAL_CONFIG = {
  twitter: {
    consumer_key: 'SHdlhmSexV0yBgvVQI0qdxK8n',
    consumer_secret: 'o2s9ArLF2lgeO0LsyWQyu68jfTirgk1kWLBrrhx2BuaMBtTVqK'
  },
  facebook: {
    //client_id: '253580248403665',
    client_id: '805871992895410',
    client_secret: '88213a66ff8fc3cb4d488f55bce87cd6',
    // client_secret: '33b973b5a3e8c0a4ad3a91e6611b3380'
  }
}