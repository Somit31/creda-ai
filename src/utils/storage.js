const QUESTIONS_KEY = "creda_recent_questions";

export const getRecentQuestions = () => {
    try {
        return JSON.parse(localStorage.getItem(QUESTIONS_KEY)) || [];
    } catch {
        return [];
    }
};

export const saveRecentQuestion = (question) => {
    if (!question) return;

    const existing = getRecentQuestions();
    const updated = [
        question,
        ...existing.filter((q) => q !== question),
    ].slice(0, 5);

    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(updated));
};

export const deleteRecentQuestion = (question) => {
    const existing = getRecentQuestions();
    const updated = existing.filter((q) => q !== question);
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(updated));
};

export const clearRecentQuestions = () => {
    localStorage.removeItem(QUESTIONS_KEY);
};
