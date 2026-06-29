# Remaku Website

The official website and documentation for [Remaku](https://github.com/remaku/remaku), a free, open-source visual macro tool for Windows.

## Tech Stack

- **Next.js 16** with App Router
- **Fumadocs** for documentation (MDX)
- **next-intl** for i18n (en, zh-TW, zh-CN)
- **Tailwind CSS 4** for styling
- **Bun** as package manager

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Scripts

| Script             | Description              |
| ------------------ | ------------------------ |
| `bun dev`          | Start development server |
| `bun run build`    | Build for production     |
| `bun start`        | Start production server  |
| `bun lint`         | oxlint                   |
| `bun format`       | Format with oxfmt        |
| `bun format:check` | Check formatting         |
| `bun typecheck`    | Run type checking        |

## Project Structure

| Directory                 | Description                 |
| ------------------------- | --------------------------- |
| `src/app/[locale]/(home)` | Landing page                |
| `src/app/[locale]/docs`   | Documentation pages         |
| `src/app/[locale]/og`     | Open Graph image generation |
| `src/app/api/search`      | Search API                  |
| `src/components/`         | React components            |
| `src/lib/`                | Shared utilities            |
| `content/docs/`           | MDX documentation files     |
| `messages/`               | i18n translation files      |

## License

[MIT](LICENSE)
