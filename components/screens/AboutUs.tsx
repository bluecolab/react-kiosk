import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native'; //, Pressable removed unused Pressable import

export default function StoryScreen() {
    return (
        <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
            {/* Title */}
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center', // Centered title text horizontally
                    color: '#0d21d1ff',
                    marginBottom: 20, // Space below the title for better visual separation from content below (especially on smaller screens)
                }}>
                Ensuring The Right to Know What's In Our Water.
            </Text>
            {/* First Image and Text Section */}
            <View style={{ flexDirection: 'row', marginBottom: 16, alignItems: 'flex-start' }}>
                {' '}
                {/* alignItems added to align items at the top */}
                <View style={{ flex: 1, paddingRight: 30 }}>
                    {' '}
                    {/* flex: 1 to take available space */}
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#002d72',
                            marginBottom: 30,
                        }}>
                        Do you know if your water is safe before you drink it?
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            marginBottom: 30,
                            marginRight: 30, // Added marginRight for better spacing between text and image
                            color: '#002d72', // Dark blue color for emphasis
                            fontWeight: 'bold', // Bold font for emphasis
                        }}>
                        Let us answer that for you: No. We aim to change that.
                    </Text>
                    <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                        We are a team of students, interns, graduate assistants, faculty, and staff
                        who work to advance the technology, information, and warning systems that
                        will bring you that information.
                    </Text>{' '}
                    {/* Added missing closing tag */}
                    <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                        At our technology lab overlooking the Hudson River, our Choate Pond lab on
                        campus, and our data lab in the Goldstein Academic Center, Blue CoLab is
                        dedicated to the proposition that you have the{' '}
                        <Text style={{ fontWeight: 'bold' }}>right-to-know</Text> the quality of
                        your water before you drink it, swim in it, fish it, or even swamp your
                        canoe.
                    </Text>{' '}
                    {/* Added missing closing tag */}
                    <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                        Water is essential to life. Yet, the quality of our water is increasingly
                        imperiled by pollution from industrial, agricultural, and residential
                        sources. Climate change is making this worse, with more frequent and intense
                        storms causing runoff and flooding that can overwhelm water treatment
                        systems.
                    </Text>{' '}
                    {/* Added missing closing tag */}
                </View>
                <View style={{ width: '50%' }}>
                    {' '}
                    {/* Fixed width for image container */}
                    <Image
                        source={require('@/assets/images/gallery/PXL_20231004_1831536302-1b78496645a2d75f.jpg')}
                        style={{ width: '100%', height: 500, borderRadius: 8 }}
                        resizeMode="cover"
                    />
                </View>
            </View>
            {/* Second Image and Text Section */}
            <View style={{ flexDirection: 'row', marginBottom: 16, alignItems: 'flex-start' }}>
                <View style={{ width: '50%' }}>
                    <Image
                        source={require('@/assets/images/gallery/GE-delivery.jpeg')}
                        style={{ width: '100%', height: 500, borderRadius: 8 }}
                        resizeMode="cover"
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 30 }}>
                    <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                        Over 2 billion people worldwide lack access to safe drinking water. In the
                        United States alone, an estimated 63 million Americans have been exposed to
                        potentially unsafe drinking water in the past decade. Waterborne diseases
                        cost the nation billions annually in healthcare expenses and lost
                        productivity. Every community deserves access to clean, safe water—a
                        fundamental requirement for public health, economic stability, and national
                        security.
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginBottom: 8,
                            color: '#002d72', // Dark blue color for emphasis
                        }}>
                        Water Contamination Risks Are Real and Growing
                    </Text>
                    <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                        Chances are the water you use is safe, however, millions have found out too
                        late that this is not the case. One sip of water contaminated with
                        pathogens, such as bacteria, viruses, or parasites, can cause severe illness
                        in a matter of hours. Yet, conventional labs require from 24 - 48 hours to
                        provide reports analyzing samples that may only be taken weekly, or less. In
                        addition, many chemical contaminants, such as lead, arsenic, nitrates, and
                        PFAS (per- and polyfluoroalkyl substances) are odorless, tasteless, and
                        colorless, making them impossible to detect without specialized equipment.
                    </Text>{' '}
                    {/* Added missing closing tag */}
                    <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                        Water contamination is endemic across the planet, making our United States
                        population ill, including tens of millions in other countries as well. The
                        best defense against this threat are innovations that enable{' '}
                        <Text style={{ fontWeight: 'bold' }}>real-time</Text>, technological
                        detection of water contaminants before they can reach our taps or
                        recreational waters.
                    </Text>{' '}
                    {/* Added missing closing tag */}
                </View>
            </View>
            {/* Additional Content Below Second Image */}
            <View style={{ marginBottom: 16, flexDirection: 'row' }}>
                {' '}
                {/* Flex row for side-by-side layout */}
                <View style={{ flex: 1, paddingRight: 20 }}>
                    <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                        In <Text style={{ fontWeight: 'bold' }}>Milwaukee Wisconsin (1993)</Text>,
                        400,000 residents were made ill and 100 died due to contaminated drinking
                        water such as cryptosporidium. Residents in{' '}
                        <Text style={{ fontWeight: 'bold' }}>Hoosick Falls</Text> and{' '}
                        <Text style={{ fontWeight: 'bold' }}>Newburgh, NY</Text> were exposed to
                        highly toxic PFAS and may have been for years without knowing it.
                    </Text>{' '}
                    {/* Added missing closing tag */}
                </View>
                <View style={{ flex: 1, paddingLeft: 40 }}>
                    {' '}
                    {/* Flex 1 for equal width */}
                    <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                        In <Text style={{ fontWeight: 'bold' }}>Flint, Michigan (2014)</Text>, lead
                        contamination of the water supply caused severe health problems for
                        thousands of residents.
                    </Text>{' '}
                    {/* Added missing closing tag */}
                </View>
            </View>{' '}
            {/* End of side-by-side layout */}
            <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                Water contamination is a serious issue that affects millions of people worldwide.
            </Text>{' '}
            {/* Added missing closing tag */}
            <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                At Blue CoLab, we are working to develop and deploy innovative technologies that can
                detect water contaminants in real-time, providing communities with the information
                they need to protect their health and well-being.
            </Text>{' '}
            {/* Added missing closing tag */}
            {/* Blue CoLab's Approach */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#002d72' }}>
                Blue CoLab's Hands-On Approach to Innovation in Water Quality Monitoring and
                Detection
            </Text>{' '}
            {/* Added missing closing tag */}
            <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151' }}>
                To advance these innovations, Blue CoLab is decidedly{' '}
                <Text style={{ fontWeight: 'bold' }}>“hands-on.”</Text> Our students dive into:
            </Text>{' '}
            {/* Added missing closing tag */}
            <View style={{ marginBottom: 16 }}>
                {' '}
                {/* Added marginBottom for spacing */}
                <Text style={{ fontSize: 18, color: '#374151' }}>
                    • Operation of Real-Time Sensors and Instruments
                </Text>
                <Text style={{ fontSize: 18, color: '#374151' }}>
                    • Management, Visualization, and Sonification of Data
                </Text>
                <Text style={{ fontSize: 18, color: '#374151' }}>
                    • UX, Web, GIS, and App Development
                </Text>
                <Text style={{ fontSize: 18, color: '#374151' }}>• System Cybersecurity</Text>
            </View>{' '}
            {/* End of bullet points */} {/* Added missing closing tag */}
            <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151', textAlign: 'center' }}>
                They work in a <Text style={{ fontWeight: 'bold' }}>team-based environment</Text>,
                using our own labs, instruments, equipment, and servers.
            </Text>{' '}
            {/* Added missing closing tag */} {/* Centered text for emphasis */}
            <Text style={{ fontSize: 18, marginBottom: 16, color: '#374151', textAlign: 'center' }}>
                Blue CoLab stands for everything that makes Seidenberg School a special place —
                harnessing innovation on behalf of society, and providing students with skill-based
                experiences that lead to a career meaningful to them, and to society.
            </Text>{' '}
            {/* Added missing closing tag */} {/* Centered text for emphasis */}
            {/* Closing Statement */}
            <Text
                style={{
                    fontSize: 25,
                    textAlign: 'center',
                    marginTop: 20, // Increased marginTop for better spacing from above content
                    color: '#4b5563', // Slightly lighter gray for a softer look on closing statement text than body text above (contrast)
                    fontStyle: 'italic', // Italicized for emphasis on closing statement text than body text above (fontStyle) than body text above
                }}>
                "All of us at Blue CoLab look forward to seeing you on the team."
            </Text>{' '}
            <Text
                style={{
                    fontSize: 25,
                    textAlign: 'center',
                    marginTop: 20, // Increased marginTop for better spacing from above content
                    color: '#4b5563', // Slightly lighter gray for a softer look on closing statement text than body text above (contrast)
                    fontStyle: 'italic', // Italicized for emphasis on closing statement text than body text above (fontStyle) than body text above than body text above
                }}>
                — John Cronin, Blue CoLab Director
            </Text>{' '}
        </ScrollView>
    );
}
