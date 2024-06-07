import { useEffect } from 'react';
import useEditIcons from './useEditIcons';
import useCookie from './useCookie';

const fetchAndSetTextData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/get-text-content');
        const data = await response.json();

        data.forEach(item => {
            const paragraphs = document.querySelectorAll(`p[data-page="${item.page}"][data-tag="${item.tag}"]`);
            paragraphs.forEach(p => {
                p.textContent = item.textContent;
                p.setAttribute('data-id', item.id);
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const extractAndSendTextData = async () => {
    const paragraphs = document.querySelectorAll('p[data-page][data-tag]');
    const data = Array.from(paragraphs).map(p => ({
        id: p.getAttribute('data-id') || null,
        tag: p.getAttribute('data-tag'),
        page: p.getAttribute('data-page'),
        textContent: p.textContent
    }));

    try {
        await fetch('http://127.0.0.1:8000/api/update-text-content', {
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

const observeNewParagraphs = (mutationList) => {
    mutationList.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'P' && node.hasAttribute('data-page') && node.hasAttribute('data-tag')) {
                    extractAndSendTextData();
                }
            });
        }
    });
};

const useTextContent = () => {
    const { hasCookie } = useCookie('simple_cookie');
    
    useEffect(() => {
        let observer;

        const updateContent = async () => {
            await fetchAndSetTextData();

            observer = new MutationObserver(observeNewParagraphs);
            observer.observe(document.body, { childList: true, subtree: true });

            await extractAndSendTextData();

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

export default useTextContent;
