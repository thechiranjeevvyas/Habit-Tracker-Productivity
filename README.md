<div align="center">
# ✅ Personal Habit Tracker

A minimal, offline-first habit tracker focused on consistency.

</div>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="LocalStorage" src="https://img.shields.io/badge/LocalStorage-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img alt="Open Source" src="https://img.shields.io/badge/Open%20Source-%E2%9D%A4-brightgreen?style=for-the-badge">
</p>

---

## Table of Contents

- [About the Project](#about-the-project)
- [Why This Habit Tracker?](#why-this-habit-tracker)
  - [Philosophy](#philosophy)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Usage Guide](#usage-guide)
  - [How to Add Habits](#how-to-add-habits)
  - [How Streaks Work](#how-streaks-work)
  - [How Data is Stored](#how-data-is-stored)
- [Data & Privacy](#data--privacy)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap--future-improvements)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)
- [Author](#author)
- [License](#license)

---

## About the Project

This is a simple, privacy-focused web application for tracking personal daily habits. It's built for individuals who want a
straightforward tool to build consistency without the complexity of cloud-based services, user accounts, or social features.

### Why This Habit Tracker?

Many habit trackers are over-engineered, filled with features that distract from the core goal: consistency. This project is a return to basics. It does one thing and does it well—tracking your daily commitment to the habits you want to build.

### Philosophy

- **Minimalism:** The UI is clean and distraction-free.
- **Privacy First:** All data lives and dies in your browser. No sign-ups, no tracking, no cloud.
- **Performance:** Built to be fast, lightweight, and available offline.
- **Ownership:** You own your data. You can view, modify, or delete it at any time.

---

## Features

- **Habit Creation:** Easily add new daily habits you want to track.
- **Daily Check-ins:** Mark habits as complete for the current day with a single click.
- **Streak Tracking:** Automatically calculates and displays your current and longest streaks to keep you motivated.
- **Local-Only Data Storage:** Utilizes your browser's LocalStorage, meaning no data ever leaves your machine.
- **Fast & Offline-Friendly:** As a Next.js application, it's incredibly fast and works even without an internet connection after the first load.

---

## Tech Stack

This project is built with modern, efficient technologies to ensure a great user experience.

- **[Next.js](https://nextjs.org/)** - A React framework for production-grade applications.
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapid UI development (optional, can be replaced with standard CSS).
- **Browser LocalStorage** - The key-value storage mechanism used for all data persistence.

---

## Folder Structure

The project follows a standard Next.js directory structure to keep the codebase organized and maintainable.
