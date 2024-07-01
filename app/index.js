import { Text, View } from 'react-native'
import Header from './components/Header'
import { AccountProvider } from './context/AccountContext'
import { Provider as PaperProvider } from 'react-native-paper'

export default function Page() {
  return (
    <AccountProvider>
      <PaperProvider>
          <View>
            <Header />
            <Text>Hello World</Text>
          </View>
      </PaperProvider>
    </AccountProvider>
  )
}
