
import { ScaledSheet, scale, verticalScale, moderateScale } from 'react-native-size-matters'
export const Fonts = {
    Regular: 'Poppins-Regular',
    Medium: 'Poppins-Medium',
    SemiBold: 'Poppins-SemiBold',
    Bold: 'Poppins-Bold',
    ExtraBold: 'Poppins-ExtraBold',
    InterRegular: 'Inter-Regular',
    InterMedium: 'Inter-Medium',
    InterSemiBold: 'Inter-SemiBold',
    InterBold: 'Inter-Bold',
    InterExtraBold: 'Inter-ExtraBold',
    NunitoRegular: 'Nunito-Regular',
    NunitoMedium: 'Nunito-Medium',
    NunitoSemiBold: 'Nunito-SemiBold',
    NunitoBold: 'Nunito-Bold',
    NunitoExtraBold: 'Nunito-ExtraBold',
    Montserrat:'Montserrat-Medium',
    MontSemiBold:'Montserrat-SemiBold',
    MontSemiBlack:'Montserrat-Black',
    MontBold:'Montserrat-Bold',
    MontRegular:'Montserrat-Regular',


}

export const FontSize = {
    _32: 32,
    _30: 30,
    _28: 28,
    _26: 26,
    _25: 25,
    _24: 24,
    _23: 23,
    _22: 22,
    _21: 21,
    _20: 20,
    _18: 18,
    _16: 16,
    _15: 15,
    _14: 14,
    _13: 13,
    _12: 12,
    _11: 11,
    _10: 10,
}


export function normalize(size) {
    return moderateScale(size)
}