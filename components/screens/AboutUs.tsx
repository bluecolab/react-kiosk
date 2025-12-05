import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native'; //, Pressable
import { useTranslation } from 'react-i18next';

export default function StoryScreen() {
    const { t } = useTranslation();

    return (
        <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
            {/* Title */}
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#002D72',
                    marginBottom: 70,
                    marginTop: 20,
                }}>
                {t('aboutScreen.missionTitle')}
            </Text>

            <View
                style={{
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-start',
                    marginBottom: 30,
                }}>
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
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            color: '#002D72',
                        }}>
                        {t('aboutScreen.safeWater')}
                    </Text>

                    <Text style={{ fontSize: 25, marginBottom: 25, color: '#002D72' }}>
                        {t('aboutScreen.rightToKnow')}
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        At{' '}
                        <Text style={{ fontWeight: 'bold' }}> {t('aboutScreen.blueColab')} </Text>,{' '}
                        {t('aboutScreen.description')}
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        {t('aboutScreen.location')}{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                            {t('aboutScreen.rightToKnowBold')}
                        </Text>{' '}
                        {t('aboutScreen.locationEnd')}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginBottom: 30,
                }}>
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
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 27,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            color: '#002D72',
                        }}>
                        {t('aboutScreen.waterContaminationRisks')}
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        {t('aboutScreen.contaminationText1')}
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        • In{' '}
                        <Text style={{ fontWeight: 'bold' }}>{t('aboutScreen.milwaukee')}</Text>,{' '}
                        {t('aboutScreen.milwaukeeText')}
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        • {t('aboutScreen.hoosickText')}
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        {t('aboutScreen.globalProblem')}{' '}
                        <Text style={{ fontWeight: 'bold' }}>{t('aboutScreen.realTime')}</Text>,{' '}
                        {t('aboutScreen.detection')}
                    </Text>
                </View>
            </View>

            {/* Blue CoLab's Approach */}
            <Text
                style={{
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: 0,
                    color: '#002D72',
                }}>
                {t('aboutScreen.handsOnApproach')}
            </Text>

            <Text
                style={{
                    fontSize: 22,
                    textAlign: 'center',
                    marginTop: 30,
                    color: '#374151',
                }}>
                {t('aboutScreen.threefoldApproach')}
            </Text>

            <Text
                style={{
                    fontSize: 22,
                    textAlign: 'center',
                    marginTop: 20,
                    color: '#374151',
                }}>
                They work in a <Text style={{ fontWeight: 'bold' }}>team-based environment</Text>,
                using Blue CoLab’s dedicated labs, instruments, equipment, and servers.
            </Text>

            <Text
                style={{
                    fontSize: 22,
                    textAlign: 'center',
                    marginTop: 20,
                    marginBottom: 40,
                    color: '#374151',
                }}>
                Blue CoLab stands for everything that makes Seidenberg School a special place —
                harnessing innovation on behalf of society, and providing students with skill-based
                experiences that lead to a career meaningful to them, and to society.
            </Text>

            {/* Closing Statement */}

            <Text
                style={{
                    fontSize: 20,
                    textAlign: 'center',
                    marginTop: 30,
                    color: '#4b5563',
                    fontStyle: 'italic',
                }}>
                <Text style={{ fontWeight: 'bold' }}>
                    "All of us at Blue CoLab look forward to seeing you on the team."
                </Text>
            </Text>
            <Text
                style={{
                    fontSize: 20,
                    textAlign: 'center',
                    marginTop: 15,
                    color: '#4b5563',
                    fontStyle: 'italic',
                }}>
                — <Text style={{ fontWeight: 'bold' }}>John Cronin, Blue CoLab Director</Text> —
            </Text>
        </ScrollView>
    );
}
