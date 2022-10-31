import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

import { COLORS, SIZES, FONTS, icons } from '../constants'

const ProfileValue = ({ icon, label, value, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 80,
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            {/* Icon */}
            <View
                style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    backgroundColor: COLORS.additionalColor11
                }}
            >
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.primary
                    }}
                />

            </View>
            {/* Label & Value */}
            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius
                }}
            >
                {label &&
                    <Text
                        style={{
                            color: COLORS.gray30,
                            ...FONTS.body3
                        }}
                    >
                        {label}
                    </Text>
                }

                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    {value}
                </Text>
            </View>

            {/* Icon */}
            <Image
                source={icons.right_arrow}
                style={{
                    width: 15,
                    height: 15,
                }}
            />
        </TouchableOpacity>
    )
}

export default ProfileValue;