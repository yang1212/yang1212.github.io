## [路由导航](https://zhuanlan.zhihu.com/p/553544088)
导航方式主要是三种：堆栈导航（StackNavigator）、选项卡导航（TabNavigator）和抽屉导航（DrawerNavigator)，本文案例基于6.x。

### 1、堆栈导航
安装依赖库
```
yarn add @react-navigation/native
yarn add @react-navigation/native-stack
// 辅助
yarn add react-native-screens react-native-safe-area-context
```
App.tsx
````javaScript
import { NavigationContainer } from '@react-navigation/native';
import StackRouter from './router/index'

<NavigationContainer>
   <StackRouter></StackRouter>
</NavigationContainer>
````
index.tsx
````javaScript
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Text,
  View,
  Button
} from 'react-native';
const Stack = createNativeStackNavigator()

function HomeScreen({navigation}): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button 
        onPress={() => navigation.navigate('List')}
        title="To List">
      </Button>
    </View>
  );
}
function ListScreen(): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>List Screen</Text>
    </View>
  );
}
export default function StackRouter(): JSX.Element{
  return (
    <Stack.Navigator  initialRouteName="Home">
      <Stack.Screen name="Home"  component={HomeScreen}/>
      <Stack.Screen name="List" component={ListScreen}/>
    </Stack.Navigator>
  );
}
````

### 2、选项卡导航

安装依赖库
```
yarn add @react-navigation/native
yarn add @react-navigation/bottom-tabs
// 辅助
yarn add react-native-screens react-native-safe-area-context
// 导航不自带icon，如需图标应引入图标库
yarn add  'react-native-vector-icons/Ionicons'
```
App.tsx
````javaScript
import { NavigationContainer } from '@react-navigation/native';
import StackRouter from './router/index'

<NavigationContainer>
   <StackRouter></StackRouter>
</NavigationContainer>
````

index.tsx
````javaScript
import {
  Text,
  View
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

function HomeScreen(): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
function ListScreen(): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>List Screen</Text>
    </View>
  );
}
export default function StackRouter(): JSX.Element{
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // 自定义图标选择与未选中颜色
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home': 'home-outline';
          }
          if (route.name === 'List') {
            iconName = focused ? 'ice-cream': 'ice-cream-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="List" component={ListScreen} />
    </Tab.Navigator>
  )
}

````

### 抽屉式导航
安装依赖库
```
yarn add @react-navigation/native
yarn add @react-navigation/drawer
yarn add react-native-gesture-handler react-native-reanimated
// 辅助
yarn add react-native-screens react-native-safe-area-context
```
App.tsx
````javaScript
import { NavigationContainer } from '@react-navigation/native';
import StackRouter from './router/index'

<NavigationContainer>
   <StackRouter></StackRouter>
</NavigationContainer>
````

index.tsx
````javaScript
import React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

function HomeScreen(): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
function ListScreen(): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>List Screen</Text>
    </View>
  );
}

export default function StackRouter(): JSX.Element{
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="List" component={ListScreen} />
    </Drawer.Navigator>
  );
}


````

