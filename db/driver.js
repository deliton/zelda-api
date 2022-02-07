import { JSONLoader } from "./loader";

const NOT_INITIALIZED_ERROR = "JSON driver not initialized. run init() first";
const ID_NOT_FOUND_ERROR = "ID cannot be undefined.";

export class JSONDriver {
  constructor(model) {
    this.model = model;
    this.isInitialized = false;
  }
  data;
  model;
  isInitialized;

  async init() {
    this.data = await JSONLoader(this.model);
    this.isInitialized = true;
  }

  findMany(filters) {
    if (!this.isInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR);
    }
    if (!filters) {
      return this;
    }
    this.data = this.data.filter((entry) => {
      for (let key in filters) {
        if (entry[key] === undefined || entry[key] != filters[key]) {
          return false;
        }
      }
      return true;
    });
    return this;
  }

  findById(id) {
    if (!id) {
      throw new Error(ID_NOT_FOUND_ERROR);
    }
    if (!this.isInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR);
    }
    this.data = this.data.find((entry) => entry._id["$oid"] === id);
    return this;
  }

  skip(begin = 0, end) {
    if (!this.isInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR);
    }
    this.data = this.data.slice(begin, end);
    return this;
  }

  limit(amount) {
    if (!this.isInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR);
    }
    this.data = this.data.slice(0, amount);
    return this;
  }

  search(fields) {
    if (!this.isInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR);
    }
    if (!fields) {
      return this;
    }
    this.data = this.data.filter((entry) => {
      for (let key in fields) {
        if (entry[key] !== undefined && entry[key].match(fields[key])) {
          return true;
        }
      }
      return false;
    });
    return this;
  }
}
