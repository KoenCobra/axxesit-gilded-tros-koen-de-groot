import { GildedTros } from "../src/gilded-tros";
import { Item } from "../src/item";
import { GILDED_TROS_CONSTANTS } from "./../utils/constants";

describe("GildedTros", () => {
  describe("Regular Items", () => {
    test("should degrade by 1 before the sell by date", () => {
      const item: Item = new Item(GILDED_TROS_CONSTANTS.REGULAR_ITEM, 5, 10);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(9);
    });

    test("should degrade twice as fast after the sell by date", () => {
      const item: Item = new Item(GILDED_TROS_CONSTANTS.REGULAR_ITEM, 0, 10);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(8);
    });

    test("should never have negative quality", () => {
      const item: Item = new Item(GILDED_TROS_CONSTANTS.REGULAR_ITEM, 1, 0);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.quality).toBe(0);
    });
  });

  describe("Good Wine", () => {
    test("should increase in quality the older it gets", () => {
      const item: Item = new Item(GILDED_TROS_CONSTANTS.GOOD_WINE, 1, 10);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(11);
    });

    test("should increase in quality by 2 after the sell date", () => {
      const item: Item = new Item(GILDED_TROS_CONSTANTS.GOOD_WINE, 0, 10);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(12);
    });

    test("should never have quality more than 50", () => {
      const item: Item = new Item(GILDED_TROS_CONSTANTS.GOOD_WINE, 1, 50);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(50);
    });

    test("should never have quality more than 50 even after sell date", () => {
      const item: Item = new Item(GILDED_TROS_CONSTANTS.GOOD_WINE, 0, 49);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(50);
    });
  });

  describe("B-DAWG Keychain", () => {
    test("should never have to be sold or decreases in Quality", () => {
      const item: Item = new Item(GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN, 1, 80);
      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(1);
      expect(item.quality).toBe(80);
    });
  });

  describe("Backstage passes", () => {
    const backstagePasses = [
      GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR,
      GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX,
    ];

    test.each(backstagePasses)(
      "should increase in quality by 1 when there are more than 10 days for %s",
      (passName) => {
        const item: Item = new Item(passName, 15, 10);
        const app: GildedTros = new GildedTros([item]);

        app.updateQuality();

        expect(item.sellIn).toBe(14);
        expect(item.quality).toBe(11);
      }
    );

    test.each(backstagePasses)(
      "should increase in quality by 2 when there are 10 days or less for %s",
      (passName) => {
        const item: Item = new Item(passName, 10, 10);
        const app: GildedTros = new GildedTros([item]);

        app.updateQuality();

        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(12);
      }
    );

    test.each(backstagePasses)(
      "should increase in quality by 3 when there are 5 days or less for %s",
      (passName) => {
        const item: Item = new Item(passName, 5, 10);
        const app: GildedTros = new GildedTros([item]);

        app.updateQuality();

        expect(item.sellIn).toBe(4);
        expect(item.quality).toBe(13);
      }
    );

    test.each(backstagePasses)(
      "should drop to 0 quality after the concert for %s",
      (passName) => {
        const item: Item = new Item(passName, 0, 10);
        const app: GildedTros = new GildedTros([item]);

        app.updateQuality();

        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(0);
      }
    );

    test.each(backstagePasses)(
      "should never have quality more than 50 for %s",
      (passName) => {
        const item: Item = new Item(passName, 5, 49);
        const app: GildedTros = new GildedTros([item]);

        app.updateQuality();

        expect(item.sellIn).toBe(4);
        expect(item.quality).toBe(50);
      }
    );
  });
});
