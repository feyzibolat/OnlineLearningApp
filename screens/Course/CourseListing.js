import React from 'react'
import {
    View,
    Text,
    Image,
    Flatlist,
    StyleSheet
} from 'react-native'

import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS
} from 'react-native-reanimated'

import { SharedElement } from "react-navigation-shared-element";

import {
    IconButton,
    HorizontalCourseCard,
    LineDivider
} from '../../components'

import { COLORS, SIZES, FONTS, icons, images, dummyData } from '../../constants'

const CourseListing = ({ navigation, route }) => {

    const { category, sharedElementPrefix } = route.params;

    // Render

    function renderHeader() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 250,
                    overflow: 'hidden',
                }}
            >
                {/* Background Image */}
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Image
                        source={category?.thumbnail}
                        resizeMode="cover"
                        style={{
                            height: '100%',
                            width: '100%',
                            borderBottomLeftRadius: 60
                        }}
                    />
                </SharedElement>

                {/* Title */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 70,
                        left: 30
                    }}
                >
                    <SharedElement
                        id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                        style={[StyleSheet.absoluteFillObject]}
                    >
                        <Text
                            style={{
                                position: 'absolute',
                                color: COLORS.white,
                                ...FONTS.h1
                            }}
                        >
                            {category?.title}
                        </Text>
                    </SharedElement>
                </Animated.View>

                {/* Back */}
                <Animated.View>
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            tintColor: COLORS.black
                        }}
                        containerStyle={{
                            position: 'absolute',
                            top: 40,
                            left: 20,
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: COLORS.white
                        }}
                        
                    />
                </Animated.View>
            </Animated.View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            {renderHeader()}
        </View>
    )
}

CourseListing.sharedElements = (route, otherRoute, showing) => {
    const { category, sharedElementPrefix } = route.params;
    return [
        {
            id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`
        },
        {
            id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`
        }
    ]
}

export default CourseListing;