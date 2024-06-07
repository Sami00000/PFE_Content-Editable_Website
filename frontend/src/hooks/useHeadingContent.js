import { useEffect } from 'react';
import useEditIcons from './useEditIcons';
import useCookie from './useCookie';

const fetchAndSetHeadingData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/get-heading-content');
        const data = await response.json();

        data.forEach(item => {
            const heading = document.querySelector(`${item.headerLevel}[data-page="${item.page}"][data-tag="${item.tag}"]`);
            if (heading) {
                heading.textContent = item.textContent;
                heading.setAttribute('data-id', item.id);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const extractAndSendHeadingData = async () => {
    const headings = document.querySelectorAll('h1[data-page], h2[data-page], h3[data-page], h4[data-page], h5[data-page], h6[data-page]');
    const data = Array.from(headings).map(heading => ({
        id: heading.getAttribute('data-id') || null,
        tag: heading.getAttribute('data-tag'),
        page: heading.getAttribute('data-page'),
        textContent: heading.textContent,
        headerLevel: heading.tagName.toLowerCase()
    }));

    try {
        await fetch('http://127.0.0.1:8000/api/update-heading-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const observeNewHeadings = (mutationsList) => {
    mutationsList.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE && /^h[1-6]$/i.test(node.tagName)) {
                    extractAndSendHeadingData();
                }
            });
        }
    });
};

const useHeadingContent = () => {
    const { hasCookie } = useCookie('simple_cookie');
    
    useEffect(() => {
        let observer;

        const updateContent = async () => {
            await fetchAndSetHeadingData();

            observer = new MutationObserver(observeNewHeadings);
            observer.observe(document.body, { childList: true, subtree: true });

            await extractAndSendHeadingData();

            if (hasCookie) {
                useEditIcons(hasCookie); // Ensure edit icons are added next to the elements
            }
        };

        updateContent();

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [hasCookie]);

    useEditIcons(hasCookie);
};

export default useHeadingContent;
