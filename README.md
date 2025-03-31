## CodePush Frontend

This is the frontend for the [CodePush Server](https://github.com/nmengual/code-push-server). It allows users to manage over-the-air updates for their React Native applications.

### Features
- Integration with CodePush Server API
- User-friendly interface for managing deployments
- Material-UI (MUI) for modern and responsive UI components
- GitHub OAuth login flow with reusable components and services

### Project Structure
- `src/`: Contains the main application code.
  - `components/`: Reusable UI components like `GitHubLoginButton`.
  - `pages/`: Page components like `Login` and `Dashboard`.
  - `services/`: API-related logic, such as `authService` for authentication.
  - `utils/`: Utility functions grouped by functionality.

### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn dev
   ```

### Contribution
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
