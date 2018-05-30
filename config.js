/* global keys */
var checks = [ // eslint-disable-line no-unused-vars
  {
    name: 'w3validator',
    niceName: 'W3C HTML Validator',
    active: true,
    quickURL: 'https://validator.w3.org/nu/?doc=[URL]',
    quickType: 'LIST',
    quickElement: 'li.error',
    critical: 5,
    warning: 1,
    invert: true
  },
  {
    name: 'pagespeed',
    niceName: 'PageSpeed Insights',
    quickURL: 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=[URL]',
    quickType: 'JSON',
    quickElement: 'ruleGroups.SPEED.score',
    detailsURL: 'https://developers.google.com/speed/pagespeed/insights/?hl=de&url=[URL]',
    maxScore: 100,
    critical: 75,
    warning: 90,
    invert: false
  },
  {
    part: 'mobile-friendly',
    niceName: 'Mobile-Friendly Test',
    quickURL: 'https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key=' + keys.searchconsolegoogleapiscom,
    quickMethod: 'POST',
    quickRequest: {url: '[URL]', requestScreenshot: false},
    quickType: 'JSON',
    quickElement: 'mobileFriendliness',
    detailsURL: 'https://search.google.com/test/mobile-friendly?url=[URL]',
    critical: 'NOT_MOBILE_FRIENDLY',
    warning: 'MOBILE_FRIENDLY_TEST_RESULT_UNSPECIFIED',
    noIntScore: true
  }
]
