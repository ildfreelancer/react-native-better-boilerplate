/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  createVariant,
  VariantProps,
  typography,
  color,
  layout,
  LayoutProps,
  TypographyProps,
  spacingShorthand,
  SpacingShorthandProps,
  backgroundColorShorthand,
  BackgroundColorShorthandProps,
  composeRestyleFunctions,
} from '@shopify/restyle';
import {Theme, theme as ThemeValue} from '@styles/theme';
import {
  Button as ButtonElement,
  ButtonProps as RNEButtonProps,
} from '@rneui/themed';
import {TextProps} from '@components/text';
import {flatten, mergeAll} from '@utils/lodash';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '@hooks/useTheme';
import {useTranslation} from 'react-i18next';
import {ReactNode, useMemo} from 'react';
import {fontFamily, fontSize} from '@styles/restyle';
import {BoxProps} from '@components/atom/atom';
import {Icon} from '@components/icon';
import type {IconProps} from '@components/icon';

export type ButtonProps = Omit<RNEButtonProps, 'icon' | 'size'> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> & {
    onPress?: () => void;
  } & VariantProps<Theme, 'buttonVariants'> & {
    labelTx?: string;
    label?: string;
    labelTxOptions?: Record<string, any>;
    labelVariant?: keyof typeof ThemeValue.textVariants;
    labelColor?: keyof typeof ThemeValue.colors;
    _label?: TextProps & TypographyProps<Theme>;
    _container?: BoxProps;
    children?: ReactNode;
    variant?: 'solid' | 'clear' | 'outline' | 'secondary';
    icon?: IconProps;
  };

const composedButtonRestyleFunction = composeRestyleFunctions<Theme, any>([
  layout,
  spacing,
  spacingShorthand,
  border,
  backgroundColor,
  backgroundColorShorthand,
  createVariant({themeKey: 'buttonVariants'}),
]);
const composedContainerButtonRestyleFunction = composeRestyleFunctions<
  Theme,
  any
>([
  layout,
  spacing,
  spacingShorthand,
  border,
  backgroundColor,
  backgroundColorShorthand,
]);
const composedTextRestyleFunction = composeRestyleFunctions<Theme, any>([
  spacing,
  color,
  fontFamily,
  fontSize,
  typography,
  createVariant({themeKey: 'textVariants'}),
]);

const BUTTON_LABEL_VARIANT_MAP = {
  solid: 'buttonSolid',
  clear: 'buttonClear',
  outline: 'buttonOutline',
  secondary: 'buttonSecondary',
};

export const Button = ({
  labelTx,
  label,
  labelTxOptions,
  labelVariant,
  labelColor,
  _label,
  _container,
  titleStyle,
  onPress,
  buttonStyle,
  containerStyle,
  children,
  disabled,
  variant = 'solid',
  loading,
  icon,
  ...rest
}: ButtonProps) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {style: buttonRestyle} = useRestyle(
    composedButtonRestyleFunction as any,
    {
      variant,
      ...rest,
    },
  ) as any;
  const {style: restyleContainerStyle} = useRestyle(
    composedContainerButtonRestyleFunction as any,
    {
      ..._container,
    },
  ) as any;
  const {style: titleRestyle} = useRestyle(composedTextRestyleFunction as any, {
    variant: labelVariant || BUTTON_LABEL_VARIANT_MAP[variant],
    color: labelColor,
    ..._label,
  }) as any;

  const i18nText = labelTx && t(labelTx as any, labelTxOptions);
  const buttonTitle = i18nText || label;

  const disabledStyle = useMemo(() => {
    let temp = {};
    if (loading) {
      temp = {backgroundColor: buttonRestyle[0].backgroundColor, opacity: 0.6};
      return temp;
    }

    if (disabled) {
      if (variant === 'solid') {
        temp = {backgroundColor: theme.colors.bgDisabled};
      } else {
        temp = {
          backgroundColor: buttonRestyle[0].backgroundColor,
          opacity: 0.6,
        };
      }
    }
    return temp;
  }, [buttonRestyle, disabled, loading, theme.colors.bgDisabled, variant]);

  if (children) {
    return (
      <TouchableOpacity
        {...rest}
        style={mergeAll(flatten([buttonRestyle, containerStyle]))}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  const loadingProps = {
    color: 'white',
  };
  if (variant === 'clear') {
    loadingProps.color = theme.colors.primary;
  }

  return (
    <ButtonElement
      activeOpacity={0.8}
      loadingProps={loadingProps}
      TouchableComponent={TouchableOpacity}
      containerStyle={[restyleContainerStyle, containerStyle]}
      buttonStyle={mergeAll(flatten([buttonRestyle, buttonStyle]))}
      title={buttonTitle}
      disabled={disabled}
      disabledStyle={disabledStyle}
      disabledTitleStyle={mergeAll(
        flatten([titleRestyle, titleStyle, {color: theme.colors.textDisabled}]),
      )}
      titleStyle={mergeAll(flatten([titleRestyle, titleStyle]))}
      onPress={onPress}
      loading={loading}
      icon={icon?.name ? <Icon {...(icon as IconProps)} /> : icon}
      {...rest}>
      {children}
    </ButtonElement>
  );
};
