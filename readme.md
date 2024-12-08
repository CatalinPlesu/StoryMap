# StoryMap

## Overview

This application enables users to interact with a dynamic map and associated entities such as characters, items, and vehicles. Core features include image uploads, character location tracking, attribute display, timeline-based movement visualization, and support for overlays, zooming, and flexible timeframes.

---

## Features

### 1. **Image Upload and Display**
- **Description**: Users can upload and display images, such as maps or photos, with support for overlays and zoom.
- **Requirements**:
    - [ ] Multiple maps (e.g., different planets or far locations).
    - [ ] Provide an upload form for image selection.
    - [ ] Enable repositioning and scaling of secondary images.
    - [ ] Implement dynamic zoom functionality for detailed views.
    - [ ] Support overlays (e.g., location pins, routes) with a defined scale for clear movement speeds.

---

### 2. **Character Location Tracking**
- **Description**: Track and display characters on the map, allowing interaction with their attributes.
- **Requirements**:
    - [ ] Show character locations as markers or pointers.
    - [ ] Display attributes (e.g., health, money) on click or hover.
    - [ ] Zoom functionality to display character details and attributes.

---

### 3. **Time Frame Management**
- **Description**: Support flexible representations of time, including relative and historical dates.
- **Requirements**:
    - [ ] Parse and display dates in absolute (e.g., "100 BC") and relative (e.g., "5 days ago") formats.
    - [ ] Enable filtering and event management based on historical timeframes.
    - [ ] Organize events within chapters for better structure.

---

### 4. **Character Attributes**
- **Description**: Display and update dynamic attributes such as health, money, and more for each character.
- **Requirements**:
    - [ ] Define base attributes with default values for all characters.
    - [ ] Display attributes in a sidebar or heads-up display (HUD).
    - [ ] Support real-time attribute updates (e.g., health changes, spending money).
    - [ ] Allow users to add custom attributes as needed.

---

### 5. **Houses and Vehicles**
- **Description**: Mark and interact with locations of houses, vehicles, and other entities on the map.
- **Requirements**:
    - [ ] Display locations of houses, vehicles, items, and pets on the map.
    - [ ] Enable interaction to show detailed information or move entities.

---

### 6. **Movement Visualization**
- **Description**: Show movement paths for characters on the map using lines.
- **Requirements**:
    - [ ] Draw lines or polylines to represent movement between points.
    - [ ] Dynamically update the lines based on character movement.
    - [ ] Display the speed of movement along the path.

---

### 7. **Embedded Functionality**
- **Description**: Embed the map within EPUB files and generate timelines for chapters.
- **Requirements**:
    - [ ] Embed the map in a hidden format within an EPUB file.
    - [ ] Enable reading of the map from the EPUB file.
    - [ ] Generate timeframes for each chapter in Markdown format.

---
