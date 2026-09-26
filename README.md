# Next Order Food - Smart Restaurant Management Platform 🍽️

[![Next.js](https://img.shields.io/badge/Next.js-15_(Turbopack)-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, high-performance web platform for online food ordering and smart restaurant operations, built with **Next.js 15**, **React 19**, **TypeScript**, and **Socket.io**. Supporting dynamic table QR code ordering, real-time kitchen order dispatch, interactive management dashboards, and multi-language localization.

---

## ✨ Features

- **📱 Dynamic QR Code Table Ordering**: Instant guest menu access and live ordering directly at dining tables via custom QR tokens.
- **⚡ Real-Time Kitchen Dispatch**: Live order lifecycle tracking (Ordered → Cooking → Served → Paid) powered by **Socket.io**.
- **📊 Business Intelligence Dashboard**: Revenue metrics, order volume, and dish sales analytics visualized with **Recharts**.
- **🌐 Internationalization (i18n)**: Full multilingual support (Vietnamese & English) with `next-intl`.
- **🛡️ Role-Based Access Control (RBAC)**: Distinct permissions for Guests, Waiters, Chefs, and Restaurant Owners.
- **🎨 Modern Design System**: Built with **shadcn/ui**, **Radix UI**, **Lucide Icons**, and Dark/Light theme switching via `next-themes`.

---

## 🛠 Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack, SSR, Server Actions) |
| **Language & Runtime** | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **State Management** | [TanStack Query v5](https://tanstack.com/query/latest) & [Zustand](https://zustand-demo.pmnd.rs/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [TailwindCSS](https://tailwindcss.com/) |
| **Realtime** | [Socket.io Client](https://socket.io/) |
| **Data Tables & Charts** | [TanStack Table v8](https://tanstack.com/table/v8), [Recharts](https://recharts.org/) |
| **Form & Validation** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) |
| **Deployment** | [PM2](https://pm2.keymetrics.io/) Cluster Ecosystem (`ecosystem.config.js`) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.17+ or v20+ recommended)
- npm / pnpm / yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/minKasent/Next_order_food.git
   cd Next_order_food
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Production Build & PM2 Deployment:**
   ```bash
   npm run build
   pm2 start ecosystem.config.js
   ```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.