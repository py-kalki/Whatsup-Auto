# Contributing to WhatsAuto

Thank you for your interest in contributing to **WhatsAuto**! We welcome contributions from developers, designers, and enthusiasts of all skill levels.

## Code of Conduct

Please be respectful, constructive, and collaborative in all issues, pull requests, and discussions.

---

## How Can You Contribute?

1. **Reporting Bugs**: Open an issue describing the bug, steps to reproduce, expected vs actual behavior, and system environment (Node.js version, OS, browser).
2. **Suggesting Features**: Share your ideas for new engines, integrations, UI enhancements, or anti-ban safety features.
3. **Submitting Pull Requests**:
   - Fork the repository.
   - Create a feature branch: `git checkout -b feature/my-cool-feature`.
   - Make your changes with clean, readable code and clear commit messages.
   - Test your changes using `node test-automation.js` and manual UI checks.
   - Push to your branch and open a PR against `main`.

---

## Development Guidelines

- **Style & Cleanliness**: Follow standard JavaScript ES6+ conventions. Use clean variable naming and avoid console clutter in production paths.
- **UI Icons**: We use [Lucide Icons](https://lucide.dev) via SVG vector rendering (`<i data-lucide="..."></i>`). Please do not use raw text emojis in the UI.
- **Privacy First**: Ensure all credentials, API keys, and session keys are kept in local storage or `.env` and never logged or exposed in public endpoints.

---

## Testing

Before submitting a PR, always run:
```bash
node test-automation.js
```
Ensure all automated unit and integration tests pass with exit code `0`.
