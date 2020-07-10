'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('flickr', function() {


  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/home");
  });


  describe('home', function() {

    beforeEach(function() {
      browser.get('index.html#!/home');
    });


    it('should render home when user navigates to /home', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for home/);
    });

  });


  describe('photos', function() {

    beforeEach(function() {
      browser.get('index.html#!/photos');
    });


    it('should render photos when user navigates to /photos', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for photos/);
    });

  });
});
