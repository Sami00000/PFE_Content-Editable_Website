import { useEffect } from 'react';

// Function to fetch data from the backend and update heading tags
const fetchAndSetHeadingData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/get-heading-content');
        const data = await response.json();

        data.forEach(item => {
            const heading = document.querySelector(`${item.headerLevel}[data-page="${item.page}"][data-tag="${item.tag}"]`);
            if (heading) {
                heading.textContent = item.textContent;
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to extract data from heading tags and send to the backend
const extractAndSendHeadingData = async () => {
    try {
        const headings = document.querySelectorAll('h1[data-page], h2[data-page], h3[data-page], h4[data-page], h5[data-page], h6[data-page]');
        const data = [];

        headings.forEach(heading => {
            data.push({
                tag: heading.getAttribute('data-tag'),
                page: heading.getAttribute('data-page'),
                textContent: heading.textContent,
                headerLevel: heading.tagName.toLowerCase()
            });
        });

        console.log('Sending data:', JSON.stringify(data));

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

// Function to observe new heading elements
const observeNewHeadings = (mutationsList) => {
    mutationsList.forEach(async (mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(async (node) => {
                if (node.nodeType === Node.ELEMENT_NODE && /^h[1-6]$/i.test(node.tagName)) {
                    await extractAndSendHeadingData(); // Send updated data to the backend
                }
            });
        }
    });
};

const useHeadingContent = () => {
    useEffect(() => {
        const updateContent = async () => {
            await fetchAndSetHeadingData();

            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(observeNewHeadings);

            // Start observing the target node for configured mutations
            observer.observe(document.body, { childList: true, subtree: true });

            // Send initial heading data
            await extractAndSendHeadingData();
        };

        updateContent();
    }, []);
};

export default useHeadingContent;
