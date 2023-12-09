// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiUrl: "http://data.fixer.io/api",
  apiConvertUrl: "https://v6.exchangerate-api.com/v6/",
  apiChartUrl: "https://v6.exchangerate-api.com/v6/",
  apiKey: "0e3d2faac7a51c1b80c8fdbc2fd9920e",
  apiKeyForConvert: "9ca75a25dd98dec44409e62f",
  base: "EUR",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
