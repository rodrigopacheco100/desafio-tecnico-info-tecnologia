import { WatchedList } from './watched-list';

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe(WatchedList.name, () => {
  it('should be able to create a watched list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.getCurrentItems()).toHaveLength(3);
    expect(list.getCurrentItems()).toEqual([1, 2, 3]);
  });

  it('should be able to add new items to the list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);

    expect(list.getCurrentItems()).toHaveLength(4);
    expect(list.getNewItems()).toEqual([4]);
  });

  it('should be able to remove items from the list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);

    expect(list.getCurrentItems()).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([2]);
  });

  it('should be able to add an item even if it was removed before', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);
    list.add(2);

    expect(list.getCurrentItems()).toHaveLength(3);
    expect(list.getRemovedItems()).toHaveLength(0);
    expect(list.getNewItems()).toHaveLength(0);
  });

  it('should be able to remove an item even if it was added before', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);
    list.remove(4);

    expect(list.getCurrentItems()).toHaveLength(3);
    expect(list.getRemovedItems()).toHaveLength(0);
    expect(list.getNewItems()).toHaveLength(0);
  });

  it('should be able to update list items', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.update([1, 3, 4]);

    expect(list.getRemovedItems()).toEqual([2]);
    expect(list.getNewItems()).toEqual([4]);
    expect(list.getCurrentItems()).toEqual([1, 3, 4]);
  });

  it('should be able to clear the list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.clear();

    expect(list.getCurrentItems()).toHaveLength(0);
    expect(list.getRemovedItems()).toEqual([1, 2, 3]);
  });

  it('should be able to create an empty watched list', () => {
    const list = new NumberWatchedList();

    expect(list.getCurrentItems()).toHaveLength(0);
  });

  it('should return true if item exists in the list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.exists(2)).toBe(true);
    expect(list.exists(4)).toBe(false);
  });

  it('should not add an item if it already exists', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(2);

    expect(list.getCurrentItems()).toHaveLength(3);
  });

  it('should not add an item to removed list if it is already there', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);
    list.remove(2);

    expect(list.getRemovedItems()).toHaveLength(1);
    expect(list.getRemovedItems()).toEqual([2]);
  });
});
