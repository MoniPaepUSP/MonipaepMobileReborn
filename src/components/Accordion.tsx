import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  subAccordion?: boolean;
  icon?: React.ReactNode;
  backgroundColor?: string;
  borderColor?:string;
  color?: string;
}

const ICON_SIZE = 24;

export const Accordion = ({ title, children, subAccordion = false, icon, backgroundColor='#f1f1f1', color='#000', borderColor='#f1f1f1' }: AccordionProps) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const rotationAnimation = useRef(new Animated.Value(0)).current;

  const accordionAnimationDuration = 200;
  const iconRotationDuration = 150;

  const toggleAccordion = (): void => {
    if (expanded) {
      //! Closing accordion animation
      Animated.timing(animation, {
        toValue: 0,
        duration: accordionAnimationDuration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start((): void => {
        setExpanded(false);
      });

      //! Icon rotation animation
      Animated.timing(rotationAnimation, {
        toValue: 0,
        duration: iconRotationDuration,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      setExpanded(true);
      //! Opening accordion animation
      Animated.timing(animation, {
        toValue: contentHeight,
        duration: accordionAnimationDuration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();

      //! Icon rotation animation
      Animated.timing(rotationAnimation, {
        toValue: 1,
        duration: iconRotationDuration,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  const setHeight = (height: number): void => {
    setContentHeight(height);
    if (expanded) {
      animation.setValue(height);
    }
  };

  const endRotation = subAccordion ? "-45deg" : "-90deg";
  const rotate = rotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', endRotation],
  });

  const accordionStyle = subAccordion ? styles.subAccordionHeader : styles.accordionHeader;
  const accordionHeaderTextStyle = subAccordion ? styles.subAccordionHeaderText : styles.accordionHeaderText;

  return (
    <View style={{ borderColor, borderWidth: 1, width: '100%' }}>
      <TouchableOpacity onPress={toggleAccordion} style={[accordionStyle, { backgroundColor }]}>
        <View style={styles.accordionContent}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[accordionHeaderTextStyle, { color }]}>{title}</Text>
          <View style={styles.iconWrapper}>
            <Animated.View style={[styles.iconContainer, { transform: [{ rotate }] }]}>
              <AntDesign name={subAccordion ? "plus" : "left"} size={ICON_SIZE} color={color} />
            </Animated.View>
          </View>
        </View>
      </TouchableOpacity>
      <Animated.View style={{ width: "100%", height: animation, overflow: 'hidden', backgroundColor }}>
        <View style={{ paddingLeft: 10 }} onLayout={(event): void => setHeight(event.nativeEvent.layout.height)}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    paddingLeft: 5,
  },
  accordionHeader: {
    backgroundColor: '#f1f1f1',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accordionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
  },
  subAccordionHeader: {
    backgroundColor: '#e1e1e1',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 10,
  },
  accordionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingRight: 10,
    flex: 10,
  },
  subAccordionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 10,
    flex: 10,
  },
  iconContainer: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: 10,
  },
});
