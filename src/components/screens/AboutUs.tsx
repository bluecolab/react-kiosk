import React from 'react';
import { View, Text, Image } from 'react-native'; //, Pressable
import { useTranslation } from 'react-i18next';

export default function StoryScreen() {
    const { t } = useTranslation();

    return (
        <View className="w-full">
            {/* Title */}
            <Text className="text-h2 font-bold text-center text-[#002D72] mb-[70px] mt-5">
                {t('aboutScreen.missionTitle')}
            </Text>

            <View className="flex-row-reverse items-start mb-8">
                {/* Left Image */}
                <Image
                    source={require('@/assets/images/gallery/GE-delivery.jpeg')}
                    style={{
                        width: '47%',
                        height: 400,
                        borderRadius: 10,
                        marginBottom: 60,
                        marginLeft: 50,
                        marginRight: 15,
                    }}
                    resizeMode="cover"
                />

                {/* Content Sections */}
                <View className="flex-1">
                    <Text className="text-h2 font-bold mb-5 text-[#002D72]">
                        {t('aboutScreen.safeWater')}
                    </Text>

                    <Text className="text-h2 mb-[25px] text-[#002D72]">
                        {t('aboutScreen.rightToKnow')}
                    </Text>

                    <Text className="text-body mb-4 text-[#374151]">
                        {t('aboutScreen.atPrefix')}{' '}
                        <Text className="font-bold">{t('aboutScreen.theGEC')}</Text>,{' '}
                        <Text className="text-body mb-4">{t('aboutScreen.description')}</Text>{' '}
                        <Text className="font-bold">{t('aboutScreen.blueColab')}</Text>:{' '}
                        {t('aboutScreen.descriptionCont.')}
                    </Text>

                    <Text className="text-body mb-4 text-[#374151]">
                        {t('aboutScreen.location')}{' '}
                        <Text className="font-bold">{t('aboutScreen.rightToKnowBold')}</Text>{' '}
                        {t('aboutScreen.locationEnd')}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-start mb-8">
                {/* Left Image */}
                <Image
                    source={require('@/assets/images/gallery/PXL_20231004_1831536302-1b78496645a2d75f.jpg')}
                    style={{
                        width: '48%',
                        height: 400,
                        borderRadius: 10,
                        marginBottom: 60,
                        marginLeft: 0,
                        marginRight: 50,
                    }}
                    resizeMode="cover"
                />

                {/* Content Sections */}
                <View className="flex-1">
                    <Text className="text-h2 font-bold mb-5 text-[#002D72]">
                        {t('aboutScreen.waterContaminationRisks')}
                    </Text>

                    <Text className="text-body mb-4 text-[#374151]">
                        {t('aboutScreen.contaminationText1')}
                    </Text>

                    <Text className="text-body mb-4 text-[#374151]">
                        • In <Text className="font-bold">{t('aboutScreen.milwaukee')}</Text>,{' '}
                        {t('aboutScreen.milwaukeeText')}
                    </Text>

                    <Text className="text-body mb-4 text-[#374151]">
                        • {t('aboutScreen.hoosickText')}
                    </Text>

                    <Text className="text-body mb-4 text-[#374151]">
                        {t('aboutScreen.globalProblem')}{' '}
                        <Text className="font-bold">{t('aboutScreen.realTime')}</Text>,{' '}
                        {t('aboutScreen.detection')}
                    </Text>
                </View>
            </View>

            {/* Blue CoLab's Approach */}
            <Text className="text-h2 text-center font-bold mt-0 text-[#002D72]">
                {t('aboutScreen.handsOnApproach')}
            </Text>

            <Text className="text-h3 text-center mt-[30px] text-[#374151]">
                {t('aboutScreen.threefoldApproach')}
            </Text>

            <Text className="text-h3 text-center mt-5 text-[#374151]">
                {t('aboutScreen.teamWorkPrefix')}{' '}
                <Text className="font-bold">{t('aboutScreen.teamWorkBold')}</Text>
                {t('aboutScreen.teamWorkSuffix')}
            </Text>

            <Text className="text-h3 text-center mt-5 mb-[40px] text-[#374151]">
                {t('aboutScreen.closingParagraph')}
            </Text>

            {/* Closing Statement */}

            <Text className="text-body text-center mt-[30px] text-[#4b5563] italic">
                <Text className="font-bold">
                    "All of us at Blue CoLab look forward to seeing you on the team."
                </Text>
            </Text>
            <Text className="text-body text-center mt-[15px] text-[#4b5563] italic">
                — <Text className="font-bold">John Cronin, Blue CoLab Director</Text> —
            </Text>
        </View>
    );
}
