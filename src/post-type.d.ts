interface PostType {
    _id: string;
    info: {
        gender: 'male' | 'female';
        name: string;
        lastname: string;
        phoneNumber: string;
        homeLocation: {
            type: 'Point';
            coordinates: [number, number]; // longitude, latitude
        };
    };
    content: string;
    markDownContent: string;
    likes: number;
    isValid: boolean;
    isVisible: boolean;
    visibleLastUpdate: Date;
    description: string;
    adminDescription: string;
    submitInfo: {
        src: string;
        ip: string;
        sourcePage: string;
        previousPage: string;
    };
    unstructuredData: string;
    followUpBy: [string];
    followerWaLink: string;
    followUpRate: string;
    labels: [string];
    followUpStatus: string;
    haveSlider?: boolean;
    otherDescription?: string;
}

export { PostType };
