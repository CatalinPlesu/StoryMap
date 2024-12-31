export default class IObserver {
    update(subject) {
        throw new Error('You must implement the update method!');
    }
}