import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable } from 'react-native';

// Minimal props for a pressable tab button without React Navigation types
export type HapticTabButtonProps = {
  onPressIn?: (ev?: any) => void;
  children?: React.ReactNode;
  [key: string]: any;
};

export function HapticTab(props: HapticTabButtonProps) {
  return (
    <Pressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
