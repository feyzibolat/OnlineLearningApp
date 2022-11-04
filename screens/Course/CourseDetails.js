import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Animated,
    Keyboard
} from 'react-native';
// import Video from 'react-native-video'
import { Video } from 'expo-av';

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
    dummyData,
} from '../../constants'

const course_details_tabs = constants.course_details_tabs.map((course_details_tab) => ({
    ...course_details_tab,
    ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = course_details_tabs.map((_, i) => i * SIZES.width)
    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.width)
    })

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })

    return (

        <Animated.View
            style={{
                position: 'absolute',
                bottom: 0,
                height: 4,
                width: tabIndicatorWidth,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                transform: [{
                    translateX
                }]
            }}
        />
    )
}

const Tabs = ({ scrollX, onTabPress }) => {
    const [measureLayout, setMeasureLayout] = React.useState([])
    const containerRef = React.useRef()

    React.useEffect(() => {
        let ml = []

        course_details_tabs.forEach(course_details_tab => {
            course_details_tab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    })

                    if (ml.length === course_details_tabs.length) {
                        setMeasureLayout(ml)
                    }
                }
            )
        })
    }, [containerRef.current])

    return (
        <View
            ref={containerRef}
            style={{
                flex: 1,
                flexDirection: 'row',
            }}
        >
            {/* Tab Indicator */}
            {measureLayout.length > 0 &&
                <TabIndicator
                    measureLayout={measureLayout}
                    scrollX={scrollX}
                />
            }

            {/* Tabs */}
            {course_details_tabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={`Tab-${index}`}
                        style={{
                            flex: 1,
                            paddingHorizontal: 15,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            onTabPress(index)
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h3,
                                fontSize: SIZES.height > 800 ? 18 : 17
                            }}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )
            })}

        </View>
    )
}

const CourseDetails = ({ navigation, route }) => {

    const { selectedCourse } = route.params;

    const [playVideo, setPlayVideo] = React.useState(false)

    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current

    const onTabPress = React.useCallback(tabIndex => {
        flatListRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width
        })
    })

    function renderHeaderComponents() {
        return (
            <>
                {/* Back */}
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.black
                        }}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                            backgroundColor: COLORS.white
                        }}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                {/* Share & Favourite */}
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <IconButton
                        icon={icons.media}
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        containerStyle={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />

                    <IconButton
                        icon={icons.favourite_outline}
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        containerStyle={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                </View>

            </>
        )
    }

    function renderHeader() {

        if (playVideo) {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        paddingBottom: SIZES.base,
                        height: 85,
                        backgroundColor: COLORS.black,
                        alignItems: 'flex-end',
                    }}
                >
                    {renderHeaderComponents()}
                </View>
            )
        } else {

            return (

                <View
                    style={{
                        position: 'absolute',
                        top: SIZES.height > 800 ? 40 : 20,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        zIndex: 1
                    }}
                >
                    {renderHeaderComponents()}
                </View>
            )
        }

    }

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
                        onPress={() => setPlayVideo(true)}
                    />
                </ImageBackground>

                {playVideo &&
                    <Video
                        source={{ uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="contain"
                        shouldPlay
                        useNativeControls
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            backgroundColor: COLORS.black
                        }}

                    />
                }
            </View>
        )
    }

    function renderContent() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                {/* Tabs */}
                <View
                    style={{
                        height: 60,
                    }}
                >
                    <Tabs
                        scrollX={scrollX}
                        onTabPress={onTabPress}
                    />
                </View>

                {/* Line Divider */}
                <LineDivider
                    lineStyle={{
                        backgroundColor: COLORS.gray20
                    }}
                />

                {/* Content */}
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    decelerationRate="fast"
                    keyboardDismissMode="on-drag"
                    showsHorizontalScrollIndicator={false}
                    data={constants.course_details_tabs}
                    keyExtractor={item => `CourseDetailsTabs-${item.id}`}
                    onScroll={
                        Animated.event([
                            { nativeEvent: { contentOffset: { x: scrollX } } }
                        ], {
                            useNativeDriver: false
                        })
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    width: SIZES.width
                                }}
                            >
                                {index == 0 && <Text>Chapters</Text>}
                                {index == 1 && <Text>Files</Text>}
                                {index == 2 && <Text>Discussions</Text>}
                            </View>
                        )
                    }}
                />

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
            {/* Header */}
            {renderHeader()}

            {/* Video */}
            {renderVideoSection()}

            {/* Content */}
            {renderContent()}
        </View>
    )
}

export default CourseDetails;