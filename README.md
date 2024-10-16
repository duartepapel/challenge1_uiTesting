# TodoMVC Test Automation Setup with Playwright

This README provides instructions on how to set up and run automated tests for the TodoMVC application using Playwright.

## Prerequisites

Before you begin, ensure you have the following installed:

- [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) 
- A suitable Linux distribution installed in WSL2 (e.g., Ubuntu 20.04)
- [Visual Studio Code](https://code.visualstudio.com/)
- Node.js (v18 or later)
- npm (usually comes with Node.js)
- Git

## Setup Instructions

1. Clone the repository:
   
   ```bash
   - git clone git@github.com:duartepapel/challenge1_uiTesting.git <SSH> 
   or 
   - git clone https://github.com/duartepapel/challenge1_uiTesting.git <HTTPS>
   - cd challenge1_uiTesting
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install Playwright and browsers:
   ```
   npm init playwright@latest
   ```
   Or follow the official installation guide at [Playwright installation guide](https://playwright.dev/docs/intro#installing-playwright)

## Running the Tests

1. To run the tests in headless mode:
   ```
   npx playwright test
   ```

2. To run the tests in headed mode (with browser visible):
   ```
   npx playwright test --headed
   ```


## Generating Test Reports

Playwright has built-in reporting capabilities:

1. To generate an HTML report:
   ```
   npx playwright show-report
   ```

2. For Allure reporting, [INSTALL](https://allurereport.org/docs/install/) it and follow the [Offical Playwright Setup](https://allurereport.org/docs/playwright/). After that you can execute:
   ```
   allure serve allure-results
   ```

## Test Artifacts

You can view the test screenshots and videos directly on the test report generated after each test execution using the command 'npx playwright show-report' or alternatively directly on the test-results folder inside the project.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are correctly installed.
2. Check that you're using the correct versions of Node.js and npm.
3. Update Playwright: `npm install -D @playwright/test@latest`
4. Re-install Playwright browsers: `npx playwright install`

For more detailed information, refer to the [Playwright documentation](https://playwright.dev/docs/intro).