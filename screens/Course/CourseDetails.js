import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Animated,
    Keyboard
} from 'react-native';

import {
    IconButton,
    LineDivider,
} from '../../components';

import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    constants,
    dummyData
} from '../../constants'

const CourseDetails = ({ navigation, route }) => {

    const { selectedCourse } = route.params;

    function renderVideoSection() {
        return (
            <View
                style={{
                    height: SIZES.height > 800 ? 220 : 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.gray90
                }}
            >
                {/* Thumbnail */}
                <ImageBackground
                    source={selectedCourse?.thumbnail}
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Play Button */}
                    <IconButton
                        icon={icons.play}
                        iconStyle={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}
                        containerStyle={{
                            width: 55,
                            height: 55,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: SIZES.padding,
                            borderRadius: 30,
                            backgroundColor: COLORS.primary
                        }}
                    />
                </ImageBackground>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Video */}
            {renderVideoSection()}
        </View>
    )
}

export default CourseDetails;