import * as React from 'react';
import { Appbar } from 'react-native-paper';

interface Props {
  title?: string;
  onBackPress?: () => void;
}

const BackAppbar = (props: Props) => (
  // StatusbarHeight para retirar o padding extra padrao que vem no expo para ios
  <Appbar.Header statusBarHeight={0}>
    <Appbar.BackAction onPress={props.onBackPress} />
    <Appbar.Content title={props.title} titleStyle={{textAlign: 'center'}}/>
  </Appbar.Header>
);

export default BackAppbar;