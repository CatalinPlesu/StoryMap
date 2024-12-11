// /src/main.js
import Observable from './observables/Observable.js';
import UIObserver from './ui/UIObserver.js';

// Create Observable instances for each type
const mapObservable = new Observable();
const characterObservable = new Observable();
const chapterObservable = new Observable();

// Get the DOM elements
const mapElement = document.getElementById('tree-map');
const characterElement = document.getElementById('tree-character');
const chapterElement = document.getElementById('tree-chapter');

// Register observers to each observable instance
new UIObserver(mapObservable, mapElement);
new UIObserver(characterObservable, characterElement);
new UIObserver(chapterObservable, chapterElement);

// Example of adding data to the observables
mapObservable.addItem({
    id: 1,
    title: 'Map 1',
    details: ['Image 1', 'Image 2', 'Imaage x'],
});
characterObservable.addItem({
    id: 1,
    title: 'Character 1',
    details: ['Detail 1', 'Detail 2', "X Detail"],
});
chapterObservable.addItem({
    id: 1,
    title: 'Chapter 1',
    details: ['Timeframe 1', 'Timeframe 2'],
});

// Example of updating an item
mapObservable.updateItem(1, { title: 'Updated Map 1', details: ['Updated Image 1'] });

// Example of removing an item
characterObservable.removeItem(1);
