## CodePush Frontend

This is the frontend for the [CodePush Server](https://github.com/nmengual/code-push-server). It allows users to manage over-the-air updates for their React Native applications.

### Features

### CodePushDetailsDialog
- A dialog component for initiating a new CodePush.
- Allows users to input the target app version and rollout percentage.
- Integrated into the AppDetails page with a button to open the dialog.

### AppDetails Page
- Displays details of deployments and packages for a selected app.
- Includes a button to generate a new CodePush using the CodePushDetailsDialog component.

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
