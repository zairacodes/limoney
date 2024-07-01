import { Text, View } from "react-native";
import { Redirect } from "expo-router";

export default function Page() {
  return <Redirect href={"/operation"} />;

  // return (
  //   <View>
  //     <View>
  //       <Text>Hello World</Text>
  //     </View>
  //   </View>
  // )
}
