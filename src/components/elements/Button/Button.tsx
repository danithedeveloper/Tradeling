import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  backgroundColor?: string;
  icon?: React.ReactElement;
  isTransparent?: boolean;
  isFullWidth?: boolean;
  isChildrenCentered?: boolean;
  isLoading?: boolean;
  childrenContainerStyle?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  backgroundColor = '',
  isTransparent = false,
  isFullWidth = false,
  isChildrenCentered = true,
  isLoading = false,
  style,
  childrenContainerStyle,
  ...rest
}) => {
  const {colors} = useTheme();
  const baseBackgroundColor = colors.primary;

  const buttonBackgroundColor = isTransparent
    ? 'transparent'
    : backgroundColor || baseBackgroundColor;
  const buttonBorderColor = isTransparent
    ? 'transparent'
    : backgroundColor || baseBackgroundColor;
  const buttonBorderWidth = isTransparent ? 0 : 1;
  const padding = isTransparent ? 0 : 15;
  const width = isFullWidth ? '100%' : 'auto';
  const align:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined = isChildrenCentered ? 'center' : 'flex-start';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: buttonBackgroundColor,
          borderColor: buttonBorderColor,
          borderWidth: buttonBorderWidth,
          padding,
          width,
        },
        style,
      ]}
      {...rest}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View
        style={[
          styles.buttonChildrenContainer,
          {width, justifyContent: align},
          childrenContainerStyle,
        ]}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          children
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
