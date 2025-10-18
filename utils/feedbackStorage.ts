// Utility functions for managing feedback storage

export interface FeedbackItem {
    text: string;
    timestamp: string;
    date: string;
}

export const saveFeedback = (feedbackText: string): void => {
    if (typeof window === 'undefined') return;

    const localStorage = window.localStorage;
    const existingFeedback = localStorage.getItem('kioskFeedback');
    const feedbackArray: FeedbackItem[] = existingFeedback ? JSON.parse(existingFeedback) : [];

    const newFeedback: FeedbackItem = {
        text: feedbackText,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString(),
    };

    feedbackArray.push(newFeedback);
    localStorage.setItem('kioskFeedback', JSON.stringify(feedbackArray));
};

export const getAllFeedback = (): FeedbackItem[] => {
    if (typeof window === 'undefined') return [];

    const localStorage = window.localStorage;
    const existingFeedback = localStorage.getItem('kioskFeedback');
    return existingFeedback ? JSON.parse(existingFeedback) : [];
};

export const clearAllFeedback = (): void => {
    if (typeof window === 'undefined') return;

    const localStorage = window.localStorage;
    localStorage.removeItem('kioskFeedback');
};

export const exportFeedbackAsJSON = (): string => {
    const feedback = getAllFeedback();
    return JSON.stringify(feedback, null, 2);
};

export const exportFeedbackAsCSV = (): string => {
    const feedback = getAllFeedback();
    if (feedback.length === 0) return '';

    const header = 'Date,Feedback\n';
    const rows = feedback
        .map((item) => {
            const escapedText = `"${item.text.replace(/"/g, '""')}"`;
            return `"${item.date}",${escapedText}`;
        })
        .join('\n');

    return header + rows;
};
