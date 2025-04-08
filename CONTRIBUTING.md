# Contributing Guidelines

Thank you for considering contributing to this project! Here are some guidelines to help you get started:

## How to Contribute
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and test them thoroughly.
4. Submit a pull request with a clear description of your changes.

## Folder Structure

- **`src/features/`**: Contains feature-specific folders for modularity.
- **`src/shared/`**: Contains shared resources like constants, types, and utilities.
- **`public/`**: Contains public assets and localization files.

## Coding Standards

1. Use TypeScript for type safety.
2. Follow the feature-based folder structure.
3. Write modular and reusable code.
4. Use hooks for reusable logic.
5. Add comments for complex logic.
6. Use localized strings from `public/en.json` instead of hardcoding.

## Code Style
- Follow the existing code style and conventions.
- Use ESLint to lint your code before submitting.

## Pull Requests

1. Ensure all tests pass.
2. Update documentation for significant changes.
3. Provide a clear and descriptive commit message.

## Reporting Issues
If you find a bug or have a feature request, please open an issue on GitHub with detailed information.

### Guidelines for Library Installation

- Before suggesting or installing any new library, always check the `package.json` file to see if the library is already included in the project dependencies.
- If the library is already present, ensure to use the existing version and avoid redundant installations.

### Maintaining Documentation

- Always update the Copilot instruction file with any new features or changes made to the project.
- Ensure the README file reflects the latest state of the project, including new components, features, or APIs.
- Provide clear and concise descriptions of changes to help other contributors understand the updates.