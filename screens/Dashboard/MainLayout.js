import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';

import {
    Home,
    Profile,
    Search
} from '../../screens';

import { COLORS, SIZES, FONTS, constants } from '../../constants'

const MainLayout = () => {

    const flatListRef = React.useRef()

    function renderContent() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <Animated.FlatList
                    ref={flatListRef}
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
            {/* Content */}
            {renderContent()}

            {/* Bottom Tab */}

        </View>
    )
}

export default MainLayout;