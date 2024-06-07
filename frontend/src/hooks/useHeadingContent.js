import { useEffect } from 'react';
import useEditIcons from './useEditIcons';
import useCookie from './useCookie';

const fetchAndSetHeadingData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/get-heading-content');
        const data = await response.json();

        const updatedElements = [];
        data.forEach(item => {
            const heading = document.querySelector(`${item.headerLevel}[data-page="${item.page}"][data-tag="${item.tag}"]`);
            if (heading) {
                heading.textContent = item.textContent;
                heading.setAttribute('data-id', item.id);
                updatedElements.push(heading);
            }
        });
        return updatedElements;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const extractAndSendHeadingData = async () => {
    try {
        const headings = document.querySelectorAll('h1[data-page], h2[data-page], h3[data-page], h4[data-page], h5[data-page], h6[data-page]');
        const data = Array.from(headings).map(heading => ({
            id: heading.getAttribute('data-id') || null,
            tag: heading.getAttribute('data-tag'),
            page: heading.getAttribute('data-page'),
            textContent: heading.textContent,
            headerLevel: heading.tagName.toLowerCase()
        }));

        const response = await fetch('http://127.0.0.1:8000/api/update-heading-content', {
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

const observeNewHeadings = (mutationsList) => {
    mutationsList.forEach(async (mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(async (node) => {
                if (node.nodeType === Node.ELEMENT_NODE && /^h[1-6]$/i.test(node.tagName)) {
                    await extractAndSendHeadingData();
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
            const updatedElements = await fetchAndSetHeadingData();

            observer = new MutationObserver(observeNewHeadings);
            observer.observe(document.body, { childList: true, subtree: true });

            await extractAndSendHeadingData();

            if (hasCookie) {
                updatedElements.forEach(heading => {
                    const editIcon = document.createElement('span');
                    editIcon.textContent = '✏️';
                    editIcon.style.cursor = 'pointer';
                    editIcon.onclick = () => {
                        const id = heading.getAttribute('data-id');
                        if (id) {
                            window.location.href = `http://127.0.0.1:8000/editable-heading-content/${id}/edit`;
                        }
                    };
                    heading.appendChild(editIcon);
                });
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
