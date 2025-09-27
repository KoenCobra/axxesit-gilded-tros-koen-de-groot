import { GildedTros } from "../src/gilded-tros";
import { Item } from "../src/item";

describe("GildedTros", () => {
  describe("Regular Items", () => {
    test("should degrade twice as fast after the sell by date", () => {
      const item: Item = new Item("Regular Item", 0, 10);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(8);
    });

    test("should never have negative quality", () => {
      const item: Item = new Item("Regular Item", 1, 0);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.quality).toBe(0);
    });
  });

  describe("Good Wine", () => {
    test("should increase in quality the older it gets", () => {
      const item: Item = new Item("Good Wine", 1, 10);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(11);
    });

    test("should never have quality more than 50", () => {
      const item: Item = new Item("Good Wine", 1, 50);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(50);
    });
  });

  describe("B-DAWG Keychain", () => {
    test("should never have to be sold or decreases in Quality", () => {
      const item: Item = new Item("B-DAWG Keychain", 1, 10);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(1);
      expect(item.quality).toBe(10);

      app.updateQuality();

      expect(item.sellIn).toBe(1);
      expect(item.quality).toBe(10);
    });
  });

  describe("Backstage passes for Re:Factor", () => {
    test("should increase in quality by 2 when there are 10 days or less", () => {
      const item: Item = new Item("Backstage passes for Re:Factor", 10, 10);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(12);
    });

    test("should increase in quality by 3 when there are 5 days or less", () => {
      const item: Item = new Item("Backstage passes for Re:Factor", 5, 10);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(13);
    });

    test("should drop to 0 quality after the concert", () => {
      const item: Item = new Item("Backstage passes for Re:Factor", 0, 10);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(0);
    });
  });
});
