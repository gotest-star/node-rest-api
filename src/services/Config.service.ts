class ConfigService {
  private configFiledValues: {
    [index: string]: string;
  };

  constructor() {
    this.configFiledValues = require("dotenv").config().parsed;
  }

  get(name: string) {
    return this.configFiledValues[name];
  }
}

export default new ConfigService();
