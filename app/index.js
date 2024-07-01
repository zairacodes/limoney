import { Text, View } from 'react-native'
import Header from './components/Header'
import { AccountContext, AccountProvider } from './context/AccountContext'

export default function Page() {
  return (
    <AccountProvider>
      <View>
        <View>
          <Header />
          <Text>Hello World</Text>
        </View>
      </View>
    </AccountProvider>
  )
}
