import { useEffect } from 'react';

const fetchAndSetTextData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/get-text-content');
        const data = await response.json();

        data.forEach(item => {
            const paragraphs = document.querySelectorAll(`p[data-page="${item.page}"][data-tag="${item.tag}"]`);
            paragraphs.forEach(p => {
                p.textContent = item.textContent;
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const extractAndSendTextData = async () => {
    const paragraphs = document.querySelectorAll('p[data-page][data-tag]');
    const data = Array.from(paragraphs).map(p => ({
        tag: p.getAttribute('data-tag'),
        page: p.getAttribute('data-page'),
        textContent: p.textContent
    }));

    try {
        const response = await fetch('http://127.0.0.1:8000/api/update-text-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};

const observeNewParagraphs = (mutationList) => {
    mutationList.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'P' && node.hasAttribute('data-page') && node.hasAttribute('data-tag')) {
                    // Send the new paragraph data to the database
                    extractAndSendTextData();
                }
            });
        }
    });
};

const useTextContent = () => {
    useEffect(() => {
        const updateContent = async () => {
            await fetchAndSetTextData();

            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(observeNewParagraphs);

            // Start observing the target node for configured mutations
            observer.observe(document.body, { childList: true, subtree: true });

            // Send initial text data
            await extractAndSendTextData();
        };

        updateContent();
    }, []);
};

export default useTextContent;
