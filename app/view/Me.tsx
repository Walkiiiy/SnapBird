import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {UserContext} from '../Context';
import {register, login} from '../interfaces/main';
const MyProfile = ({navigation}) => {
  const {user, setUser} = React.useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handlelogin = async () => {
    const res = await login(password, email);
    if (res != 0) {
      setUser(user => res);
      Alert.alert('登陆成功');
      navigation.navigate('Home');
    } else {
      console.log(email, username, password);
    }
  };
  const handleregister = async () => {
    const res = await register(username, password, email);
    if (res === 1) {
      Alert.alert('注册成功');
      setIsRegister(false);
    } else {
      console.log(email, username, password);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/images/snapbird.png')}
          style={styles.roundImage}
        />
      </View>
      <Text style={styles.title}></Text>

      {isRegister ? (
        <TextInput
          style={styles.input}
          placeholder="用户名"
          value={username}
          onChangeText={setUsername}
        />
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="邮箱"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // 设置为 true，隐藏输入的字符
      />

      {isRegister ? (
        <TouchableOpacity style={styles.button} onPress={handleregister}>
          <Text style={styles.buttonText}>注册</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handlelogin}>
          <Text style={styles.buttonText}>登录</Text>
        </TouchableOpacity>
      )}

      {isRegister ? (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setIsRegister(false);
            }}>
            <Text style={{color: '#007bff', textDecorationLine: 'underline'}}>
              返回
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'white'}}>还没有账号？</Text>
          <TouchableOpacity
            onPress={() => {
              setIsRegister(true);
            }}>
            <Text style={{color: '#007bff', textDecorationLine: 'underline'}}>
              注册
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },

  roundImage: {
    width: 95, // 图像宽度
    height: 95, // 图像高度
    borderRadius: 50, // 将 borderRadius 设置为宽度和高度的一半可以创建圆形效果
    // 如果你的图像不是正方形，请确保 width 和 height 相等，并将 borderRadius 设置为这两个值的一半
    resizeMode: 'cover', // 覆盖整个图像框
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  button: {
    width: '80%',
    padding: 10,
    margin: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default MyProfile;
