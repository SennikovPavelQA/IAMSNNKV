let totalResponses = 0;

function openVacancyInNewTab(buttons, index) {
    if (index >= buttons.length) {
        navigateToNextPage();
        return;
    }

    let url = buttons[index].getAttribute('href');
    if (url) {
        let newTab = window.open(url, '_blank');

        // Wait for 5 seconds before closing the tab
        setTimeout(() => {
            newTab.close();

            totalResponses++;
            // Check if we reached the limit of 300 responses
            if (totalResponses >= 300) {
                console.log("Processed 300 vacancies. Stopping...");
                return;
            }

            // Wait for another 0.5 seconds before opening the next vacancy
            setTimeout(() => {
                openVacancyInNewTab(buttons, index + 1);
            }, 500);
        }, 5000);
    }
}

function navigateToNextPage() {
    // Find the next page button and click on it
    let nextPageButton = document.querySelector('[data-qa="pager-next"]');
    if (nextPageButton) {
        nextPageButton.click();
        
        // Use a timeout to wait for the next page to load and then continue the process
        setTimeout(() => {
            let newButtons = document.querySelectorAll('[data-qa="vacancy-serp__vacancy_response"]');
            openVacancyInNewTab(newButtons, 0);
        }, 3000); // Wait 3 seconds for the next page to load
    } else {
        console.log("No more pages to navigate. Stopping...");
    }
}

// Start the process
let initialButtons = document.querySelectorAll('[data-qa="vacancy-serp__vacancy_response"]');
openVacancyInNewTab(initialButtons, 0);
