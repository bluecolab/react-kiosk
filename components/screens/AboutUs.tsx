import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native'; //, Pressable

export default function StoryScreen() {
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
                At Seidenberg School, we believe students can make a difference today, before they
                launch their careers of tomorrow.
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
                        Is your water safe to drink?
                    </Text>

                    <Text style={{ fontSize: 25, marginBottom: 25, color: '#002D72' }}>
                        We belive you have the right to know.
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        At <Text style={{ fontWeight: 'bold' }}> Blue Colab </Text>, we're working
                        to ensure you have the critical information you need about your water
                        quality. Our dedicated team of students, interns, graduate assistants,
                        faculty, and staff are advancing technology, information, and warning
                        systems to make this a reality.
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        At our technology lab overlooking the Hudson River, our Choate Pond lab on
                        campus, and our data lab in the Goldstein Academic Center, Blue CoLab is
                        dedicated to the proposition that you have the{' '}
                        <Text style={{ fontWeight: 'bold' }}>right-to-know</Text> the quality of
                        your water before you drink it, swim in it, fish it, or even swamp your
                        canoe.
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
                        Water Contamination Risks
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        Chances are the water you use is safe, but millions have unfortunately found
                        otherwise. In a matter of hours, a single sip of pathogen-contaminated water
                        can result in serious illness. Currently labs require 24 - 48 hours to
                        report analyses of samples taken weekly, or less.
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        • In <Text style={{ fontWeight: 'bold' }}>Milwaukee (1993)</Text>, 400,000
                        residents became ill and 100 died after drinking water contaminated with
                        cryptosporidium.
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        • For years, residents of{' '}
                        <Text style={{ fontWeight: 'bold' }}>Hoosick Falls</Text> and{' '}
                        <Text style={{ fontWeight: 'bold' }}>Newburgh, NY</Text> may have been
                        unknowingly exposed to highly toxic PFAS.
                    </Text>

                    <Text style={{ fontSize: 20, marginBottom: 16, color: '#374151' }}>
                        Water contamination is a global problem, making millions of people ill.{' '}
                        <Text style={{ fontWeight: 'bold' }}>Real-time</Text>, technological
                        detection of water contaminants is the best defense.
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
                Blue CoLab's Hands-On Approach
            </Text>

            <Text
                style={{
                    fontSize: 22,
                    textAlign: 'center',
                    marginTop: 30,
                    color: '#374151',
                }}>
                Blue CoLab emphasizes a "hands-on" approach to foster innovation. Students gain
                practical experience operating real-time sensors and instruments, managing and
                visualizing data (including sonification), and developing UX, web, GIS, and app
                solutions.
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
