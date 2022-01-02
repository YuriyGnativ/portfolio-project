import qs, { stringify } from "qs";

export const editQueryString = (
  search,
  entityType,
  action,
  queryValue,
  value
) => {
  const searchObj = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  switch (action) {
    case "PUSH":
      switch (entityType) {
        case "checkbox":
          if (searchObj.hasOwnProperty(queryValue)) {
            const queryArr = searchObj[queryValue].split(",");
            queryArr.push(value);
            searchObj[queryValue] = queryArr.join(",");
            return "?" + stringify(searchObj, { encode: false });
          } else {
            searchObj[queryValue] = value;
            return "?" + stringify(searchObj, { encode: false });
          }
        case "range":
          searchObj[queryValue] = value.join(",");
          return "?" + stringify(searchObj, { encode: false });
        case "toggle":
          searchObj[queryValue] = value;
          return "?" + stringify(searchObj, { encode: false });
      }
    case "POP":
      switch (entityType) {
        case "checkbox":
          if (searchObj[queryValue].split(",").length === 1) {
            delete searchObj[queryValue];
            if (Object.keys(searchObj).length >= 1) {
              return "?" + stringify(searchObj, { encode: false });
            } else {
              return stringify(searchObj, { encode: false });
            }
          } else {
            searchObj[queryValue] = searchObj[queryValue]
              .split(",")
              .filter((o) => o !== value)
              .join(",");
            if (Object.keys(searchObj).length >= 1) {
              return "?" + stringify(searchObj, { encode: false });
            } else {
              return stringify(searchObj, { encode: false });
            }
          }
        case "range":
          searchObj[queryValue] = value.join(",");
          return "?" + stringify(searchObj, { encode: false });
        case "toggle":
          delete searchObj[queryValue];
          if (Object.keys(searchObj).length >= 1) {
            return "?" + stringify(searchObj, { encode: false });
          } else {
            return stringify(searchObj, { encode: false });
          }
      }
  }
};
