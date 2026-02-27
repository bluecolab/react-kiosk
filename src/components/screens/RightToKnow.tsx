import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DynamicImage } from '@/components/DynamicImage';

const infoItems = [
    {
        titleKey: 'rightToKnow.team2023',
        descriptionKey: 'rightToKnow.descriptionR2K2023',
        studentsKey: 'rightToKnow.studentsR2K2023',
        img: require('@/assets/images/general/R2K2023.jpg'),
        textKey: 'rightToKnow.textR2K2023',
    },
    {
        titleKey: 'rightToKnow.team2024',
        descriptionKey: 'rightToKnow.descriptionR2K2024',
        studentsKey: 'rightToKnow.studentsR2K2024',
        img: require('@/assets/images/general/R2K2024.jpg'),
        textKey: 'rightToKnow.textR2K2024',
    },
    {
        titleKey: 'rightToKnow.team2025',
        descriptionKey: 'rightToKnow.descriptionR2K2025',
        studentsKey: 'rightToKnow.studentsR2K2025',
        img: require('@/assets/images/general/R2K2025.jpg'),
        textKey: 'rightToKnow.textR2K2025',
    },
];

export default function RightToKnow() {
    const { t } = useTranslation();

    const [currentItem, setCurrentItem] = useState(infoItems[0]);

    return (
        <View>
            <Text className="text-h2 font-bold mb-4 text-center">
                {t('rightToKnow.mainHeading')}
            </Text>
            <Text className="text-body text-center mb-2">{t('rightToKnow.introText')}</Text>
            <View className="flex-row flex-wrap justify-center my-2">
                {infoItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        className={`px-3 py-2 rounded-md m-1 ${currentItem.titleKey === item.titleKey ? 'bg-blue-400' : 'bg-gray-300'}`}
                        onPress={() => setCurrentItem(item)}>
                        <Text className="text-button font-bold text-black">{t(item.titleKey)}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View className="bg-white rounded-xl flex-row p-4 items-start shadow w-full">
                <View className="flex-shrink-0 mr-4">
                    <DynamicImage imgSource={currentItem.img} width={600} />
                </View>
                <View className="flex-1 flex flex-col ml-4">
                    <Text className="text-h2 text-center font-bold mb-2">
                        {t(currentItem.titleKey)}
                    </Text>
                    <Text className="text-h3 text-center mb-2">
                        {t(currentItem.descriptionKey)}
                    </Text>
                    <Text className="text-body">{t(currentItem.textKey)}</Text>
                    <Text className="text-body mt-4">{t(currentItem.studentsKey)}</Text>
                </View>
            </View>
        </View>
    );
}
