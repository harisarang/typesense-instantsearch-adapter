import { SearchRequestAdapter } from "../src/SearchRequestAdapter";

describe("SearchRequestAdapter", () => {
  describe("._adaptNumericFilters", () => {
    it("adapts the given numeric filters", () => {
      const subject = new SearchRequestAdapter([], null, {});

      const result = subject._adaptNumericFilters(["field1<=634", "field1>=289", "field2<=5", "field3>=3"]);
      expect(result).toEqual("field1:=[289..634] && field2:<=5 && field3:>=3");
    });
  });

  describe("._adaptFacetFilters", () => {
    it("adapts the given facet filters", () => {
      const subject = new SearchRequestAdapter([], null, {});

      const result = subject._adaptFacetFilters([
        ["field1:value1", "field1:value2"],
        "field2:with:colons:value3",
        "field2:with:colons:value4",
      ]);
      expect(result).toEqual(
        "field1:=[`value1`,`value2`] && field2:with:colons:=[`value3`] && field2:with:colons:=[`value4`]"
      );
    });
  });

  describe("._adaptGeoFilter", () => {
    it("adapts the given geo bounding box filter", () => {
      const subject = new SearchRequestAdapter([], null, {
        geoLocationField: "geoField",
      });

      const result = subject._adaptGeoFilter("x1,y1,x2,y2");
      expect(result).toEqual(`geoField:(x1, y1, x1, y2, x2, y2, x2, y1)`);
    });
  });
});
