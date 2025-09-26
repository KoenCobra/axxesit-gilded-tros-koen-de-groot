import { GildedTros } from "../src/gilded-tros";
import { Item } from "../src/item";

describe("GildedTros", () => {
  describe("Good Wine", () => {
    test("should increase in quality the older it gets", () => {
      const item: Item = new Item("Good Wine", 1, 10);

      const app: GildedTros = new GildedTros([item]);

      app.updateQuality();

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(11);
    });
  });
});
