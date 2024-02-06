import * as React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import Touchable from '../Touchable';
import Container from '../Container';
import Text from '../Text';
import styles from './styles';

export type ListRowItemProps = {
  id?: string;
  note?: string;
  title: string;
  subTitle?: string;
  leftIcon?: React.ReactElement;
  onPress?: (data: ListRowItemProps) => void;
};

const ListItem: React.FC<ListRowItemProps> = ({
  id,
  title,
  subTitle,
  leftIcon,

  onPress,
}) => {
  const _onPress = () => {
    onPress &&
      onPress({
        id,
        title,
        subTitle,
        leftIcon,
      });
  };

  return (
    <Touchable style={{flex: 0.5}} onPress={_onPress}>
      <Container>
        <Text>{title}</Text>
      </Container>
    </Touchable>
  );
};

export default ListItem;
