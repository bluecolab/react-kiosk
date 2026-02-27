import { useEffect, useState } from 'react';
import { Image } from 'react-native';

// Helper component to dynamically size image by aspect ratio
export function DynamicImage({ imgSource, width }: { imgSource: any; width: number }) {
    const [imgHeight, setImgHeight] = useState(200);
    useEffect(() => {
        let isMounted = true;
        if (typeof imgSource === 'number') {
            // For require() images
            const { width: w, height: h } = Image.resolveAssetSource(imgSource);
            if (w && h && isMounted) setImgHeight((width * h) / w);
        } else if (imgSource?.uri) {
            Image.getSize(imgSource.uri, (w, h) => {
                if (w && h && isMounted) setImgHeight((width * h) / w);
            });
        }
        return () => {
            isMounted = false;
        };
    }, [imgSource, width]);
    return <Image source={imgSource} style={{ width, height: imgHeight }} resizeMode="contain" />;
}
