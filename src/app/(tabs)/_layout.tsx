import { Tabs } from "expo-router";
import { TabBar } from "../../components/navigation/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation:"shift"
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="main" />
      <Tabs.Screen name="community" />
      <Tabs.Screen name="write-post" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="profile" />  
    </Tabs>
  );
}