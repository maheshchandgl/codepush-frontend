## CodePush Frontend

This is the frontend for the [CodePush Server](https://github.com/nmengual/code-push-server). It allows users to manage over-the-air updates for their React Native applications.

### Features

### NewPushDialog
- A dialog component for initiating a new CodePush.
- Allows users to input the target app version and rollout percentage.
- Integrated into the AppDetails page with a button to open the dialog.

### AppDetails Page
- Displays details of deployments and packages for a selected app.
- Includes a button to generate a new CodePush using the NewPushDialog component.

## Project Structure

The project is organized into feature-based folders under `src/features/` and shared resources under `src/shared/`.

### Features
- `auth`: Handles authentication-related logic.
- `apps`: Manages app-related functionality.
- `deployments`: Manages deployment-related functionality.

### Shared
- `constants`: Contains shared constants.
- `types`: Contains shared TypeScript types.
- `utils`: Contains shared utility functions.

### Public
- `en.json`: Contains localized strings for the application.

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

## Contributing

1. Follow the feature-based folder structure.
2. Use shared resources from `src/shared/` whenever possible.
3. Write modular and reusable code.
4. Add comments for complex logic.
5. Update documentation for any significant changes.

### Contribution
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
